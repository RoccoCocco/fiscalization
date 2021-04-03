import * as fs from 'fs';

import * as forge from 'node-forge';

export type P12Result = CertificateResult & {
  pemKey: string;
};

type CertificateResult = {
  pemCertificate: string;
  serialNumber: null | string;
  attributes: {
    countryName: string;
    stateOrProvinceName: string;
    localityName: string;
    organizationName: string;
    organizationalUnitName: string;
    commonName: string;
    emailAddress: string;
  };
};

type Attribute = {
  type: string;
  value: string;
  valueTagClass: number;
  name: string;
  shortName: string;
};

export function getPemFromP12(certPath: string, password: string): P12Result {
  const p12File = fs.readFileSync(certPath, { encoding: 'binary' });
  const p12Asn1 = forge.asn1.fromDer(p12File);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

  const pemKey = getKeyFromP12(p12, password);
  const data = getCertificateFromP12(p12);

  return { pemKey, ...data };
}

function getKeyFromP12(p12: any, password: string) {
  const keyData = p12.getBags(
    { bagType: forge.pki.oids['pkcs8ShroudedKeyBag'] },
    password
  );
  const index = forge?.pki?.oids['pkcs8ShroudedKeyBag'];
  let pkcs8Key = index ? keyData[index][0] : undefined;

  if (pkcs8Key === undefined) {
    pkcs8Key = keyData[forge.pki.oids['keyBag'] || ''][0];
  }

  if (typeof pkcs8Key === 'undefined') {
    throw new Error('Unable to get private key.');
  }

  const pemKey = forge.pki.privateKeyToPem(pkcs8Key.key);

  return pemKey;
}

function getCertificateFromP12(p12: any): CertificateResult {
  const certData = p12.getBags({ bagType: forge.pki.oids['certBag'] });
  const certificate = certData[forge.pki.oids['certBag'] || ''][0];

  const pemCertificate = forge.pki.certificateToPem(certificate.cert);

  const data = certificate.cert.subject.attributes;

  const attributes = {
    commonName: findAttr(data, 'commonName') || '',
    countryName: findAttr(data, 'countryName') || '',
    emailAddress: findAttr(data, 'emailAddress') || '',
    localityName: findAttr(data, 'localityName') || '',
    organizationName: findAttr(data, 'organizationName') || '',
    organizationalUnitName: findAttr(data, 'organizationalUnitName') || '',
    stateOrProvinceName: findAttr(data, 'stateOrProvinceName') || '',
  };

  return {
    attributes,
    pemCertificate,
    serialNumber: certificate.cert.serialNumber,
  };
}

const findAttr = (data: Attribute[], find: string): string | null =>
  data.find((item) => item.name === find)?.value || null;

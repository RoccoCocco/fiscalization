import { asn1, pkcs12, pki } from 'node-forge';

type CertificateResult = {
  attributes: {
    commonName: string;
    countryName: string;
    emailAddress: string;
    localityName: string;
    organizationName: string;
    organizationalUnitName: string;
    stateOrProvinceName: string;
  };
  pemCertificate: string;
  serialNumber: null | string;
};

export type P12Result = CertificateResult & {
  pemKey: string;
};

type Attribute = {
  name: string;
  shortName: string;
  type: string;
  value: string;
  valueTagClass: number;
};

export function getPemFromP12(
  certificate: Buffer,
  password: string
): P12Result {
  const p12Asn1 = asn1.fromDer(certificate.toString('binary'));
  const p12 = pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

  const pemKey = getKeyFromP12(p12);
  const data = getCertificateFromP12(p12);

  return { pemKey, ...data };
}

function getKeyFromP12(p12: pkcs12.Pkcs12Pfx) {
  const index = pki.oids['pkcs8ShroudedKeyBag'];

  if (index === undefined) {
    throw new Error('index not defined');
  }

  const keyData = p12.getBags({
    bagType: pki.oids['pkcs8ShroudedKeyBag'],
  });

  if (keyData === undefined) {
    throw new Error('Key data is undefined');
  }

  let pkcs8Key = keyData[index]?.at(0);

  if (pkcs8Key === undefined) {
    pkcs8Key = keyData?.[pki.oids['keyBag'] || '']?.at(0);
  }

  if (!pkcs8Key?.key) {
    throw new Error('Unable to get private key.');
  }

  return pki.privateKeyToPem(pkcs8Key.key);
}

function getCertificateFromP12(p12: pkcs12.Pkcs12Pfx): CertificateResult {
  const bagType = pki.oids['certBag'];

  if (bagType === undefined) {
    throw new Error();
  }

  const certData = p12.getBags({ bagType })[bagType] ?? [];
  const { cert } = certData.at(0) ?? {};

  if (cert === undefined) {
    throw new Error();
  }

  const pemCertificate = pki.certificateToPem(cert);
  const data = cert.subject.attributes;

  const attributes = {
    commonName: findAttr(data, 'commonName') ?? '',
    countryName: findAttr(data, 'countryName') ?? '',
    emailAddress: findAttr(data, 'emailAddress') ?? '',
    localityName: findAttr(data, 'localityName') ?? '',
    organizationName: findAttr(data, 'organizationName') ?? '',
    organizationalUnitName: findAttr(data, 'organizationalUnitName') ?? '',
    stateOrProvinceName: findAttr(data, 'stateOrProvinceName') ?? '',
  };

  return {
    attributes,
    pemCertificate,
    serialNumber: cert.serialNumber,
  };
}

const findAttr = (data: Attribute[], find: string): string | undefined =>
  data.find(({ name }) => name === find)?.value;

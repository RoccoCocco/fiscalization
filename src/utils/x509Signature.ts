import { FileKeyInfo, SignedXml } from 'xml-crypto';
import xmlBuilder from 'xmlbuilder';

import { P12Result } from '../libs/p12pem';

export const constructX509Signature = (
  xmlData: string,
  certificate: P12Result
): string => {
  const signature = new SignedXml();

  signature.signingKey = certificate.pemKey;
  signature.keyInfoProvider = new CustomKeyInfoProvider(certificate);

  signature.addReference('.//*[local-name(.)="RacunZahtjev"]', [
    'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
    'http://www.w3.org/2001/10/xml-exc-c14n#',
  ]);

  signature.computeSignature(xmlData, {
    location: {
      action: 'append',
      reference: './/*[local-name(.)="RacunZahtjev"]',
    },
  });

  return signature.getSignedXml();
};

const removeCertificateTags = (certificate: string) =>
  certificate
    .replace('-----BEGIN CERTIFICATE-----', '')
    .replace('-----END CERTIFICATE-----', '');

class CustomKeyInfoProvider implements FileKeyInfo {
  certificate: P12Result;
  file: string;

  constructor(certificate: P12Result) {
    this.certificate = certificate;
    this.file = '';
  }

  getKey(): Buffer {
    return Buffer.from('', 'utf-8');
  }

  getKeyInfo(): string {
    const key = removeCertificateTags(this.certificate.pemCertificate);

    const issuer = [
      `OU=${this.certificate.attributes.organizationalUnitName}`,
      `O=${this.certificate.attributes.organizationName}`,
      `C=${this.certificate.attributes.countryName}`,
    ].join(',');

    const x509 = {
      X509Data: {
        X509Certificate: key,
        X509IssuerSerial: {
          X509IssuerName: issuer,
          X509SerialNumber: this.certificate.serialNumber,
        },
      },
    };

    return xmlBuilder.create(x509, { encoding: 'UTF-8' }).toString();
  }
}

import { PemResponse } from '../libs/p12pem';
import { SignedXml } from 'xml-crypto';
import xmlBuilder from 'xmlbuilder';

export const constructX509Signature = (
  xmlData: string,
  certificate: PemResponse
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

class CustomKeyInfoProvider {
  certificate: PemResponse;
  file: string;

  constructor(certificate: PemResponse) {
    this.certificate = certificate;
    this.file = '';
  }

  getKey = () => Buffer.from(this.file, 'utf-8');

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

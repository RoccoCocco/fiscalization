import { SignedXml } from 'xml-crypto';
import xmlBuilder from 'xmlbuilder';

import { P12Result } from '../libs/p12pem';

export class X509SignatureBuilder {
  private readonly strippedCertificate: string;

  constructor(private readonly certificate: P12Result) {
    this.strippedCertificate = certificate.pemCertificate
      .replace('-----BEGIN CERTIFICATE-----', '')
      .replace('-----END CERTIFICATE-----', '');
  }

  computeSignature(xmlData: string): string {
    const signedXml = this.create();

    signedXml.computeSignature(xmlData, {
      location: {
        action: 'append',
        reference: './/*[local-name(.)="RacunZahtjev"]',
      },
    });

    return signedXml.getSignedXml();
  }

  private create() {
    const signedXml = new SignedXml({
      canonicalizationAlgorithm: 'http://www.w3.org/2001/10/xml-exc-c14n#',
      getKeyInfoContent: () => this.getKeyInfoContent(),
      privateKey: this.certificate.pemKey,
      signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
    });

    signedXml.addReference({
      digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1',
      transforms: [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/2001/10/xml-exc-c14n#',
      ],
      xpath: './/*[local-name(.)="RacunZahtjev"]',
    });

    return signedXml;
  }

  private getKeyInfoContent(): string {
    const issuer = [
      `OU=${this.certificate.attributes.organizationalUnitName}`,
      `O=${this.certificate.attributes.organizationName}`,
      `C=${this.certificate.attributes.countryName}`,
    ].join(',');

    const x509 = {
      X509Data: {
        X509Certificate: this.strippedCertificate,
        X509IssuerSerial: {
          X509IssuerName: issuer,
          X509SerialNumber: this.certificate.serialNumber,
        },
      },
    };

    return xmlBuilder.create(x509, { encoding: 'UTF-8' }).toString();
  }
}

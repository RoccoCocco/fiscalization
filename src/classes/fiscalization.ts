import builder from 'xmlbuilder';
import uniqid from 'uniqid';

import { P12Result, getPemFromP12 } from '../libs/p12pem';
import {
  X509SignatureBuilder,
  constructXmlInvoiceBody,
  constructXmlInvoiceHeader,
} from '../utils';
import { Invoice } from '../types/invoice';

export class Fiscalization {
  private certificate: P12Result;
  private x509: X509SignatureBuilder;

  public constructor(certificate: Buffer, password: string) {
    this.certificate = getPemFromP12(certificate, password);
    this.x509 = new X509SignatureBuilder(this.certificate);
  }

  public create(invoiceData: Invoice): string {
    const invoiceHeader = constructXmlInvoiceHeader();
    const invoiceBody = constructXmlInvoiceBody(this.certificate, invoiceData);

    const root = builder.create('soapenv:Envelope', { encoding: 'UTF-8' });

    root.attribute(
      'xmlns:soapenv',
      'http://schemas.xmlsoap.org/soap/envelope/'
    );

    const request = root.ele('soapenv:Body').ele('tns:RacunZahtjev');

    request.attribute('xmlns:tns', 'http://www.apis-it.hr/fin/2012/types/f73');
    request.attribute('Id', uniqid());

    request.importDocument(invoiceHeader);
    request.importDocument(invoiceBody);

    const invoiceXml = root.end({ pretty: true });
    const signedXml = this.x509.computeSignature(invoiceXml);

    return signedXml;
  }
}

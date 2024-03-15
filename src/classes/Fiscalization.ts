import builder from 'xmlbuilder';
import uniqid from 'uniqid';

import { P12Result, getPemFromP12 } from '../libs/p12pem';
import { Invoice } from '../types/Invoice';
import { constructX509Signature } from '../utils/X509Signature';
import { constructXmlInvoiceBody } from '../utils/Body';
import { constructXmlInvoiceHeader } from '../utils/Header';

export class Fiscalization {
  private certificate: P12Result;

  public constructor(certificate: Buffer, password: string) {
    this.certificate = getPemFromP12(certificate, password);
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
    const signedXml = constructX509Signature(invoiceXml, this.certificate);

    return signedXml;
  }
}

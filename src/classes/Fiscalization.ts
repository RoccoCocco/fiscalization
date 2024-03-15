import axios, { AxiosResponse } from 'axios';
import builder from 'xmlbuilder';
import uniqid from 'uniqid';

import { DEMO_URL, PRODUCTION_URL } from '../constants';
import { P12Result, getPemFromP12 } from '../libs/p12pem';
import { FiscalizationOptions } from '../types/FiscalizationOptions';
import { Invoice } from '../types/Invoice';
import { constructX509Signature } from '../utils/X509Signature';
import { constructXmlInvoiceBody } from '../utils/Body';
import { constructXmlInvoiceHeader } from '../utils/Header';

export class Fiscalization {
  private certificate: Promise<P12Result>;
  private url;

  public constructor(
    certificatePath: string,
    certificatePassword: string,
    options: FiscalizationOptions | undefined = undefined
  ) {
    this.url =
      options?.demo === true
        ? options.demoUrl || DEMO_URL
        : options?.productionUrl || PRODUCTION_URL;

    this.certificate = getPemFromP12(certificatePath, certificatePassword);
  }

  public async create(invoiceData: Invoice): Promise<string> {
    const invoiceHeader = constructXmlInvoiceHeader();
    const invoiceBody = constructXmlInvoiceBody(
      await this.certificate,
      invoiceData
    );

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
    const signedXml = constructX509Signature(
      invoiceXml,
      await this.certificate
    );

    return signedXml;
  }

  public sendXml(xmlBody: string): Promise<AxiosResponse> {
    const config = { headers: { 'Content-Type': 'text/xml' } };

    return axios.post(this.url, xmlBody, config);
  }
}

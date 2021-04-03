import { PemResponse, getPemFromP12 } from './libs/p12pem';
import axios, { AxiosResponse } from 'axios';
import { Invoice } from './types/Invoice';
import builder from 'xmlbuilder';
import { constructX509Signature } from './utils/X509Signature';
import { constructXmlInvoiceBody } from './utils/Body';
import { constructXmlInvoiceHeader } from './utils/Header';
import uniqid from 'uniqid';

export class Fiskalizacija {
  private certificate: PemResponse;
  private url = 'https://cis.porezna-uprava.hr:8449/FiskalizacijaService';

  public constructor(
    certificatePath: string,
    certificatePassword: string,
    demo = false
  ) {
    if (demo == true) {
      this.url = 'https://cistest.apis-it.hr:8449/FiskalizacijaServiceTest';
    }

    this.certificate = getPemFromP12(certificatePath, certificatePassword);
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

  public sendXml(xmlBody: string): Promise<AxiosResponse> {
    const config = { headers: { 'Content-Type': 'text/xml' } };

    return axios.post(this.url, xmlBody, config);
  }
}

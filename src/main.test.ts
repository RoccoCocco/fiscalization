import fs from 'fs';
import xmljs from 'xml-js';

import { Fiskalizacija } from './Fiskalizacija';
import { mockInvoice } from './__mocks__/Invoice';

describe('Test Main', () => {
  it('Should match', () => {
    const newXML = new Fiskalizacija('./certs/certificate.pfx', 'test').create(
      mockInvoice
    );

    const mockXml = fs.readFileSync('./src/__mocks__/request.xml', 'utf8');

    const mainData = xmljs.xml2js(mockXml);
    const newData = xmljs.xml2js(newXML);

    expect(newData).toStrictEqual(mainData);
    // expect(false).toStrictEqual(false);
  });
});

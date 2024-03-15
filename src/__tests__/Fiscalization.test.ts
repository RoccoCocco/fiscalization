import * as dayjs from 'dayjs';
import * as uniqid from 'uniqid';
import * as uuid from 'uuid';
import axios from 'axios';

import { DEMO_URL, PRODUCTION_URL } from '../constants';
import { mockInvoice, mockInvoiceAlternate } from '../__mocks__/Invoice';
import { Fiscalization } from '../classes/Fiscalization';

jest.mock('axios');
jest.mock('dayjs');
jest.mock('uniqid');
jest.mock('uuid');

const _mockDayjs = {
  format: jest.fn(),
};

(dayjs as any).mockReturnValue(_mockDayjs);
const TEST_CERTIFICATE_PATH = `${__dirname}/../__mocks__/cert.pfx`;
const TEST_CERTIFICATE_PASS = 'apples';

describe('Test Main', () => {
  it('Should be production base URL', async () => {
    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_PATH,
      TEST_CERTIFICATE_PASS
    );

    const xmlData = await fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith(PRODUCTION_URL, xmlData, {
      headers: { 'Content-Type': 'text/xml' },
    });
  });

  it('Should be production custom URL', async () => {
    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_PATH,
      TEST_CERTIFICATE_PASS,
      {
        productionUrl: 'https://mycustomproduction.url',
      }
    );

    const xmlData = await fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith(
      'https://mycustomproduction.url',
      xmlData,
      {
        headers: { 'Content-Type': 'text/xml' },
      }
    );
  });

  it('Should be demo base URL', async () => {
    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_PATH,
      TEST_CERTIFICATE_PASS,
      {
        demo: true,
      }
    );

    const xmlData = await fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith(DEMO_URL, xmlData, {
      headers: { 'Content-Type': 'text/xml' },
    });
  });

  it('Should be demo custom URL', async () => {
    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_PATH,
      TEST_CERTIFICATE_PASS,
      {
        demo: true,
        demoUrl: 'https://mycustomdemo.url',
      }
    );

    const xmlData = await fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith('https://mycustomdemo.url', xmlData, {
      headers: { 'Content-Type': 'text/xml' },
    });
  });

  it('Should match', async () => {
    _mockDayjs.format
      .mockReturnValueOnce('01.01.2001T01:01:01')
      .mockReturnValueOnce('02.02.2002T02:02:02');

    (uniqid as any).mockReturnValueOnce('uniqid-0123456789abcdef');
    (uuid as any).v4.mockReturnValueOnce('uuid-0123456789abcdef');

    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_PATH,
      TEST_CERTIFICATE_PASS
    );
    const newXML = await fiscalization.create(mockInvoice);

    expect(newXML).toMatchSnapshot();
  });

  it('Should match with alternate data', async () => {
    _mockDayjs.format
      .mockReturnValueOnce('01.01.2001T01:01:01')
      .mockReturnValueOnce('02.02.2002T02:02:02');

    (uniqid as any).mockReturnValueOnce('uniqid-0123456789abcdef');
    (uuid as any).v4.mockReturnValueOnce('uuid-0123456789abcdef');

    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_PATH,
      TEST_CERTIFICATE_PASS
    );
    const newXML = await fiscalization.create(mockInvoiceAlternate);

    expect(newXML).toMatchSnapshot();
  });
});

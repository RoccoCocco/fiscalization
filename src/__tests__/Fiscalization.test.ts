import * as uuid from 'uuid';
import axios from 'axios';
import dayjs from 'dayjs';
import uniqid from 'uniqid';

import { DEMO_URL, PRODUCTION_URL } from '../constants';
import { Fiscalization } from '../Fiscalization';
import { mockInvoice } from '../__mocks__/Invoice';

jest.mock('axios');
jest.mock('dayjs');
jest.mock('uniqid');
jest.mock('uuid');

const _mockDayjs = {
  format: jest.fn(),
};

(dayjs as any).mockReturnValue(_mockDayjs);

describe('Test Main', () => {
  it('Should be production base URL', () => {
    const fiscalization = new Fiscalization('./certs/certificate.pfx', 'test');

    const xmlData = fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith(PRODUCTION_URL, xmlData, {
      headers: { 'Content-Type': 'text/xml' },
    });
  });

  it('Should be production custom URL', () => {
    const fiscalization = new Fiscalization('./certs/certificate.pfx', 'test', {
      productionUrl: 'https://mycustomproduction.url',
    });

    const xmlData = fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith(
      'https://mycustomproduction.url',
      xmlData,
      {
        headers: { 'Content-Type': 'text/xml' },
      }
    );
  });

  it('Should be demo base URL', () => {
    const fiscalization = new Fiscalization('./certs/certificate.pfx', 'test', {
      demo: true,
    });

    const xmlData = fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith(DEMO_URL, xmlData, {
      headers: { 'Content-Type': 'text/xml' },
    });
  });

  it('Should be demo custom URL', () => {
    const fiscalization = new Fiscalization('./certs/certificate.pfx', 'test', {
      demo: true,
      demoUrl: 'https://mycustomdemo.url',
    });

    const xmlData = fiscalization.create(mockInvoice);
    fiscalization.sendXml(xmlData);
    expect(axios.post).toBeCalledWith('https://mycustomdemo.url', xmlData, {
      headers: { 'Content-Type': 'text/xml' },
    });
  });

  it('Should match', () => {
    _mockDayjs.format
      .mockReturnValueOnce('01.01.2001T01:01:01')
      .mockReturnValueOnce('02.02.2002T02:02:02');

    (uniqid as any).mockReturnValueOnce('uniqid-0123456789abcdef');
    (uuid as any).v4.mockReturnValueOnce('uuid-0123456789abcdef');

    const fiscalization = new Fiscalization('./certs/certificate.pfx', 'test');
    const newXML = fiscalization.create(mockInvoice);

    expect(newXML).toMatchSnapshot();
  });
});

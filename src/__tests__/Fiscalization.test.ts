import * as uuid from 'uuid';
import dayjs from 'dayjs';
import uniqid from 'uniqid';

import { Fiskalizacija } from '../Fiscalization';
import { mockInvoice } from '../__mocks__/Invoice';

jest.mock('dayjs');
jest.mock('uniqid');
jest.mock('uuid');

describe('Test Main', () => {
  it('Should match', () => {
    const _mockDayjs = {
      format: jest
        .fn()
        .mockReturnValueOnce('01.01.2001T01:01:01')
        .mockReturnValueOnce('02.02.2002T02:02:02'),
    };

    (uniqid as any).mockReturnValueOnce('uniqid-0123456789abcdef');
    (uuid as any).v4.mockReturnValueOnce('uuid-0123456789abcdef');
    (dayjs as any).mockReturnValue(_mockDayjs);

    const fiskalizacija = new Fiskalizacija('./certs/certificate.pfx', 'test');
    const newXML = fiskalizacija.create(mockInvoice);

    expect(newXML).toMatchSnapshot();
  });
});

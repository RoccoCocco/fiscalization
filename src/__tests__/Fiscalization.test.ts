import { readFileSync } from 'fs';

import { mockInvoice, mockInvoiceAlternate } from '../__mocks__/Invoice';
import { Fiscalization } from '../classes/Fiscalization';

const mockFormat = jest.fn();

jest.mock('dayjs', () => () => ({ format: mockFormat }));
jest.mock('uniqid', () => () => 'uniqid-0123456789abcdef');
jest.mock('uuid', () => ({ v4: () => 'uuid-0123456789abcdef' }));

const TEST_CERTIFICATE_PATH = `${__dirname}/../__mocks__/cert.pfx`;
const TEST_CERTIFICATE_PASS = 'apples';
const TEST_CERTIFICATE_BUFFER = readFileSync(TEST_CERTIFICATE_PATH);

describe('Test Main', () => {
  it('Should match', () => {
    mockFormat
      .mockReturnValueOnce('01.01.2001T01:01:01')
      .mockReturnValueOnce('02.02.2002T02:02:02');

    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_BUFFER,
      TEST_CERTIFICATE_PASS
    );
    const xml = fiscalization.create(mockInvoice);

    expect(xml).toMatchSnapshot();
  });

  it('Should match with alternate data', () => {
    mockFormat
      .mockReturnValueOnce('01.01.2001T01:01:01')
      .mockReturnValueOnce('02.02.2002T02:02:02');

    const fiscalization = new Fiscalization(
      TEST_CERTIFICATE_BUFFER,
      TEST_CERTIFICATE_PASS
    );
    const xml = fiscalization.create(mockInvoiceAlternate);

    expect(xml).toMatchSnapshot();
  });
});

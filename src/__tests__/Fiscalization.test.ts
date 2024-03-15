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

describe('Fiscalization', () => {
  let fiscalization: Fiscalization;

  beforeEach(() => {
    fiscalization = new Fiscalization(
      TEST_CERTIFICATE_BUFFER,
      TEST_CERTIFICATE_PASS
    );
  });

  it('XML should match with full data', () => {
    mockFormat
      .mockReturnValueOnce('01.01.2001T01:01:01')
      .mockReturnValueOnce('02.02.2002T02:02:02');

    const xml = fiscalization.create(mockInvoice);

    expect(xml).toMatchSnapshot();
  });

  it('XML should match with partial data', () => {
    mockFormat
      .mockReturnValueOnce('01.01.2001T01:01:01')
      .mockReturnValueOnce('02.02.2002T02:02:02');

    const xml = fiscalization.create(mockInvoiceAlternate);

    expect(xml).toMatchSnapshot();
  });
});

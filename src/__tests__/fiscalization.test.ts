import { readFileSync } from 'fs';

import { mockInvoice, mockInvoiceAlternate } from '../__mocks__/invoice';
import { Fiscalization } from '../classes/fiscalization';

jest.mock('uniqid', () => () => 'uniqid-0123456789abcdef');
jest.mock('uuid', () => ({ v4: () => 'uuid-0123456789abcdef' }));

const TEST_CERTIFICATE_PATH = `${__dirname}/../__mocks__/cert.pfx`;
const TEST_CERTIFICATE_PASS = 'apples';
const TEST_CERTIFICATE_BUFFER = readFileSync(TEST_CERTIFICATE_PATH);

jest.useFakeTimers();
jest.setSystemTime(new Date('2021-01-12T13:05:30.000'));

describe('Fiscalization', () => {
  let fiscalization: Fiscalization;

  beforeEach(() => {
    fiscalization = new Fiscalization(
      TEST_CERTIFICATE_BUFFER,
      TEST_CERTIFICATE_PASS
    );
  });

  it('XML should match with full data', () => {
    const xml = fiscalization.create(mockInvoice);

    expect(xml).toMatchSnapshot();
  });

  it('XML should match with partial data', () => {
    const xml = fiscalization.create(mockInvoiceAlternate);

    expect(xml).toMatchSnapshot();
  });
});

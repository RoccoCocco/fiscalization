import { Fiskalizacija } from '../Fiscalization';
import { mockInvoice } from '../__mocks__/Invoice';

describe('Test Main', () => {
  it('Should match', () => {
    const fiskalizacija = new Fiskalizacija('./certs/certificate.pfx', 'test');
    const newXML = fiskalizacija.create(mockInvoice);

    expect(newXML).toMatchSnapshot();
  });
});

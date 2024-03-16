import { Refund } from '../types/invoice';
import { XmlRefund } from '../types/xmlInvoice';

export const makeRefunds = (refund: Refund[]): XmlRefund[] =>
  refund.map(({ amount, name }) => ({
    IznosN: amount.toFixed(2),
    NazivN: name,
  }));

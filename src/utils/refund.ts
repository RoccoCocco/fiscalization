import { Refund } from '../types/invoice';
import { XmlRefund } from '../types/xmlInvoice';

export const makeRefunds = (refound: Refund[]): XmlRefund[] =>
  refound.map(({ Amount, Name }) => ({
    IznosN: Amount.toFixed(2),
    NazivN: Name,
  }));

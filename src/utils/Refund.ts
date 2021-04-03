import { Refund } from '../types/Invoice';
import { XmlRefund } from '../types/XmlInvoice';

export const makeRefunds = (refound: Refund[]): XmlRefund[] =>
  refound.map(({ Amount, Name }) => ({
    IznosN: Amount.toFixed(2),
    NazivN: Name,
  }));

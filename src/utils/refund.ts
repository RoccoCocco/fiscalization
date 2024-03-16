import { Refund, XmlRefund } from '../types';

export const makeRefunds = (refund: Refund[]): XmlRefund[] =>
  refund.map(({ amount, name }) => ({
    IznosN: amount.toFixed(2),
    NazivN: name,
  }));

import { Refund, XmlRefund } from '../types';

export const makeRefund = (data: Refund): XmlRefund => ({
  IznosN: data.amount.toFixed(2),
  NazivN: data.name,
});

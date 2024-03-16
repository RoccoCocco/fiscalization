import md5 from 'md5';

import { Invoice } from '../types';
import { toDateFormat } from './datetime';

export const createSecurityCode = (
  privateKey: string,
  data: Invoice
): string => {
  const code = [
    privateKey,
    data.oib,
    toDateFormat(data.dateTime),
    data.billNumber.number,
    data.billNumber.bussinessUnit,
    data.billNumber.paymentDevice,
    data.totalValue.toString(),
  ];

  return md5(code.join(''));
};

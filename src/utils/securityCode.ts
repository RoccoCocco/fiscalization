import { createHash } from 'crypto';

import { Invoice } from '../types';
import { toDateFormat } from './utils';

export const createSecurityCode = (
  privateKey: string,
  data: Invoice
): string => {
  return createHash('md5')
    .update(
      [
        privateKey,
        data.oib,
        toDateFormat(data.dateTime),
        data.billNumber.number,
        data.billNumber.bussinessUnit,
        data.billNumber.paymentDevice,
        data.totalValue.toString(),
      ].join('')
    )
    .digest('hex');
};

import dayjs from 'dayjs';
import md5 from 'md5';

import { DATETIME_FORMAT } from '../constants';
import { Invoice } from '../types/invoice';

export const createSecurityCode = (
  privateKey: string,
  data: Invoice
): string => {
  const code = [
    privateKey,
    data.oib,
    dayjs(data.dateTime).format(DATETIME_FORMAT),
    data.billNumber.number,
    data.billNumber.bussinessUnit,
    data.billNumber.paymentDevice,
    data.totalValue.toString(),
  ];

  return md5(code.join(''));
};

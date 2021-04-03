import dayjs from 'dayjs';
import md5 from 'md5';

import { DATETIME_FORMAT } from '../constants/DatetimeFormat';
import { Invoice } from '../types/Invoice';

export const createSecurityCode = (
  privateKey: string,
  data: Invoice
): string => {
  const code = [
    privateKey,
    data.Oib,
    dayjs(data.DateTime).format(DATETIME_FORMAT),
    data.BillNumber.Number,
    data.BillNumber.BussinessUnit,
    data.BillNumber.PaymentDevice,
    data.TotalValue.toString(),
  ];

  return md5(code.join(''));
};

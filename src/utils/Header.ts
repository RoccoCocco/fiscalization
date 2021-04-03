import builder, { XMLElement } from 'xmlbuilder';
import { DATETIME_FORMAT } from '../constants/DatetimeFormat';
import { XmlInvoiceHeader } from '../types/XmlInvoice';
import dayjs from 'dayjs';

const make = (): XmlInvoiceHeader => ({
  // IdPoruke: uuid.v4(),
  // DatumVrijeme: dayjs().format(DATETIME_FORMAT),
  DatumVrijeme: dayjs('2021-04-02 11:44:29').format(DATETIME_FORMAT),
  IdPoruke: '0d285d65-f18a-4f60-ac5d-489f786fbc0c',
});

const stringify = { name: (val: string) => `tns:${val}` };

export const constructXmlInvoiceHeader = (): XMLElement =>
  builder.create('Zaglavlje', { stringify }).ele(make());

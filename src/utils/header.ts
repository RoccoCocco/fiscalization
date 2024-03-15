import * as uuid from 'uuid';
import builder, { XMLElement } from 'xmlbuilder';
import dayjs from 'dayjs';

import { DATETIME_FORMAT } from '../constants';
import { XmlInvoiceHeader } from '../types/XmlInvoice';

const make = (): XmlInvoiceHeader => ({
  DatumVrijeme: dayjs().format(DATETIME_FORMAT),
  IdPoruke: uuid.v4(),
});

const stringify = { name: (val: string) => `tns:${val}` };

export const constructXmlInvoiceHeader = (): XMLElement =>
  builder.create('Zaglavlje', { stringify }).ele(make());

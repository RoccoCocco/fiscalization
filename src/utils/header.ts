import * as uuid from 'uuid';
import builder, { XMLElement } from 'xmlbuilder';

import { XmlInvoiceHeader } from '../types/xmlInvoice';
import { toDateFormat } from './datetime';

const make = (): XmlInvoiceHeader => ({
  DatumVrijeme: toDateFormat(new Date()),
  IdPoruke: uuid.v4(),
});

const stringify = { name: (val: string) => `tns:${val}` };

export const constructXmlInvoiceHeader = (): XMLElement =>
  builder.create('Zaglavlje', { stringify }).ele(make());

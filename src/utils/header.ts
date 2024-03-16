import * as uuid from 'uuid';

import { XmlInvoiceHeader } from '../types/xmlInvoice';
import { toDateFormat } from './utils';

export const createHeader = (): XmlInvoiceHeader => ({
  DatumVrijeme: toDateFormat(new Date()),
  IdPoruke: uuid.v4(),
});

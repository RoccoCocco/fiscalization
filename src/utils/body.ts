import builder, { XMLElement } from 'xmlbuilder';
import dayjs from 'dayjs';

import { DATETIME_FORMAT } from '../constants';
import { Invoice } from '../types/invoice';
import { OrderOfNotes } from '../enums/orderOfNotes';
import { P12Result } from '../libs/p12pem';
import { XmlInvoiceBody } from '../types/xmlInvoice';
import { createSecurityCode } from './securityCode';
import { makeRefunds } from './refund';
import { makeTaxRates } from './taxRates';

const make = (data: Invoice, certificate: P12Result): XmlInvoiceBody => ({
  BrRac: {
    BrOznRac: data.BillNumber.Number,
    OznNapUr: data.BillNumber.PaymentDevice,
    OznPosPr: data.BillNumber.BussinessUnit,
  },
  DatVrijeme: dayjs(data.DateTime).format(DATETIME_FORMAT),
  IznosMarza: data.MarginForTaxRate.toFixed(2),
  IznosNePodlOpor: data.TaxFree.toFixed(2),
  IznosOslobPdv: data.TaxFreeValue.toFixed(2),
  IznosUkupno: data.TotalValue.toFixed(2),
  NacinPlac: data.PaymentType,
  NakDost: data.NoteOfRedelivary ? 'true' : 'false',
  Naknade: { Naknada: makeRefunds(data.Refund || []) },
  Oib: data.Oib,
  OibOper: data.OibOperative,
  OstaliPor: { Porez: makeTaxRates(data.Items.OtherTaxRate || []) },
  OznSlijed: data.NoteOfOrder || OrderOfNotes.PaymentDevice,
  Pdv: { Porez: makeTaxRates(data.Items.Pdv || []) },
  Pnp: { Porez: makeTaxRates(data.Items.Pnp || []) },
  USustPdv: data.HasPDV ? 'true' : 'false',
  ZastKod: createSecurityCode(certificate.pemKey, data),
});

const stringify = { name: (val: string) => `tns:${val}` };

export const constructXmlInvoiceBody = (
  certificate: P12Result,
  data: Invoice
): XMLElement =>
  builder.create('Racun', { stringify }).ele(make(data, certificate));

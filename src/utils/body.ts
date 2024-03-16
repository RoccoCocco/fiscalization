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
    BrOznRac: data.billNumber.number,
    OznNapUr: data.billNumber.paymentDevice,
    OznPosPr: data.billNumber.bussinessUnit,
  },
  DatVrijeme: dayjs(data.dateTime).format(DATETIME_FORMAT),
  IznosMarza: data.marginForTaxRate.toFixed(2),
  IznosNePodlOpor: data.taxFree.toFixed(2),
  IznosOslobPdv: data.taxFreeValue.toFixed(2),
  IznosUkupno: data.totalValue.toFixed(2),
  NacinPlac: data.paymentType,
  NakDost: data.noteOfRedelivary ? 'true' : 'false',
  Naknade: { Naknada: makeRefunds(data.refund ?? []) },
  Oib: data.oib,
  OibOper: data.oibOperative,
  OstaliPor: { Porez: makeTaxRates(data.items.otherTaxRate ?? []) },
  OznSlijed: data.noteOfOrder ?? OrderOfNotes.PaymentDevice,
  Pdv: { Porez: makeTaxRates(data.items.pdv ?? []) },
  Pnp: { Porez: makeTaxRates(data.items.pnp ?? []) },
  USustPdv: data.hasPDV ? 'true' : 'false',
  ZastKod: createSecurityCode(certificate.pemKey, data),
});

const stringify = { name: (val: string) => `tns:${val}` };

export const constructXmlInvoiceBody = (
  certificate: P12Result,
  data: Invoice
): XMLElement =>
  builder.create('Racun', { stringify }).ele(make(data, certificate));

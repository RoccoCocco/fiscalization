import { Invoice, XmlInvoiceBody } from '../types';
import { OrderOfNotes } from '../enums/orderOfNotes';
import { P12Result } from '../libs/p12pem';
import { createSecurityCode } from './securityCode';
import { makeRefund } from './refund';
import { makeTaxRate } from './taxRates';
import { toDateFormat } from './utils';

export const createBody = (data: Invoice, certificate: P12Result): XmlInvoiceBody => ({
  BrRac: {
    BrOznRac: data.billNumber.number,
    OznNapUr: data.billNumber.paymentDevice,
    OznPosPr: data.billNumber.bussinessUnit,
  },
  DatVrijeme: toDateFormat(data.dateTime),
  IznosMarza: data.marginForTaxRate.toFixed(2),
  IznosNePodlOpor: data.taxFree.toFixed(2),
  IznosOslobPdv: data.taxFreeValue.toFixed(2),
  IznosUkupno: data.totalValue.toFixed(2),
  NacinPlac: data.paymentType,
  NakDost: data.noteOfRedelivary ? 'true' : 'false',
  Naknade: { Naknada: data.refund?.map(makeRefund) ?? [] },
  Oib: data.oib,
  OibOper: data.oibOperative,
  OstaliPor: { Porez: data.items.otherTaxRate?.map(makeTaxRate) ?? [] },
  OznSlijed: data.noteOfOrder ?? OrderOfNotes.PaymentDevice,
  Pdv: { Porez: data.items.pdv?.map(makeTaxRate) ?? [] },
  Pnp: { Porez: data.items.pnp?.map(makeTaxRate) ?? [] },
  USustPdv: data.hasPDV ? 'true' : 'false',
  ZastKod: createSecurityCode(certificate.pemKey, data),
});


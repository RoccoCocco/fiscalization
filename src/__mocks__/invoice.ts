import { Invoice } from '../types/invoice';
import { OrderOfNotes } from '../enums/orderOfNotes';
import { PaymentTypes } from '../enums/paymentTypes';

export const mockInvoice: Required<Invoice> = {
  BillNumber: {
    BussinessUnit: 'ODV1',
    Number: 1,
    PaymentDevice: '1',
  },
  DateTime: new Date('2014-07-15T18:00:00.000Z'),
  HasPDV: true,
  Items: {
    OtherTaxRate: [
      { Amount: 12.1, Base: 453.3, Name: 'Naziv1', Rate: 40.1 },
      { Amount: 50.1, Base: 445.1, Name: 'Naziv2', Rate: 27.1 },
    ],
    Pdv: [
      { Amount: 20.1, Base: 400.1, Rate: 25.1 },
      { Amount: 15.44, Base: 500.1, Rate: 10.1 },
    ],
    Pnp: [
      { Amount: 10.1, Base: 100.1, Rate: 30.1 },
      { Amount: 20.1, Base: 200.1, Rate: 20.1 },
    ],
  },
  MarginForTaxRate: 32.0,
  NoteOfOrder: OrderOfNotes.PaymentDevice,
  NoteOfRedelivary: false,
  Oib: '32314900695',
  OibOperative: '34562123431',
  PaymentType: PaymentTypes.Cash,
  Refund: [{ Amount: 17.8, Name: 'Refund1' }],
  TaxFree: 5.1,
  TaxFreeValue: 23.5,
  TotalValue: 456.1,
};

export const mockInvoiceAlternate: Invoice = {
  BillNumber: {
    BussinessUnit: 'ODV1',
    Number: 1,
    PaymentDevice: '1',
  },
  DateTime: new Date('2015-07-15T18:00:00.000Z'),
  HasPDV: false,
  Items: {},
  MarginForTaxRate: 32.0,
  NoteOfRedelivary: true,
  Oib: '32314900695',
  OibOperative: '34562123431',
  PaymentType: PaymentTypes.Cash,
  TaxFree: 5.1,
  TaxFreeValue: 23.5,
  TotalValue: 456.1,
};

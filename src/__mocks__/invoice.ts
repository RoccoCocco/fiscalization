import { Invoice } from '../types/invoice';
import { OrderOfNotes } from '../enums/orderOfNotes';
import { PaymentTypes } from '../enums/paymentTypes';

export const mockInvoice: Required<Invoice> = {
  billNumber: {
    bussinessUnit: 'ODV1',
    number: 1,
    paymentDevice: '1',
  },
  dateTime: new Date('2014-07-15T18:00:00.000Z'),
  hasPDV: true,
  items: {
    otherTaxRate: [
      { amount: 12.1, base: 453.3, name: 'Naziv1', rate: 40.1 },
      { amount: 50.1, base: 445.1, name: 'Naziv2', rate: 27.1 },
    ],
    pdv: [
      { amount: 20.1, base: 400.1, rate: 25.1 },
      { amount: 15.44, base: 500.1, rate: 10.1 },
    ],
    pnp: [
      { amount: 10.1, base: 100.1, rate: 30.1 },
      { amount: 20.1, base: 200.1, rate: 20.1 },
    ],
  },
  marginForTaxRate: 32.0,
  noteOfOrder: OrderOfNotes.PaymentDevice,
  noteOfRedelivary: false,
  oib: '32314900695',
  oibOperative: '34562123431',
  paymentType: PaymentTypes.Cash,
  refund: [{ amount: 17.8, name: 'Refund1' }],
  taxFree: 5.1,
  taxFreeValue: 23.5,
  totalValue: 456.1,
};

export const mockInvoiceAlternate: Invoice = {
  billNumber: {
    bussinessUnit: 'ODV1',
    number: 1,
    paymentDevice: '1',
  },
  dateTime: new Date('2015-07-15T18:00:00.000Z'),
  hasPDV: false,
  items: {},
  marginForTaxRate: 32.0,
  noteOfRedelivary: true,
  oib: '32314900695',
  oibOperative: '34562123431',
  paymentType: PaymentTypes.Cash,
  taxFree: 5.1,
  taxFreeValue: 23.5,
  totalValue: 456.1,
};

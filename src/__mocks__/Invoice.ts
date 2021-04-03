import { Invoice } from '../types/Invoice';
import { OrderOfNotes } from '../enums/OrderOfNotes';
import { PaymentTypes } from '../enums/PaymentTypes';

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
      { Iznos: 12.1, Naziv: 'Naziv1', Osnovica: 453.3, Stopa: 40.1 },
      { Iznos: 50.1, Naziv: 'Naziv2', Osnovica: 445.1, Stopa: 27.1 },
    ],
    Pdv: [
      { Iznos: 20.1, Osnovica: 400.1, Stopa: 25.1 },
      { Iznos: 15.44, Osnovica: 500.1, Stopa: 10.1 },
    ],
    Pnp: [
      { Iznos: 10.1, Osnovica: 100.1, Stopa: 30.1 },
      { Iznos: 20.1, Osnovica: 200.1, Stopa: 20.1 },
    ],
  },
  MarginForTaxRate: 32.0,
  NoteOfOrder: OrderOfNotes.PaymentDevice,
  NoteOfRedelivary: false,
  Oib: '32314900695',
  OibOperative: '34562123431',
  PaymentType: PaymentTypes.Cash,
  Refund: [],
  TaxFree: 5.1,
  TaxFreeValue: 23.5,
  TotalValue: 456.1,
};

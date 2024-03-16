import { OrderOfNotes } from '../enums/orderOfNotes';
import { PaymentTypes } from '../enums/paymentTypes';

export type TaxRate = {
  amount: number;
  base: number;
  name?: string;
  rate: number;
};

export type Refund = {
  amount: number;
  name: string;
};

export type Invoice = {
  billNumber: {
    bussinessUnit: string;
    number: number;
    paymentDevice: string;
  };
  dateTime: Date;
  hasPDV: boolean;
  items: {
    otherTaxRate?: TaxRate[];
    pdv?: TaxRate[];
    pnp?: TaxRate[];
  };
  marginForTaxRate: number;
  noteOfOrder?: OrderOfNotes;
  noteOfRedelivary?: boolean;
  oib: string;
  oibOperative: string;
  paymentType: PaymentTypes;
  refund?: Refund[];
  taxFree: number;
  taxFreeValue: number;
  totalValue: number;
};

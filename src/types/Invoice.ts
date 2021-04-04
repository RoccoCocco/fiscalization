import { OrderOfNotes } from '../enums/OrderOfNotes';
import { PaymentTypes } from '../enums/PaymentTypes';

export type TaxRate = {
  Iznos: number;
  Naziv?: string;
  Osnovica: number;
  Stopa: number;
};

export type Refund = {
  Amount: number;
  Name: string;
};

export type Invoice = {
  BillNumber: {
    BussinessUnit: string;
    Number: number;
    PaymentDevice: string;
  };
  DateTime: Date;
  HasPDV: boolean;
  Items: {
    OtherTaxRate?: TaxRate[];
    Pdv?: TaxRate[];
    Pnp?: TaxRate[];
  };
  MarginForTaxRate: number;
  NoteOfOrder?: OrderOfNotes;
  NoteOfRedelivary?: boolean;
  Oib: string;
  OibOperative: string;
  PaymentType: PaymentTypes;
  Refund?: Refund[];
  TaxFree: number;
  TaxFreeValue: number;
  TotalValue: number;
};

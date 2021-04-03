import { OrderOfNotes } from '../enums/OrderOfNotes';
import { PaymentTypes } from '../enums/PaymentTypes';

export type TaxRate = {
  Naziv?: string;
  Stopa: number;
  Osnovica: number;
  Iznos: number;
};

export type Refund = {
  Name: string;
  Amount: number;
};

export type Invoice = {
  TaxFreeValue: number;
  MarginForTaxRate: number;
  TaxFree: number;
  Refund?: Refund[];
  TotalValue: number;
  PaymentType: PaymentTypes;
  OibOperative: string;
  Oib: string;
  HasPDV: boolean;
  DateTime: Date;
  NoteOfOrder?: OrderOfNotes;
  NoteOfRedelivary?: boolean;
  BillNumber: {
    Number: number;
    BussinessUnit: string;
    PaymentDevice: string;
  };
  Items: {
    Pdv?: TaxRate[];
    Pnp?: TaxRate[];
    OtherTaxRate?: TaxRate[];
  };
};

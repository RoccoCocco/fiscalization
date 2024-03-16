import { TaxRate } from '../types/invoice';
import { XmlTaxRate } from '../types/xmlInvoice';

export const makeTaxRates = (taxes: TaxRate[]): XmlTaxRate[] =>
  taxes.map(({ Amount, Base, Rate, Name }) => ({
    ...(Name ? { Naziv: Name } : {}),
    Iznos: Amount.toFixed(2),
    Osnovica: Base.toFixed(2),
    Stopa: Rate.toFixed(2),
  }));

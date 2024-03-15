import { TaxRate } from '../types/invoice';
import { XmlTaxRate } from '../types/xmlInvoice';

export const makeTaxRates = (taxes: TaxRate[]): XmlTaxRate[] =>
  taxes.map(({ Iznos, Osnovica, Stopa, Naziv }) => ({
    ...(Naziv ? { Naziv } : {}),
    Iznos: Iznos.toFixed(2),
    Osnovica: Osnovica.toFixed(2),
    Stopa: Stopa.toFixed(2),
  }));

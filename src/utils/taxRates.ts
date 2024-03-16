import { TaxRate, XmlTaxRate } from '../types';

export const makeTaxRates = (taxes: TaxRate[]): XmlTaxRate[] =>
  taxes.map(({ amount, base, rate, name }) => ({
    ...(name ? { Naziv: name } : {}),
    Iznos: amount.toFixed(2),
    Osnovica: base.toFixed(2),
    Stopa: rate.toFixed(2),
  }));

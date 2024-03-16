import { TaxRate, XmlTaxRate } from '../types';

export const makeTaxRate = (data: TaxRate): XmlTaxRate => ({
  ...(data.name ? { Naziv: data.name } : {}),
  Iznos: data.amount.toFixed(2),
  Osnovica: data.base.toFixed(2),
  Stopa: data.rate.toFixed(2),
});

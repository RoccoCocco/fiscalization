export type XmlTaxRate = {
  Naziv?: string;
  Stopa: string;
  Osnovica: string;
  Iznos: string;
};

export type XmlRefund = {
  NazivN: string;
  IznosN: string;
};

export type XmlInvoiceHeader = {
  DatumVrijeme: string;
  IdPoruke: string;
};

export type XmlInvoiceBody = {
  Oib: string;
  USustPdv: string;
  DatVrijeme: string;
  OznSlijed: string;
  BrRac: {
    BrOznRac: number;
    OznPosPr: string;
    OznNapUr: string;
  };
  Pdv: {
    Porez: XmlTaxRate[];
  };
  Pnp: {
    Porez: XmlTaxRate[];
  };
  OstaliPor: {
    Porez: XmlTaxRate[];
  };
  IznosOslobPdv: string;
  IznosMarza: string;
  IznosNePodlOpor: string;
  IznosUkupno: string;
  NacinPlac: string;
  OibOper: string;
  ZastKod: string;
  NakDost: string;
  Naknade: {
    Naknada: XmlRefund[];
  };
};

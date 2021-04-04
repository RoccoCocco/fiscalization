export type XmlTaxRate = {
  Iznos: string;
  Naziv?: string;
  Osnovica: string;
  Stopa: string;
};

export type XmlRefund = {
  IznosN: string;
  NazivN: string;
};

export type XmlInvoiceHeader = {
  DatumVrijeme: string;
  IdPoruke: string;
};

export type XmlInvoiceBody = {
  BrRac: {
    BrOznRac: number;
    OznNapUr: string;
    OznPosPr: string;
  };
  DatVrijeme: string;
  IznosMarza: string;
  IznosNePodlOpor: string;
  IznosOslobPdv: string;
  IznosUkupno: string;
  NacinPlac: string;
  NakDost: string;
  Naknade: {
    Naknada: XmlRefund[];
  };
  Oib: string;
  OibOper: string;
  OstaliPor: {
    Porez: XmlTaxRate[];
  };
  OznSlijed: string;
  Pdv: {
    Porez: XmlTaxRate[];
  };
  Pnp: {
    Porez: XmlTaxRate[];
  };
  USustPdv: string;
  ZastKod: string;
};

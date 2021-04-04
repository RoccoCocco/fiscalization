# TS.Fina - Croatian Invoice Fiscalization

Fiscalization for Croatian invoices.

## NOTE

#### 🔥 Still in development and should not be used in production. Use it on your own risk.

#### 🔑 Currently looking for a collaborator that could provide demo certificate for testing purposes.

---

### Usage

Create new instance of `Fiscalization` class and pass required certificate path and password. Options are optional.

```typescript
import { Fiscalization } from '@ts.fina/fiscalization';

const fiscalization = new Fiscalization(
  './certs/certificate.pfx',
  CERTIFICATE_PASSWORD,
  {
    demo: false,
    demoUrl: 'https://mycustomdemo.url',
    productionUrl: 'https://mycustomproduction.url',
  }
);
```

Create and send invoice.

```typescript
import { Invoice } from '@ts.fina/fiscalization';

const myInvoiceData: Invoice = { ... }

const invoiceXml = fiscalization.create(myInvoiceData);
const response = fiscalization.sendXml(myInvoiceData);
```

#### Fiscalization options

| name          | type    | default                                                  | description                   |
| ------------- | ------- | -------------------------------------------------------- | ----------------------------- |
| demo          | boolean | false                                                    | Use demo URL                  |
| demoUrl       | string  | https://cistest.apis-it.hr:8449/FiskalizacijaServiceTest | Provide custom demo URL       |
| productionUrl | string  | https://cis.porezna-uprava.hr:8449/FiskalizacijaService  | Provide custom production URL |

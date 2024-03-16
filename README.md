# TS.Fina - Croatian Invoice Fiscalization

Fiscalization for Croatian invoices.

## NOTE

#### 🔥 Still in development and should not be used in production. Use it on your own risk.

---

### Usage

Create new instance of `Fiscalization` class and pass required certificate path and password. Options are optional.

```typescript
import { Fiscalization } from '@ts.fina/fiscalization';
import { readFileSync } from 'fs';

const certificate = readFileSync('/path-to-certificate/cert.pfx');

const fiscalization = new Fiscalization(
  certificate,
  CERTIFICATE_PASSWORD,
);
```

Create and send invoice.

```typescript
import { Invoice } from '@ts.fina/fiscalization';

const myInvoiceData: Invoice = { ... }

const invoiceXml = fiscalization.create(myInvoiceData);

axios.post('{url}', invoiceXml, { headers: { 'Content-Type': 'text/xml' } })
```

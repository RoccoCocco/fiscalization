# TS.Fina - Croatian Invoice Fiscalization

Fiscalization for Croatian invoices.

## NOTE

#### 🔥 Still in development and should not be used in production. Use it on your own risk.

---

### Usage

Create new instance of `Fiscalization` class and pass required certificate path and password.

```ts
import { Fiscalization } from '@ts.fina/fiscalization';
import { readFileSync } from 'fs';

const certificate = readFileSync('/path-to-certificate/cert.pfx');

const fiscalization = new Fiscalization(
  certificate,
  CERTIFICATE_PASSWORD,
);
```

Create and send invoice.

```ts
import { Invoice } from '@ts.fina/fiscalization';

const invoice: Invoice = { ... }

const xml = fiscalization.create(invoice);

axios.post(FINA_PRODUCTION_URL, xml, { headers: { 'Content-Type': 'text/xml' } })
```

# LNPay NodeJS API

[![npm version](https://img.shields.io/npm/v/lnpay.svg?style=flat-square)](https://www.npmjs.org/package/lnpay)
[![NPM](https://img.shields.io/david/MiguelMedeiros/lnpay.svg?style=flat-square)](https://david-dm.org/MiguelMedeiros/lnpay#info=dependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/MiguelMedeiros/lnpay/badge.svg?style=flat-square)](https://snyk.io/test/github/MiguelMedeiros/lnpay-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

The goal of the LNPay API is to create a toolkit interface for interaction between nodes and external services.

---

## Donate

Help me to stack sats! :blush:

[bc1q4m9hs4fv3etleyqgp4jhvak0q3w26mmkntqq02](bitcoin:bc1q4m9hs4fv3etleyqgp4jhvak0q3w26mmkntqq02)

[Or donate via Lightning Network!](https://paywall.link/to/lnpayapi)

---

## Features

- :pushpin: [Instalation](#installation)
- :pushpin: [Usage](#usage)
- :pushpin: [References](#references)
- :pushpin: [Donate](#donate)
- :pushpin: [Contribute](#contribute)
- :pushpin: [License](#license)

---

## Installation

Using npm:

```bash
$ npm install lnpay
```

Using yarn:

```bash
$ yarn add lnpay
```

---

## Usage

### Initial Config

Initial LNPay configuration.

```javascript
import LNPay from 'lnpay';

const lnpay = LNPay({
  secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
  walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
});
```

<br/>

### Create Wallet

Create a new wallet and corresponding access keys.

[Official Documentation](https://docs.lnpay.co/wallet/create-wallet)
/
[Code Example](examples/createWallet.ts)

Parameters:

- {Object} params - Params object.
- {string} params.user_label - An internal identifier for this

```js
const wallet = await lnpay.createWallet({
  user_label: 'My Wallet',
});
console.log(wallet);
```

<br/>

### Get Balance

Returns info about the wallet, including balance.

[Official Documentation](https://docs.lnpay.co/wallet/get-balance)
/
[Code Example](examples/getBalance.ts)

```js
const balance = await lnpay.getBalance();
console.log(balance);
```

<br/>

### Get Transactions

Get a list of wallet transactions that have been SETTLED. This includes only transactions that have an impact on wallet balance. These DO NOT include unsettled/unpaid invoices.

[Official Documentation](https://docs.lnpay.co/wallet/get-balance)
/
[Code Example](examples/getTransactions.ts)

Parameters:

- {Object} [params] - Params object.
- {number} [params.page] - Page number.

```js
const transactions = await lnpay.getTransactions({
  page: 1,
});
console.log(transactions);
```

<br/>

### Generate Invoice

Generate a new Invoice payment.

[Official Documentation](https://docs.lnpay.co/wallet/generate-invoice)
/
[Code Example](examples/generateInvoice.ts)

Parameters:

- {Object} params - Params object.
- {number} params.num_satoshis - The number of satoshis of the invoice.
- {Object} [params.passThru] - JSON object. you can reference these parameters later via webhooks, etc. Good for ticket # or a certain ID.
- {string} [params.description_hash] - base64 encoded hash of payment. If this is provided, memo will be ignored.
- {Object} [params.memo] - Add a memo text.
- {Object} [params.expiry] - Expires in seconds, defaults to 86400 (1 day)

```js
const invoice = await lnpay.generateInvoice({
  num_satoshis: 100,
  passThru: {
    order_id: '100',
  },
  description_hash: 'MTIzNDY1Nzg5N...',
  memo: 'Invoice memo.',
  expiry: 86400, // 1 day
});
console.log(invoice);
```

<br/>

### Pay Invoice

Generate an LN payment invoice from the specified wallet.

[Official Documentation](https://docs.lnpay.co/wallet/pay-invoice)
/
[Code Example](examples/payInvoice.ts)

Parameters:

- {Object} params - Params object.
- {string} params.payment_request - Payment request string.
- {Object} [params.passThru] - JSON object of custom data to pass thru.

```js
const payInvoice = await lnpay.payInvoice({
  payment_request: 'lnbc50n1p0qjf84p...',
  passThru: {
    order_id: '100',
  },
});
console.log(payInvoice);
```

<br/>

### Keysend

Initiate a keysend payment from your wallet to a destination pubkey.

[Official Documentation](https://docs.lnpay.co/wallet/keysend)
/
[Code Example](examples/keysend.ts)

Parameters:

- {Object} params - Params object.
- {number} params.dest_pubkey - Pubkey of destination node.
- {Object} params.num_satoshis - The number of satoshis of the invoice.
- {string} [params.passThru] - Data to pass along with this invoice for webhooks (e.g. ticketId, etc)
- {Object} [params.custom_records] - key:value pairs to be sent in the onion. key must be an integer greater than 65536. value must be a string, encoded binary data is not supported. Too many values here will break things.

```js
const keysend = await lnpay.keysend({
  passThru: {
    order_id: '100',
  },
  dest_pubkey: '033868c219bdb51a3...',
  num_satoshis: 1,
});
console.log(keysend);
```

<br/>

### Transfer Between Wallets

This section describes how to transfer sats between wallets within LNPay.

[Official Documentation](https://docs.lnpay.co/wallet/transfers-between-wallets)
/
[Code Example](examples/transfer.ts)

Parameters:

- {Object} params - Params object.
- {string} params.dest_wallet_id - Destination wallet access key (WAK) or wallet_id
- {number} params.num_satoshis - Sats for this transfer
- {string} params.memo - Memo note for this transfer
- {string} params.lnPayParams - JSON array of custom data to pass thru.

```js
const transfer = await lnpay.transfer({
  dest_wallet_id: 'w_n743yizWqe43Oz',
  num_satoshis: 1,
  memo: 'Transfer Memo',
  lnPayParams: {
    order_id: '100',
  },
});
console.log(transfer);
```

<br/>

### LN Url Withdraw

Generate an LNURL-withdraw link.

[Official Documentation](https://docs.lnpay.co/wallet/lnurl-withdraw)
/
[Code Example](examples/lnUrlWithdraw.ts)

Parameters:

- {Object} [params] - Params object.
- {boolean} [params.public] - (default: false) if set to true, the LNURL will be a one-time allowable withdraw for the amount set with no sensitive data in the LNURL. Good for public use.
- {string} [params.passThru] - Base64 encoded json of data to use in webhooks, etc
- {string} [params.memo] - Memo note for the invoice.
- {number} [params.num_satoshis] - Max number of satoshis this LNURL is good for. If blank max wallet balance is used.

```js
const lnUrlWithdraw = await lnpay.lnUrlWithdraw({
  public: false,
  memo: 'LNURL Withdraw memo',
  num_satoshis: 3,
});
console.log(lnUrlWithdraw);
```

<br/>

### Get Invoice Status

Retrieve a LN transaction (invoice). This is usually used to see if a transaction has been settled or not, and for how much.

[Official Documentation](https://docs.lnpay.co/lntx/get-invoice-status)
/
[Code Example](examples/getInvoice.ts)

Parameters:

- {Object} params - Params object.
- {string} params.id - Transaction id. e.g. lntx_82yveCX2Wn0EkkdyzvyBv

```js
const getInvoice = await lnpay.getInvoice({
  id: 'lntx_82yveCX2Wn0EkkdyzvyBv',
});
console.log(getInvoice);
```

<br/>

### Create Paywall

Retrieve a LN transaction (invoice). This is usually used to see if a transaction has been settled or not, and for how much.

[Official Documentation](https://docs.lnpay.co/lntx/get-invoice-status)
/
[Code Example](examples/getInvoice.ts)

Parameters:

- {Object} params - Params object.
- {string} params.destination_url
- {string} params.memo
- {string} params.short_url
- {number} params.num_satoshis

```js
const paywall = await lnpay.createPaywall({
  destination_url: 'https://bigsun.xyz',
  memo: 'This is my memo',
  short_url: 'bigsun',
  num_satoshis: 100,
});
console.log(paywall);
```

---

## References

- LNPay Website: [https://lnpay.co](https://lnpay.co)
- LNPay API Documentation: [https://docs.lnpay.co/](https://docs.lnpay.co/)
- LNPay Telegram Group: [https://t.me/paywallers](https://t.me/paywallers)
- Author of this repository: [https://miguelmedeiros.com.br](https://miguelmedeiros.com.br)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)

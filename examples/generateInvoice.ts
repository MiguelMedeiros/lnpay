const LNPay = require('../src/index');

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Generate Invoice
  // https://docs.lnpay.co/wallet/generate-invoice
  const invoice = await lnpay.generateInvoice({
    num_satoshis: 100,
    passTru: {
      order_id: '100',
    },
    description_hash: 'MTIzNDY1Nzg5NDU2MTMyNDU2Nzg5NTQ2',
    memo: 'Invoice memo.',
    expiry: 86400, // 1 day
  });
  console.log(invoice);
};
init();

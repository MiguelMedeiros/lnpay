import LNPay from '../src/index';

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Pay Invoice
  // https://docs.lnpay.co/wallet/pay-invoice
  const payInvoice = await lnpay.payInvoice({
    payment_request: 'lnbc50n1p0qjf84p...',
    passTru: {
      order_id: '100',
    },
  });
  console.log(payInvoice);
};
init();

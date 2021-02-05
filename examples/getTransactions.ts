const LNPay = require('../src/index');

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Get Transactions
  // https://docs.lnpay.co/wallet/get-balance
  const transactions = await lnpay.getTransactions({
    page: 1,
  });
  console.log(transactions);
};
init();

import LNPay from '../src/index';

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Get Balance
  // https://docs.lnpay.co/wallet/get-balance
  const balance = await lnpay.getBalance();
  console.log(balance);
};
init();

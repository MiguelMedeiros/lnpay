import LNPay from '../src/index';

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Create Paywall
  // https://docs.lnpay.co/paywall/create-paywall
  const paywall = await lnpay.createPaywall({
    destination_url: 'https://bigsun.xyz',
    memo: 'This is my memo',
    short_url: 'bigsun',
    num_satoshis: 100,
  });
  console.log(paywall);
};
init();

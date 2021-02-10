import LNPay from '../src/index';

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // LN Url Withdraw
  // https://docs.lnpay.co/wallet/lnurl-withdraw
  const lnUrlWithdraw = await lnpay.lnUrlWithdraw({
    public: false,
    memo: 'LNURL Withdraw memo',
    num_satoshis: 3,
  });
  console.log(lnUrlWithdraw);
};
init();

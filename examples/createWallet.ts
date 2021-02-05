const LNPay = require('../src/index');

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Create Wallet
  // https://docs.lnpay.co/wallet/create-wallet
  const wallet = await lnpay.createWallet({
    user_label: 'Elon Musk Wallet',
  });
  console.log(wallet);
};
init();

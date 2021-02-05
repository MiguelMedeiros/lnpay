const LNPay = require('../src/index');

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Keysend
  // https://docs.lnpay.co/wallet/keysend
  const keysend = await lnpay.keysend({
    passTru: {
      order_id: '100',
    },
    dest_pubkey:
      '033868c219bdb51a33560d854d500fe7d3898a1ad9e05dd89d0007e11313588500',
    num_satoshis: 1,
  });
  console.log(keysend);
};
init();

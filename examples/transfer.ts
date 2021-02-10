import LNPay from '../src/index';

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Transfers Between Wallets
  // https://docs.lnpay.co/wallet/transfers-between-wallets
  const transfer = await lnpay.transfer({
    dest_wallet_id: 'w_n743yizWqe43Oz',
    num_satoshis: 1,
    memo: 'Transfer Memo',
    lnPayParams: {
      order_id: '100',
    },
  });
  console.log(transfer);
};
init();

import LNPay from '../src/index';

const init = async () => {
  // LNPay Initial Config
  const lnpay = LNPay({
    secretKey: 'pak_O0iUMxk8kK_qUzkT4YKFvp1ZsUtp',
    walletAccessKey: 'waka_kqvaiFFl4Tjq4rgAXlwsu6',
  });

  // Get Invoice Status
  // https://docs.lnpay.co/lntx/get-invoice-status
  const getInvoice = await lnpay.getInvoice({
    id: 'lntx_82yveCX2Wn0EkkdyzvyBv',
  });
  console.log(getInvoice);
};
init();

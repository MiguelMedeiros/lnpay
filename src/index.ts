const axios = require('axios');

interface LNPayConfig {
  secretKey: string;
  walletAccessKey?: string;
}

class LNPayClass {
  secretKey = '';
  walletAccessKey = '';
  api: any;

  /**
   * Class constructor.
   *
   * @param {LNPayConfig} params - Params object.
   */
  constructor(params: LNPayConfig) {
    try {
      this.secretKey = params.secretKey;
      this.walletAccessKey = params.walletAccessKey || '';
      this.api = axios.create({
        baseURL: 'https://lnpay.co/v1',
        headers: {
          'X-API-Key': this.secretKey,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Create a new wallet and corresponding access keys.
   *
   * @param {Object} params - Params object.
   * @param {string} params.user_label - An internal identifier for this wallet.
   */
  createWallet = async (params: { user_label: string }) => {
    try {
      return await this.api
        .post(`/wallet`, params)
        .then((res: any) => {
          this.secretKey = res.data.access_keys['Wallet Admin'][0];
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Returns info about the wallet, including balance.
   */
  getBalance = async () => {
    try {
      return await this.api
        .get(`/wallet/${this.walletAccessKey}`)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Get a list of wallet transactions that have been SETTLED. This includes only transactions that have an impact on wallet balance. These DO NOT include unsettled/unpaid invoices.
   *
   * @param {Object} [params] - Params object.
   * @param {number} [params.page] - Page number.
   */
  getTransactions = async (params: { page?: number }) => {
    try {
      return await this.api
        .get(`/wallet/${this.walletAccessKey}/transactions`, {
          params,
        })
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Generate a new Invoice payment.
   *
   * @param {Object} params - Params object.
   * @param {number} params.num_satoshis - The number of satoshis of the invoice.
   * @param {Object} [params.passTru] - JSON object. you can reference these parameters later via webhooks, etc. Good for ticket # or a certain ID.
   * @param {string} [params.description_hash] - base64 encoded hash of payment. If this is provided, memo will be ignored.
   * @param {Object} [params.memo] - Add a memo text.
   * @param {Object} [params.expiry] - Expires in seconds, defaults to 86400 (1 day)
   */
  generateInvoice = async (
    params: {
      num_satoshis: number;
      passTru?: Record<string, unknown>;
      description_hash?: string;
      memo?: string;
      expiry?: number;
    } = {
      num_satoshis: 0,
      expiry: 86400,
    }
  ) => {
    try {
      return await this.api
        .post(`/wallet/${this.walletAccessKey}/invoice`, params)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Generate an LN payment invoice from the specified wallet.
   *
   * @param {Object} params - Params object.
   * @param {string} params.payment_request - Payment request string.
   * @param {Object} [params.passTru] - JSON object of custom data to pass thru.
   */
  payInvoice = async (params: {
    payment_request: string;
    passThru?: Record<string, unknown>;
  }) => {
    try {
      return await this.api
        .post(`/wallet/${this.walletAccessKey}/withdraw`, params)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Initiate a keysend payment from your wallet to a destination pubkey.
   *
   * @param {Object} params - Params object.
   * @param {number} params.dest_pubkey - Pubkey of destination node.
   * @param {Object} params.num_satoshis - The number of satoshis of the invoice.
   * @param {string} [params.passTru] - Data to pass along with this invoice for webhooks (e.g. ticketId, etc)
   * @param {Object} [params.custom_records] - key:value pairs to be sent in the onion. key must be an integer greater than 65536. value must be a string, encoded binary data is not supported. Too many values here will break things.
   */
  keysend = async (params: {
    dest_pubkey: string;
    num_satoshis: number;
    passTru?: Record<string, unknown>;
    custom_records?: Record<string, unknown>;
  }) => {
    try {
      return await this.api
        .post(`/wallet/${this.walletAccessKey}/keysend`, params)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This section describes how to transfer sats between wallets within LNPay.
   *
   * @param {Object} params - Params object.
   * @param {string} params.dest_wallet_id - Destination wallet access key (WAK) or wallet_id
   * @param {number} params.num_satoshis - Sats for this transfer
   * @param {string} params.memo - Memo note for this transfer
   * @param {string} params.lnPayParams - JSON array of custom data to pass thru.
   */
  transfer = async (params: {
    dest_wallet_id: string;
    num_satoshis: number;
    memo?: string;
    lnPayParams?: string[];
  }) => {
    try {
      return await this.api
        .post(`/wallet/${this.walletAccessKey}/transfer`, params)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Generate an LNURL-withdraw link.
   *
   * @param {Object} [params] - Params object.
   * @param {boolean} [params.public] - (default: false) if set to true, the LNURL will be a one-time allowable withdraw for the amount set with no sensitive data in the LNURL. Good for public use.
   * @param {string} [params.passTru] - Base64 encoded json of data to use in webhooks, etc
   * @param {string} [params.memo] - Memo note for the invoice.
   * @param {number} [params.num_satoshis] - Max number of satoshis this LNURL is good for. If blank max wallet balance is used.
   */
  lnUrlWithdraw = async (params: {
    public?: boolean;
    passTru?: string;
    memo?: string;
    num_satoshis?: number;
  }) => {
    try {
      return await this.api
        .get(`/wallet/${this.walletAccessKey}/lnurl/withdraw`, params)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Retrieve a LN transaction (invoice). This is usually used to see if a transaction has been settled or not, and for how much.
   *
   * @param {Object} params - Params object.
   * @param {string} params.id - Transaction id. e.g. lntx_82yveCX2Wn0EkkdyzvyBv
   */
  getInvoice = async (params: { id: string }) => {
    try {
      return await this.api
        .get(`lntx/${params.id}`)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = (params: LNPayConfig): LNPayClass => {
  return new LNPayClass(params);
};

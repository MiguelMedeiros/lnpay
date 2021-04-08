import axios from 'axios';

interface LNPayConfig {
  secretKey: string;
  walletAccessKey?: string;
}

class LNPayClass {
  secretKey = '';
  walletAccessKey = '';
  api: any;

  constructor(params: LNPayConfig) {
    this.secretKey = params.secretKey;
    this.walletAccessKey = params.walletAccessKey || '';
    this.api = axios.create({
      baseURL: 'https://api.lnpay.co/v1',
      headers: {
        'X-API-Key': this.secretKey,
      },
    });
  }

  createWallet = async (params: { user_label: string }) => {
    return await this.api
      .post(`/wallet`, params)
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            updated_at: number;
            user_label: string;
            balance: number;
            statusType: { type: string; name: string; display_name: string };
            access_keys: {
              'Wallet Admin': string[];
              'Wallet Invoice': string[];
              'Wallet Read': string[];
            };
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  getBalance = async () => {
    return await this.api
      .get(`/wallet/${this.walletAccessKey}`)
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            updated_at: number;
            user_label: string;
            balance: number;
            statusType: { type: string; name: string; display_name: string };
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  getTransactions = async (params: { page?: number }) => {
    return await this.api
      .get(`/wallet/${this.walletAccessKey}/transactions`, {
        params,
      })
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            num_satoshis: number;
            user_label: string;
            wal: {
              id: string;
              created_at: number;
              updated_at: number;
              user_label: string;
              balance: number;
              statusType: Record<string, unknown>;
            };
            wtxType: {
              layer: string;
              name: string;
              display_name: string;
            };
            lnTx: {
              id: string;
              created_at: number;
              ln_node_id: string;
              dest_pubkey: string;
              payment_request: string;
              r_hash_decoded: string;
              memo: string;
              description_hash: string;
              num_satoshis: number;
              fee_msat: number;
              expiry: number;
              expires_at: number;
              payment_preimage: string;
              settled: number;
              settled_at: number;
              is_keysend: string;
              custom_records: string;
            };
            passThru: Record<string, unknown>;
          }[];
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

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
    return await this.api
      .post(`/wallet/${this.walletAccessKey}/invoice`, params)
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            ln_node_id: string;
            dest_pubkey: string;
            payment_request: string;
            r_hash_decoded: string;
            memo: string;
            description_hash: string;
            num_satoshis: number;
            fee_msat: number;
            expiry: number;
            expires_at: number;
            payment_preimage: string;
            settled: number;
            settled_at: string;
            is_keysend: string;
            custom_records: string;
            passThru: any;
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  payInvoice = async (params: {
    payment_request: string;
    passThru?: Record<string, unknown>;
  }) => {
    return await this.api
      .post(`/wallet/${this.walletAccessKey}/withdraw`, params)
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            num_satoshis: number;
            user_label: string;
            wal: {
              id: string;
              created_at: number;
              updated_at: number;
              user_label: string;
              balance: number;
              statusType: {
                type: string;
                name: string;
                display_name: string;
              };
            };
            wtxType: {
              layer: string;
              name: string;
              display_name: string;
            };
            lnTx: {
              id: string;
              created_at: number;
              dest_pubkey: string;
              payment_request: string;
              r_hash_decoded: string;
              memo: string;
              description_hash: string;
              num_satoshis: number;
              expiry: number;
              expires_at: number;
              payment_preimage: string;
              settled: number;
              settled_at: number;
              is_keysend: string;
              custom_records: string;
            };
            passThru: {
              method: string;
            };
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  keysend = async (params: {
    dest_pubkey: string;
    num_satoshis: number;
    passTru?: Record<string, unknown>;
    custom_records?: Record<string, unknown>;
  }) => {
    return await this.api
      .post(`/wallet/${this.walletAccessKey}/keysend`, params)
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            num_satoshis: number;
            user_label: string;
            wal: {
              id: string;
              created_at: number;
              updated_at: number;
              user_label: string;
              balance: number;
              statusType: {
                type: string;
                name: string;
                display_name: string;
              };
            };
            wtxType: {
              layer: string;
              name: string;
              display_name: string;
            };
            lnTx: {
              id: string;
              created_at: number;
              ln_node_id: string;
              dest_pubkey: string;
              payment_request: string;
              r_hash_decoded: string;
              memo: string;
              description_hash: string;
              num_satoshis: number;
              expiry: number;
              expires_at: string;
              payment_preimage: string;
              settled: number;
              settled_at: number;
              is_keysend: number;
              custom_records: any;
            };
            passThru: {
              method: string;
              ticketId: string;
            };
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  transfer = async (params: {
    dest_wallet_id: string;
    num_satoshis: number;
    memo?: string;
    lnPayParams?: Record<string, unknown>;
  }) => {
    return await this.api
      .post(`/wallet/${this.walletAccessKey}/transfer`, params)
      .then(
        (res: {
          data: {
            wtx_transfer_in: {
              id: string;
              created_at: number;
              num_satoshis: number;
              user_label: string;
              wal: {
                id: string;
                created_at: number;
                updated_at: number;
                user_label: string;
                balance: number;
                statusType: string;
              };
              wtxType: {
                layer: string;
                name: string;
                display_name: string;
              };
              lnTx: null;
              passThru: {
                lnPayParams: Record<string, unknown>;
                dest_wallet_id: string;
                source_wallet_id: string;
              };
            };
            wtx_transfer_out: {
              id: string;
              created_at: number;
              num_satoshis: number;
              user_label: string;
              wal: {
                id: string;
                created_at: number;
                updated_at: number;
                user_label: string;
                balance: number;
                statusType: Record<string, unknown>;
              };
              wtxType: {
                layer: string;
                name: string;
                display_name: string;
              };
              lnTx: null;
              passThru: {
                lnPayParams: Record<string, unknown>;
                dest_wallet_id: string;
                source_wallet_id: string;
              };
            };
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  lnUrlWithdraw = async (params: {
    public?: boolean;
    passTru?: string;
    memo?: string;
    num_satoshis?: number;
  }) => {
    return await this.api
      .get(`/wallet/${this.walletAccessKey}/lnurl/withdraw`, params)
      .then(
        (res: {
          data: {
            lnurl: string;
            ott: string;
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  getInvoice = async (params: { id: string }) => {
    return await this.api
      .get(`/lntx/${params.id}`)
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            num_satoshis: number;
            user_label: string;
            wal: {
              id: string;
              created_at: number;
              updated_at: number;
              user_label: string;
              balance: number;
              statusType: {
                type: string;
                name: string;
                display_name: string;
              };
            };
            wtxType: {
              layer: string;
              name: string;
              display_name: string;
            };
            lnTx: {
              id: string;
              created_at: number;
              dest_pubkey: string;
              payment_request: string;
              r_hash_decoded: string;
              memo: string;
              description_hash: string;
              num_satoshis: number;
              expiry: number;
              expires_at: number;
              payment_preimage: string;
              settled: number;
              settled_at: number;
              is_keysend: string;
              custom_records: string;
            };
            passThru: {
              method: string;
            };
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };

  createPaywall = async (params: {
    destination_url: string;
    short_url?: string;
    memo?: string;
    num_satoshis?: number;
    template_id?: string;
    link_rule_exp_id?: string;
  }) => {
    return await this.api
      .post(`/paywall`, params)
      .then(
        (res: {
          data: {
            id: string;
            created_at: number;
            updated_at: number;
            destination_url: string;
            memo: string;
            short_url: string;
            paywall_link: string;
            template: string;
            num_satoshis: number;
            passThru: {
              extraAttributes: {
                unlock_threshold: number;
                identifier_in_memo: false;
                send_partial_preimage_redirect: false;
              };
            };
            custyDomain: {
              domain_name: string;
            };
            statusType: {
              type: string;
              name: string;
              display_name: string;
            };
            paywallType: {
              name: string;
              display_name: string;
              description: string;
            };
            linkExpRule: {
              type: string;
              name: string;
              display_name: string;
              time_minutes: number;
            };
          };
        }) => {
          return res.data;
        }
      )
      .catch(
        (err: {
          response: {
            data: {
              name: string;
              message: string;
              code: number;
              status: number;
            };
          };
        }) => {
          throw new Error(err.response.data.message);
        }
      );
  };
}

export default (params: LNPayConfig): LNPayClass => {
  return new LNPayClass(params);
};

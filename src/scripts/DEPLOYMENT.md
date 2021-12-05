# Contract Deployment

The following steps to deploy the system on a new network.
This assumes the (native fee token) junox-faucet has already been deployed
and describes the setup of the contracts only.

## Prerequisites

1. Properly set the blockchain details in `config` of `config.js`
2. Generate 3 addresses and mnemonics, with help of Keplr: admin, oracle, investor
3. Send > 1000 JUNOX to admin and oracle. 10 JUNOX to investor
4. You can rebuild contracts from source and copy them in the `contracts` dir if not already done

## Set up Token and Faucet

Upload the 3 required contracts and record their codeIds (in config.js)

```shell
export MNEMONIC="admin-mnemonic-here"
./upload_contracts.js
```
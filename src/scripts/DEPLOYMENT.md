# Contract Deployment

The following steps to deploy the system on a new network.
This assumes the (native fee token) junox-faucet has already been deployed
and describes the setup of the contracts only.

## Prerequisites

1. Properly set the blockchain details in `config.js:config`
2. Generate 3 addresses and mnemonics, with help of Keplr: admin, oracle, investor
3. Send > 1000 JUNOX to admin and oracle. 10 JUNOX to investor
4. You can rebuild contracts from source and copy them in the `contracts` dir if not already done

## Set up Contracts

Upload the 3 required contracts.

```shell
source ./secrets/admin
export MNEMONIC="admin-mnemonic-here"
./upload_contracts.js
```

Update the CodeIds in `config.js:contracts` from output of this script

```shell
./init_wynd_token.js
```

Take the output address and enter in `config.js:contracts.wyndAddr`

```shell
./init_facuet.js
```

Take the output address and enter in `config.js:contracts.faucetAddr`

```shell
./init_wynd_invest.js
```

Take the output address and enter in `config.js:contracts.investAddr`

## Load oracle data


```shell
source ./secrets/oracle
export MNEMONIC="oracle-mnemonic-here"
./submit_oracle.js
```

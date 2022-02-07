#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const { CosmWasmClient } = require('@cosmjs/cosmwasm-stargate');

const { contracts } = require("./config");

// from ../context/chain.js
const config = {
    endpoint: 'https://rpc.uni.wyndex.io:443/',
    bech32prefix: 'juno',
    feeDenom: 'ujunox',
    mnemonic:
      'wild enact trust mean try snack evoke bring gown core curtain ahead',
};
  
async function main() {
    const client = await CosmWasmClient.connect(config.endpoint);

    const toCheck = [
        // main accounts
        "juno1v2gdcsw27ncrrch3e78c5tfym4su8zlwv2r9rd",
        "juno14zw7q2rhk76uzvpj3a9yw88zjp0qgaa79zf9dv",
        "juno1l3493que6nqetkf73qc2mfknd5jn5mlc7qw8wv",
        // faucet itself
        "juno1kmya9p26a9ecq07sxdgkkfmr8pcqyszv7gmkyqz6hlt006qr75lq2a8mw9"
    ];

    for (const address of toCheck) {
        const { amount} = await client.getBalance(address, "ujunox");
        const query = {balance: {address}};
        const {balance} = await client.queryContractSmart(contracts.wyndAddr, query);
        console.log(`${address}: ${amount} ujunox / ${balance} uWYND`);
    }

}  

main().then(
    () => {
      process.exit(0);
    },
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
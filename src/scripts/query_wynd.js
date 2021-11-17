#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const { CosmWasmClient } = require('@cosmjs/cosmwasm-stargate');

// from ../context/chain.js
const config = {
    endpoint: 'https://rpc.uni.junomint.com:443/',
    bech32prefix: 'juno',
    feeDenom: 'ujunox',
    mnemonic:
      'wild enact trust mean try snack evoke bring gown core curtain ahead',
};
  
const wyndAddress = "juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq";

async function main() {
    const client = await CosmWasmClient.connect(config.endpoint);

    const toCheck = [
        // main accounts
        "juno1pxa9trxza5e2w7sdk2a0xng86y4fnena4e0pka",
        "juno1qd3p79cd82hz8p20gr4gcqze33eauuka6929w0",
        // secondary unloaded account
        "juno19u5ugg4r3haggcstnk7vccxfyju3n56hf23r07",
        // faucet itself
        "juno1w6tvhn4gsp5wxfzqr08rgvfe29zx06rq92nep5j8scvv5dfl79ws72t4uw"
    ];

    for (const address of toCheck) {
        const query = {balance: {address}};
        const {balance} = await client.queryContractSmart(wyndAddress, query);
        console.log(`${address}: ${balance}`);
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
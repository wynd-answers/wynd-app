#!/usr/bin/env node
/*jshint esversion: 8 */

// Usage: ./withdraw.js

/* eslint-disable @typescript-eslint/naming-convention */
const axios = require("axios");
const { toAscii, toBase64 } = require('@cosmjs/encoding');
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

// from ../context/chain.js
const config = {
  endpoint: 'https://rpc.uni.wyndex.io:443/',
  bech32prefix: 'juno',
  feeDenom: 'ujunox',
  mnemonic:
    'wild enact trust mean try snack evoke bring gown core curtain ahead',
};

const investAddr = "juno12pdkmn8qf09rn5yuf6lpreml8ypf45uzkvwyeztaqpjncpfwk0kqp3mrpr";
const wyndAddress = "juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq";

async function main() {
    // use the faucet account to upload (it has fee tokens)
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, {
      prefix: config.bech32prefix,
    });
    const { address } = (await wallet.getAccounts())[0];
    console.log(address);
  
    const options = {
      prefix: config.bech32prefix,
    };
    const client = await SigningCosmWasmClient.connectWithSigner(
      config.endpoint,
      wallet,
      options
    );

    let { balance } = await client.queryContractSmart(wyndAddress, {balance: {address}});
    console.info(`Balance: ${balance} uWYND`);

    const fee = {
      gas: "800000",
      amount: [{
        denom: config.feeDenom,
        // 0.025 * gas
        amount: "20000",
      }]
    };

    const msg = { withdraw: { }};
    console.log("Executing...");
    const { logs } = await client.execute(address, investAddr, msg, fee, "Withdraw Investments");

    let { balance: newBalance } = await client.queryContractSmart(wyndAddress, {balance: {address}});
    console.info(`New Balance: ${newBalance} uWYND`);

    console.debug(`Execute succeeded. Receipt: `);
    const events = logs[0].events;
    console.log(JSON.stringify(events, undefined, 2));
  }
  
  main().then(
    () => {
      console.info('All done.');
      process.exit(0);
    },
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
  
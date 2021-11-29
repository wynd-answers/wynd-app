#!/usr/bin/env node
/*jshint esversion: 8 */

// Usage: ./invest.js 832693fffffffff

/* eslint-disable @typescript-eslint/naming-convention */
const axios = require("axios");
const { toAscii, toBase64 } = require('@cosmjs/encoding');
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

// from ../context/chain.js
const config = {
  endpoint: 'https://rpc.uni.junomint.com:443/',
  bech32prefix: 'juno',
  feeDenom: 'ujunox',
  mnemonic:
    'alien social loop what season kind jealous scrap spy walk laugh picture',
};

const investAddr = "juno12pdkmn8qf09rn5yuf6lpreml8ypf45uzkvwyeztaqpjncpfwk0kqp3mrpr";
const wyndAddress = "juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq";

function logToEvents(logs) {
    let events = logs[0].events.map(eventObject);
    return events.reduce((obj, evt) => Object.assign(obj, evt), {});
}

function eventObject(event) {
    let attributes = event.attributes.reduce((obj, attr) => Object.assign(obj, { [attr.key]: attr.value }), {});
    return { [event.type]: attributes };
}

// this turns a JSON object to a base64-encoding of the serialized JSON
// this is needed when sending cw20 tokens to a contracts (see "send" below)
function encodeMsg(obj) {
  return toBase64(toAscii(JSON.stringify(obj)));
}

async function main() {
    if (process.argv.length != 3) {
      console.error("Usage: ./invest.js <r3 index>");
      process.exit(1);
    }
    const hex = process.argv[2];

    // use the faucet account to upload (it has fee tokens)
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, {
      prefix: config.bech32prefix,
    });

    console.log(wallet);
    
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

    let juno = await client.getBalance(address, "ujunox");
    console.info(`Balance: ${juno.amount} ${juno.denom}`);

    let { balance } = await client.queryContractSmart(wyndAddress, {balance: {address}});
    console.info(`Balance: ${balance} uWYND`);

    let { investments } = await client.queryContractSmart(investAddr, {list_investments: {investor: address}});
    console.info(`All investments:`);
    investments.forEach(x => console.log(x));

    const fee = {
      gas: "400000",
      amount: [{
        denom: config.feeDenom,
        // 0.025 * gas
        amount: "10000",
      }]
    };

    const invest = { invest: { hex }};
    const send = { send: {
      contract: investAddr,
      amount: "123000000", // 123 WYND
      msg: encodeMsg(invest),
    }}

    console.log("Executing...");
    const { logs } = await client.execute(address, wyndAddress, send, fee, "Make Investment");

    console.debug(`Execute succeeded. Receipt: `);
    const events = logToEvents(logs);
    console.log(events);
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
  
#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const axios = require("axios");
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { ConstructionOutlined } = require("@mui/icons-material");

// from ../context/chain.js
const config = {
  endpoint: 'https://rpc.uni.junomint.com:443/',
  bech32prefix: 'juno',
  feeDenom: 'ujunox',
  // this one controls the oracle
  mnemonic:
    'wagon romance envelope exile movie pencil happy one keep large glove floor',
};

const investAddr = "juno12pdkmn8qf09rn5yuf6lpreml8ypf45uzkvwyeztaqpjncpfwk0kqp3mrpr";
const apiUrl = "https://api.wyndex.io/api/fetch_latest";


async function loadOracleData(since) {
    const { data }  = await axios.get(apiUrl);
    console.debug(`Got: ${Object.keys(data).length} results`);

    let measures = Object.entries(data).map(([index, v]) => {
        const [count, timestamp] = v;
        const value = count.toString();
        let time = Math.floor(Date.parse(timestamp) / 1000);
        return { index, value, time}
    }).filter(x => x.time > since);

    console.log(`After filter: ${measures.length}`);
    console.log(measures[0]);
    return measures;
}

function logToEvents(logs) {
    let events = logs[0].events.map(eventObject);
    return events.reduce((obj, evt) => Object.assign(obj, evt), {});
}

function eventObject(event) {
    let attributes = event.attributes.reduce((obj, {key, value}) => {
      if (!obj[key]) {
        return Object.assign(obj, { [key]: value });
      } else if (Array.isArray(obj[key])) {
        obj[key].push(value);
        return obj;
      } else {
        obj[key] = [obj[key], value];
        return obj;
      }
    }, {});
    return { [event.type]: attributes };
}

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
    // let balance = await client.getBalance(address, "ujunox");
    // console.info(`Balance: ${balance.amount} ${balance.denom}`);
  
    // Data in the last 7 days
    const since = Math.floor(Date.now() / 1000) - 7 * 86400;
    const values = await loadOracleData(since);
    const msg = { store_oracle: { values }};

    const fee = {
      // those are many indexes to add!
      gas: "3200000",
      amount: [{
        denom: config.feeDenom,
        // 0.025 * gas
        amount: "80000",
      }]
    };
    
    console.log("Executing...");
    const { logs } = await client.execute(address, investAddr, msg, fee, "New oracle data");

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
  
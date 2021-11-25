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
    console.log(measures[17]);
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

    // 7 days ago
    const since = Math.floor(Date.now() / 1000) - 7 * 86400;
    await loadOracleData(since);

    // let balance = await client.getBalance(address, "ujunox");
    // console.info(`Balance: ${balance.amount} ${balance.denom}`);
  
    const fee = {
      // those are 800 indexes to add!
      gas: "6400000",
      amount: [{
        denom: config.feeDenom,
        // 0.025 * gas
        amount: "160000",
      }]
    };
    
    // console.log(`Instantiating Code ${codeId} with:`);
    // console.log(initMsg);
  
    // const receipt = await client.instantiate(address, codeId, initMsg, "WYND Invest", fee, {admin: address});
  
    // console.debug(`Instantiate succeeded. Receipt: ${JSON.stringify(receipt)}`);
    // console.debug("");
    // console.log(`Contract Address: ${receipt.contractAddress}`);
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
  
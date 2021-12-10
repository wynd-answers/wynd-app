#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
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

const contractAddr = "juno12pdkmn8qf09rn5yuf6lpreml8ypf45uzkvwyeztaqpjncpfwk0kqp3mrpr";
const newCodeId = 208;

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

  const fee = {
    gas: "300000",
    amount: [{
      denom: config.feeDenom,
      // 0.025 * gas
      amount: "7500",
    }]
  };

  console.log(`Migrating contract ${contractAddr} to code ID ${newCodeId}`);

  const receipt = await client.migrate(address, contractAddr, newCodeId, {}, fee);

  console.debug(`Migrate succeeded. Receipt: ${JSON.stringify(receipt)}`);
}

main().then(
  () => {
    console.info('All done, let the coins flow.');
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);

// contract address: juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq
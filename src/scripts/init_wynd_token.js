#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

// from ../context/chain.js
const config = {
  endpoint: 'https://rpc.uni.junomint.com:443/',
  bech32prefix: 'juno',
  feeDenom: 'ujunox',
  mnemonic:
    'wild enact trust mean try snack evoke bring gown core curtain ahead',
};

const initMsg = {
  name: 'Wynd Demo #1',
  symbol: 'WYND',
  decimals: 6,
  initial_balances: [
    {
      address: "juno1pxa9trxza5e2w7sdk2a0xng86y4fnena4e0pka",
      amount: "99000000000000",
    },
    {
      address: "juno1qd3p79cd82hz8p20gr4gcqze33eauuka6929w0",
      amount: "9000000000000",
    }
  ],
  // marketing: { project: url, logo: LOGO}
};

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

  // get this from running upload_cw20
  const codeId = 75;

  console.log(`Instantiating Code ${codeId} with:`);
  console.log(initMsg);

  const receipt = await client.instantiate(address, codeId, initMsg, initMsg.symbol, fee, {admin: address});

  console.debug(`Instantiate succeeded. Receipt: ${JSON.stringify(receipt)}`);
  console.debug("");
  console.log(`Contract Address: ${receipt.contractAddress}`);
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
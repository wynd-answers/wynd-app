#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const axios = require('axios');
const { readFileSync } = require('fs');
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { GasPrice } = require('@cosmjs/stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

// from ../context/chain.js
const config = {
  endpoint: 'https://rpc.uni.junomint.com:443/',
  bech32prefix: 'juno',
  feeDenom: 'ujunox',
  gasPrice: GasPrice.fromString('0.025ujunox'),
  mnemonic:
    'wild enact trust mean try snack evoke bring gown core curtain ahead',
};

const contracts = [
  {
    name: 'cw20-base',
    wasmUrl:
      'https://github.com/CosmWasm/cosmwasm-plus/releases/download/v0.10.2/cw20_base.wasm',
  },
  {
    name: 'wynd-faucet',
    wasmFile: './contracts/wynd_faucet.wasm',
  },
  {
    name: 'wynd-invest',
    wasmFile: './contracts/wynd_invest.wasm',
  },  
];

async function downloadWasm(url) {
  const r = await axios.get(url, { responseType: 'arraybuffer' });
  if (r.status !== 200) {
    throw new Error(`Download error: ${r.status}`);
  }
  return r.data;
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
  const fee = {
    gas: "4000000",
    amount: [{
      denom: config.feeDenom,
      // 0.025 * gas
      amount: "100000",
    }]
  };

  const uploaded = [];
  for (const contract of contracts) {
    let wasm;
    if (contract.wasmUrl) {
      console.info(`Downloading ${contract.name} at ${contract.wasmUrl}...`);
      wasm = await downloadWasm(contract.wasmUrl);
    } else if (contract.wasmFile) {
      console.info(`Loading ${contract.name} from ${contract.wasmFile}...`);
      wasm = readFileSync(contract.wasmFile);
    } else {
      console.error(`Invalid config: ${contract}`);
      throw new Error("Abort");
    }

    const receipt = await client.upload(
      address,
      wasm,
      fee,
      `Upload ${contract.name}`
    );
    console.debug(`Upload succeeded. Receipt: ${JSON.stringify(receipt)}`);
    uploaded.push({ codeId: receipt.codeId, name: contract.name });
  }

  uploaded.forEach((x) => console.log(x));
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

// NOTE: cw20-base 75
// NOTE: wynd-faucet 76
// NOTE: wynd-invest was 183, update 201, v0.1.2 => 208
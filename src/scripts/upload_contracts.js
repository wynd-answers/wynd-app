#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const axios = require('axios');
const { readFileSync } = require('fs');

const { createSigningClient } = require('./config');

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
  const { address, client } = await createSigningClient();

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
      "auto",
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

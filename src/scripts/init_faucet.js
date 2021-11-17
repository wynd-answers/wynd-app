#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
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

const contract=  {
  name: 'wynd-faucet',
  wasmFile: './contracts/wynd_faucet.wasm',
};

const wyndAddress = "juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq";

const initMsg = {
  // wynd address
  token: wyndAddress,
  // 10.000 at 6 decimals
  amount: "10000000000",
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
    gas: "2345000",
    amount: [{
      denom: config.feeDenom,
      // 0.025 * gas
      amount: "60000",
    }]
  };

  console.info(`Loading ${contract.name} from ${contract.wasmFile}...`);
  const wasm = readFileSync(contract.wasmFile);
  console.info(`Loaded ${wasm.length} bytes`);
  const receipt = await client.upload(
    address,
    wasm,
    fee,
    `Upload ${contract.name}`
  );
  console.debug(`Upload succeeded. Receipt: ${JSON.stringify(receipt)}`);
  const {codeId} = receipt;


  console.log(`Instantiating Code ${codeId} with:`);
  console.log(initMsg);
  const execFee = {
    gas: "200000",
    amount: [{
      denom: config.feeDenom,
      // 0.025 * gas
      amount: "5000",
    }]
  };
  const {contractAddress} = await client.instantiate(address, codeId, initMsg, "WYND Faucet", execFee, {admin: address});
  console.log("");
  console.log(`Contract Address: ${contractAddress}`);

  console.log(`Funding contract`);
  const execMsg = {
    transfer: {
      recipient: contractAddress,
      // serves 999 times
      amount: "9990000000000"
    }
  }
  await client.execute(address, wyndAddress, execMsg, execFee, "Loading the faucet");
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

// NOTE: code id 76
// Address: juno1w6tvhn4gsp5wxfzqr08rgvfe29zx06rq92nep5j8scvv5dfl79ws72t4uw
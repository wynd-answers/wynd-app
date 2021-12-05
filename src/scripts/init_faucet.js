#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const { readFileSync } = require('fs');
const { contracts, createSigningClient } = require("./config");

const initMsg = {
  // wynd address
  token: contracts.wyndAddr,
  // 10.000 at 6 decimals
  amount: "10000000000",
}

async function main() {
  const {client, address} = await createSigningClient();

  console.log(`Instantiating Facuet ${contracts.facuetId}`);

  const {contractAddress} = await client.instantiate(address, contracts.facuetId, initMsg, "WYND Faucet", "auto", {admin: address});

  console.log("");
  console.log(`Contract Address: ${contractAddress}`);

  console.log(`Funding contract`);
  const execMsg = {
    transfer: {
      recipient: contractAddress,
      // serves 1999 times
      amount: "19990000000000"
    }
  }
  await client.execute(address, contracts.wyndAddr, execMsg, "auto", "Loading the faucet");
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

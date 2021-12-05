#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const { accounts, contracts, createSigningClient} = require("./config");

const initMsg = {
  name: 'Wynd Demo #2',
  symbol: 'WYND',
  decimals: 6,
  initial_balances: [
    {
      address: accounts.admin,
      amount: "99000000000000",
    },
    {
      // Milan's account
      address: "juno1qd3p79cd82hz8p20gr4gcqze33eauuka6929w0",
      amount: "9000000000000",
    },
    {
      address: accounts.investor,
      amount: "77777000000",
    }
  ],
};

async function main() {
  const {client, address} = await createSigningClient();

  console.log(`Instantiating Code ${contracts.wyndId} with:`);
  console.log(initMsg);

  const receipt = await client.instantiate(address, contracts.wyndId, initMsg, initMsg.symbol, "auto", {admin: address});

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

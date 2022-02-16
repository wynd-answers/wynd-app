#!/usr/bin/env node
/*jshint esversion: 8 */

// Usage: ./query_invest.js 832693fffffffff 83269efffffffff 832996fffffffff

/* eslint-disable @typescript-eslint/naming-convention */
const { CosmWasmClient } = require("cosmwasm");

const endpoint = "https://rpc.uni.wyndex.io:443/";

const investAddr =
  "juno12pdkmn8qf09rn5yuf6lpreml8ypf45uzkvwyeztaqpjncpfwk0kqp3mrpr";
const defaultIndex = "832689fffffffff";

async function main() {
  let indexes = process.argv.slice(2);
  if (indexes.length === 0) {
    console.log(`No indexes provided on CLI, querying ${defaultIndex}`);
    indexes.push(defaultIndex);
  } else {
    console.log(`Querying indexes: ${indexes.join(", ")}`);
  }
  console.log("");
  console.log("");

  const client = await CosmWasmClient.connect(endpoint);

  const config = await client.queryContractSmart(investAddr, { config: {} });
  console.log("Global Config:");
  console.log(config);
  console.log("");

  for (const hex of indexes) {
    const query = { info: { hex } };
    const info = await client.queryContractSmart(investAddr, query);
    const time = info.cur_index?.time;
    const date = time && new Date(time * 1000).toISOString();
    console.log(`** Info of ${hex} at ${date}:`);
    console.log(info);
    console.log("");
  }
}

main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);

#!/usr/bin/env node
/*jshint esversion: 8 */

/* eslint-disable @typescript-eslint/naming-convention */
const axios = require("axios");
const { accounts, contracts, createSigningClient} = require("./config");

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
    const {client, address} = await createSigningClient();
    let balance = await client.getBalance(address, "ujunox");
    console.info(`Balance: ${balance.amount} ${balance.denom}`);
  
    // Data in the last 5 days
    const since = Math.floor(Date.now() / 1000) - 5 * 86400;
    const values = await loadOracleData(since);
    const msg = { store_oracle: { values }};
    
    console.log("Executing...");
    const { logs } = await client.execute(address, contracts.investAddr, msg, "auto", "New oracle data");

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
  
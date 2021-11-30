import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { FaucetClient } from "@cosmjs/faucet-client";
import { toBase64, toAscii } from "@cosmjs/encoding";
/**
 * Faucet
 */

// Request WYND Tokens from Faucet
export const requestWynd = async (client, address) => {
  return await client.execute(
    address,
    process.env.GATSBY_WYND_FAUCET,
    { request_funds: {} },
    calculateFee(200_000, GasPrice.fromString("0.025ujunox"))
  );
};

// Request JUNO Tokens from Faucet
export const requestJuno = async (address, token) => {
  const client = new FaucetClient(process.env.GATSBY_JUNO_FAUCET_URL);
  return await client.credit(address, token);
};

/**
 * Queries
 */

// Query investments for a single investor
export const getInvestments = async (address, rpcUrl) => {
  const client = await CosmWasmClient.connect(rpcUrl);

  return await client.queryContractSmart(process.env.GATSBY_INVEST_ADDRESS, {
    list_investments: { investor: address },
  });
};

// Querying current WYND Balance for address
export const getWyndBalance = async (address, rpcUrl) => {
  const client = await CosmWasmClient.connect(rpcUrl);

  return await client.queryContractSmart(
    process.env.GATSBY_WYND_TOKEN_CONTRACT,
    { balance: { address } }
  );
};

/**
 * Invest
 */

// Invest WYND to a hex
export const investWynd = async (client, address, hex, amount) => {
  const invest = { invest: { hex } };
  const send = {
    send: {
      contract: process.env.GATSBY_INVEST_ADDRESS,
      amount: amount.toString(),
      msg: encodeMsg(invest),
    },
  };

  return await client?.execute(
    address,
    process.env.GATSBY_WYND_TOKEN_CONTRACT,
    send,
    {
      // fee
      gas: "400000",
      amount: [
        {
          denom: "ujunox",
          amount: "10000",
        },
      ],
    },
    "Make Investment"
  );
};

/**
 * Helpers
 */

const encodeMsg = (msg) => toBase64(toAscii(JSON.stringify(msg)));

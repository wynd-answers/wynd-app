import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { FaucetClient } from "@cosmjs/faucet-client";

export const getWyndBalance = async (address, rpcUrl) => {
  const client = await CosmWasmClient.connect(rpcUrl);

  return await client.queryContractSmart(
    process.env.GATSBY_WYND_TOKEN_CONTRACT,
    { balance: { address } }
  );
}

export const requestWynd = async (client, address) => {
  return await client.execute(
    address,
    process.env.GATSBY_WYND_FAUCET,
    { "request_funds": {} },
    calculateFee(200_000, GasPrice.fromString("0.025ujunox")),
  );
}

export const requestJuno = async (address, token) => {
  const client = new FaucetClient(process.env.GATSBY_JUNO_FAUCET_URL);
  return await client.credit(address, token);
}
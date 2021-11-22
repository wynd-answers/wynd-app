import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { FaucetClient } from "@cosmjs/faucet-client";

export const getWyndBalance = async (address, rpcUrl) => {
  const client = await CosmWasmClient.connect(rpcUrl);

  return await client.queryContractSmart(
    "juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq",
    { balance: { address } }
  );
}

export const requestWynd = async (client, address) => {
  return await client.execute(
    address,
    "juno1w6tvhn4gsp5wxfzqr08rgvfe29zx06rq92nep5j8scvv5dfl79ws72t4uw",
    { "request_funds": {} },
    calculateFee(200_000, GasPrice.fromString("0.025ujunox")),
  );
}

export const requestJuno = async (address, token) => {
  const client = new FaucetClient("http://faucet.wynd.world:8000/");
  return await client.credit(address, token);
}
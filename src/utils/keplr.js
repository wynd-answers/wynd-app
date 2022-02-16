import { SigningCosmWasmClient } from "cosmwasm";

export const checkExtensionAndBrowser = () => {
  if (typeof window !== `undefined`) {
    if (
      window.getOfflineSigner &&
      window.keplr &&
      window.keplr.experimentalSuggestChain
    ) {
      return true;
    } else {
      console.log("Keplr extension not found", window);
    }
  } else {
    console.log("Window is undefined :|", window);
  }
  return false;
};

export const suggestChain = async (chain) => {
  await window.keplr.experimentalSuggestChain({
    chainId: chain.chain_id,
    chainName: chain.name,
    rpc: chain.rpc,
    rest: chain.lcd,
    stakeCurrency: {
      coinDenom: chain.coinDenom,
      coinMinimalDenom: chain.coinMinimalDenom,
      coinDecimals: 6,
    },
    bip44: {
      coinType: chain.coinType ?? 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: chain.prefix,
      bech32PrefixAccPub: chain.prefix + "pub",
      bech32PrefixValAddr: chain.prefix + "valoper",
      bech32PrefixValPub: chain.prefix + "valoperpub",
      bech32PrefixConsAddr: chain.prefix + "valcons",
      bech32PrefixConsPub: chain.prefix + "valconspub",
    },
    currencies: [
      {
        coinDenom: chain.coinDenom,
        coinMinimalDenom: chain.coinMinimalDenom,
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: chain.coinDenom,
        coinMinimalDenom: chain.coinMinimalDenom,
        coinDecimals: 6,
      },
    ],
    coinType: chain.coinType ?? 118,
    gasPriceStep: {
      low: 0.0,
      average: 0.01,
      high: 0.025,
    },
    features: ["stargate", "ibc-transfer"],
  });
};

export const connectKeplr = async (chain, dispatch) => {
  // check browser compatibility
  if (!checkExtensionAndBrowser()) {
    return false;
  }

  // suggest chain and approve network
  let error = false;
  await suggestChain(chain);
  await window.keplr.enable(chain.chain_id).catch((e) => {
    console.log(e);
    error = true;
  });

  if (error) {
    return false;
  }

  // Setup signer
  const offlineSigner = await window.getOfflineSignerAuto(chain.chain_id);
  const accounts = await offlineSigner
    .getAccounts()
    .catch((e) => console.log(e));

  dispatch({
    type: "SET_WALLET",
    payload: { signer: offlineSigner, address: accounts[0].address },
  });

  // Init cosmjs client
  const cosmJS = await SigningCosmWasmClient.connectWithSigner(
    chain.rpc,
    offlineSigner,
    accounts[0].address
  );

  dispatch({
    type: "SET_COSMJS",
    payload: { cosmJS },
  });

  const balance = await cosmJS.getBalance(
    accounts[0].address,
    chain.coinMinimalDenom
  );

  dispatch({
    type: "SET_BALANCE_JUNO",
    payload: { balance: balance.amount },
  });

  return [offlineSigner, accounts];
};

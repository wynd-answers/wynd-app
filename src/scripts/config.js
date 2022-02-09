const {
  CosmWasmClient,
  SigningCosmWasmClient,
  DirectSecp256k1HdWallet,
  GasPrice,
} = require("cosmwasm");

function getMnemonic() {
  const mnemonic = process.env["MNEMONIC"];
  if (!mnemonic) {
    throw new Error("You must set MNEMONIC to run the script");
  }
  return mnemonic;
}

// ex for invest use
//     'wild enact trust mean try snack evoke bring gown core curtain ahead',

const config = {
  endpoint: "https://rpc.uni.wyndex.io:443/",
  prefix: "juno",
  feeDenom: "ujunox",
  gasPrice: GasPrice.fromString("0.025ujunox"),
};

const contracts = {
  wyndId: 37,
  facuetId: 38,
  investId: 39,
  wyndAddr: "juno10vdgcaujh4r2ylvvauvuufgu9xggl6dh9z6qfcq640854my77fpskmu4mn",
  faucetAddr: "juno1kmya9p26a9ecq07sxdgkkfmr8pcqyszv7gmkyqz6hlt006qr75lq2a8mw9",
  investAddr: "juno1z2cp6qnufdjvc8n24p59dumwpngkgxal4usz2w2futsqrglgsskqcnjh4p",
};

const accounts = {
  admin: "juno1v2gdcsw27ncrrch3e78c5tfym4su8zlwv2r9rd",
  oracle: "juno14zw7q2rhk76uzvpj3a9yw88zjp0qgaa79zf9dv",
  investor: "juno1l3493que6nqetkf73qc2mfknd5jn5mlc7qw8wv",
};

// this creates a new signing client from the config.
// returns {client, address}
async function createSigningClient() {
  const mnemonic = getMnemonic();
  const { prefix, gasPrice } = config;
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix,
  });
  const { address } = (await wallet.getAccounts())[0];

  const client = await SigningCosmWasmClient.connectWithSigner(
    config.endpoint,
    wallet,
    { prefix, gasPrice }
  );

  return { client, address };
}

// this creates a new non-signing client from the config.
// returns client
async function createClient() {
  const client = await CosmWasmClient.connect(config.endpoint);
  return client;
}

module.exports = {
  accounts,
  config,
  contracts,
  createSigningClient,
  createClient,
};

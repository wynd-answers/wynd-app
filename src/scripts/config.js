const { CosmWasmClient, SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { GasPrice } = require('@cosmjs/stargate');

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
    endpoint: 'https://rpc.uni.junomint.com:443/',
    prefix: 'juno',
    feeDenom: 'ujunox',
    gasPrice: GasPrice.fromString('0.025ujunox'),
};

const contracts = {
    wyndId: 0,
    facuetId: 0,
    investId: 0,
    investAddr: "juno12pdkmn8qf09rn5yuf6lpreml8ypf45uzkvwyeztaqpjncpfwk0kqp3mrpr",
    wyndAddress: "juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq",
}

// this creates a new signing client from the config.
// returns {client, address}
async function createSigningClient() {
    const mnemonic = getMnemonic();
    const { prefix, gasPrice } = config;
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix});
    const { address } = (await wallet.getAccounts())[0];
        
    const client = await SigningCosmWasmClient.connectWithSigner(
        config.endpoint,
        wallet,
        {prefix, gasPrice}
    );

    return { client, address };
}

// this creates a new non-signing client from the config.
// returns client
async function createClient() {
    const client = await CosmWasmClient.connect(config.endpoint);
    return client;
}

module.exports = { config, contracts, createSigningClient, createClient };
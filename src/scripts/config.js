const mnemonic = process.env["MNEMONIC"];
if (!mnemonic) {
    console.error("You must set MNEMONIC to run the script")
    process.exit(1);
}

// ex for invest use
//     'wild enact trust mean try snack evoke bring gown core curtain ahead',


const config = {
    endpoint: 'https://rpc.uni.junomint.com:443/',
    bech32prefix: 'juno',
    feeDenom: 'ujunox',
    mnemonic,
};

const contracts = {
    investAddr: "juno12pdkmn8qf09rn5yuf6lpreml8ypf45uzkvwyeztaqpjncpfwk0kqp3mrpr",
    wyndAddress: "juno1wjur4gvzn0ccnffyuhvs3qxgsxn6ga86wpd2y8s2ufck4c2zmrfsyn44rq",
}


  
module.exports = { config, contracts };
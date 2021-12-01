## 💡 Get started
Clone this repo to get started:
```sh
# Get the latest snapshot
git clone git@github.com:wynd-answers/wynd-app.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install
```

**Development:**
```sh
# Run development mode
npm run develop
```

**Production:**
```sh
# Build
npm run build
```

## Scripts

To interact with the blockchain, we provided a number of [useful CosmJS scripts](https://github.com/wynd-answers/wynd-app/tree/main/src/scripts). In particular the following are used to set up the system:

* `junox-facuet/start.sh` - runs a CosmJS faucet (API server) to serve out JUNOX to all users
* `upload_contracts.js` - uploads the various cosmwasm contracts and gets a code id for each
* `init_wynd_token.js` - creates a cw20 token called WYND and initial distribution
* `init_faucet.js` - creates a smart contract faucet so testers can get WYND automatically
* `init_wynd_invest.js` - configures and installs the investment contract

And the following interact with it (mainly for debugging):

* `submit_oracle.js` - run by an oracle server to inform the blockchain of the most recent data from the data platform
* `invest.js` - to manually make an investment (testing)
* `query_invest.js` - to perform some queries and ensure it works as intended


## 🔗 Useful links & resources
- [CosmJS](https://github.com/cosmos/cosmjs)
- [ReactJS](https://reactjs.org/)
- [Gatsby](https://www.gatsbyjs.com/)

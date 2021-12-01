# Tech Stack

This follows up on the [README](./README.md) file to explain the tech stack in more depth

## Data Platform

TODO

## Contracts

We use [CosmWasm contracts](https://github.com/wynd-answers/wynd-contracts/tree/main/contracts) to handle
the blockchain side:

* `cw20-base` we use this standard contract to provide the WYND contract
* `wynd-faucet` we use this to provide a smart contract faucet to give out some WYND tokens once to each user
* `wynd-invest` handles all the investments and payments and receives data feeds from the oracles
* `wynd-oracle` (TODO) checks data feeds from multiple oracles to ensure validity

The main contract you interact with is the `wynd-invest` contract. You can [view the API here](https://github.com/wynd-answers/wynd-contracts/blob/main/contracts/wynd-invest/src/msg.rs). But the main actions are "invest", "withdraw"
and "store_oracle". Queries will show detailed info for one hex, or list all investments for one user.

## Oracle

Still WIP

## Frontend

* [Keplr](https://wallet.keplr.app/#/dashboard) - Connecting to user's wallet
* [CosmJS](https://github.com/cosmos/cosmjs) - Interacting with contracts and the blockchain
* [Mapbox](https://www.mapbox.com/) - Map API
* [DeckGL](https://deck.gl/) - Used to show datasets on the map
* [H3Js](https://github.com/uber/h3-js) - Helps us when it comes to calculating hexagons and classic coords
* [ChartJS](https://www.chartjs.org/) - Showing historical data in charts
* [MUI](https://mui.com/) - React component library
* [Gatsby](https://www.gatsbyjs.com/) - Static page generator

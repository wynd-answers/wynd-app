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

Keplr, map box, the hex graphing library, CosmJS....
<p align="center">
  <a href="https://wyndex.io/">
    <img alt="WYND" src="http://i.epvpimg.com/fjQacab.png" width="250" />
  </a>
</p>
<h1 align="center">
  App
</h1>

Wynd is an example of an environmental DeFi app with the goal of channeling the DeFi funding
towards environmental goods. We had discussed many ideas related to tracking deforestation/reforestation,
and those would be wonderful projects to bring to production, but given the time constraints of the hackathon,
we decided on a metric that changed much more quickly... Air Quality.

The goal is to make visible the invisible - in this case air pollution - and allow people to profit when they can
reduce it. An investor can place WYND tokens on a given area and then work/lobby/tweet to improve the air quality.
Several months later when the investment is mature, we compare the new air quality with the original quality and
reward the investor with a return based on the change. If the pollution levels decrease, they get more WYND back.
If pollution increases, they lose WYND (do not get all their initial investment back).

For the prototype, we have a quite short investment duration (2 days) just to serve as a quick to use demo,
but any real system should configure this for several months and use a time-averaged value to encourage long-term improvements

This document provides a high-level overview of the project. You can also
[read more about the tech stack](./TECH_STACK), or get information on [how to run this code](./DEVELOPMENT.md)

## Data Sources

For the original data, we use [Emissions API](https://emissions-api.org/), which is based on public domain
ESA (European Space Agency) satellite data. We poll the data for the last several months for the US, and
the combine it into a standard grid so nearby measurements are grouped together.

The first product is measuring Methane, which is a very potent greenhouse gas. 

Further work would be to normalize the data to remove some of the noise/variation. This could be done by
averaging, but also we would like to investigate if there is a high correlation between wind/rain and
pollution levels (high wind or rain removing atmospheric pollution) and if so, we could compensate for this
correllation by reading in historical weather information and processing the data from Emissions API, before
we perform some time averaging on it.

Once we have "clean data" for one metric, we would like to add the other frequently updated pollution sources
(carbon monoxide and ozone), preprocess them as above, and then combine them to produce a combine WYND index
that represents a more holistic view of air quality.

We chose one country to limit the scale of the data we work with. And chose the USA, as it is the most widely
recognized country. (We also considered Europe, but that would involve 30+ different API calls, so we started with the
simpler one).

## Hexagons

Since every measurement is at a slightly different location, we need to group them together in a reasonable
spatial resolution to allow meaningful aggregation and historical data. To do so, we searched for a regular grid system
that covers the planet and went with the [H3 Hexagonal Hierarchical Spatial Index](https://eng.uber.com/h3/).

This can easily be adjusted to different spatial resolutions and covers the whole globe with mostly-equally sized
hexagons in contrast to eg. the distortial of squares in the Mercator projection.

## Frontend App

The [frontend app](https://wyndex.io) provides the user access to both the data platform as well as the blockchain.
It queries the latest values of all grid points from the data platform, and when you click on a hexagon, it will 
also show a graph of the historical values of pollution.

It also uses Keplr and connects to Juno's Uni testnet. We use a faucet API server to give out 10 JUNOX to each new user
so they can pay gas. And then use a smart contract faucet to release 10.000 WYND to each user once, to allow them
to invest in the protocol, allowing a quick and easy onboarding experience for the prototype.

Once you have connected your wallet and filled it with tokens, you can browse the different hexagons and invest in the
one(s) that you would like to clean up. We display all your current investments in the side bar, and also allow
you to withdraw any investments that have reached maturity, calculating your winnings.

## Contracts

We use [CosmWasm contracts](https://github.com/wynd-answers/wynd-contracts/tree/main/contracts) to handle
the blockchain side. 

The main contract you interact with is the `wynd-invest` contract. You can [view the API here](https://github.com/wynd-answers/wynd-contracts/blob/main/contracts/wynd-invest/src/msg.rs). But the main actions are "invest", "withdraw"
and "store_oracle". Queries will show detailed info for one hex, or list all investments for one user.

The implementation of the oracle is quite simple for now. First version allows a priviledges user to submit the data
directly. We work on an oracle contract which verifies data from multiple sources before submitting.

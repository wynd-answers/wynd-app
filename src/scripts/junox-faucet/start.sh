#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

export FAUCET_CONCURRENCY=3
# TODO: update this
export FAUCET_MNEMONIC="wagon romance envelope exile movie pencil happy one keep large glove floor"
export FAUCET_TOKENS=ujunox
export FAUCET_GAS_PRICE="0.025${FAUCET_TOKENS}"
export FAUCET_CREDIT_AMOUNT_UJUNOX=250000
export FAUCET_ADDRESS_PREFIX=juno

# refill with enough for 20 requests
export FAUCET_REFILL_FACTOR=20
# if the faucet ever has less than enough for 10 requests
export FAUCET_REFILL_THRESHOLD=10

docker run --read-only --rm \
  -e FAUCET_MNEMONIC \
  -e FAUCET_CONCURRENCY \
  -e FAUCET_GAS_PRICE \
  -e FAUCET_ADDRESS_PREFIX \
  -e FAUCET_TOKENS \
  -e FAUCET_CREDIT_AMOUNT_UJUNOX \
  -e FAUCET_REFILL_FACTOR \
  -e FAUCET_REFILL_THRESHOLD \
  --name "$CONTAINER_NAME" \
  -p 8000:8000 \
  "$REPOSITORY:$VERSION" \
  start "https://rpc.uni.junomint.com:443/"
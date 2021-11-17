# Junox faucet

This runs an HTTP API you can hit to get easily get tokens, very useful for demo apps on testnets

## Setup

```shell
# creates image
./build_docker.sh

# generate a new account (copy these somewhere)
./setup.sh
```

Example output:

```
FAUCET_MNEMONIC="........"
FAUCET_PATH_PATTERN="m/44'/118'/0'/0/a"
Created token holder  (m/44'/118'/0'/0/0): juno17ufpwjv8m8ldckj5xef8la6cusltptqcgyne7s
Created distributor 1 (m/44'/118'/0'/0/1): juno1wemfgua2kgfrvj8qw0l6ejv9esagd9luvme4de
Created distributor 2 (m/44'/118'/0'/0/2): juno1u0wt8tel0wepk6nzljs8cle3d0y9fypfra589a
Created distributor 3 (m/44'/118'/0'/0/3): juno1qsxm2lze5cdra8d6vzv52swl6h90lhs3dgsf2p
Created distributor 4 (m/44'/118'/0'/0/4): juno1kfydpqxnhpf43h9c65ltqg0g6asz6n3hxvsw2p
Created distributor 5 (m/44'/118'/0'/0/5): juno1amq47ervkj6g7etnjgcaqqayj7qj6cna4qf7n4
```

You should then send some tokens to the token holder, in this case `juno17ufpwjv8m8ldckj5xef8la6cusltptqcgyne7s`

Update the mnemonic in `./start.sh`

## Running

```
./start.sh
```

We can stop in another terminal with:

```
./stop.sh
```


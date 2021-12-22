# How to use Docker Buildx

From https://www.docker.com/blog/multi-arch-images/

## Prep Work

```shell
docker buildx create --name mybuilder
docker buildx use mybuilder
docker buildx inspect --bootstrap
```

## Do the Do

```shell
docker buildx build --platform linux/amd64,linux/arm64 -t wynd/faucet:latest --push .

docker inspect wynd/faucet:latest | jq '.[] | {Arch: .Architecture, Os: .Os}'

docker buildx imagetools inspect wynd/faucet:latest
```


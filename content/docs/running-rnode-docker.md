# Running RNode (Docker)

This chapter helps you to start a rnode instance. With this you are connecting to existing validator on mainnet, testnet. Additionally you can creating a local network on your computer, where you can deploy your smart-contracts to.

## Docker Setup (Beginners)

If you are new and want to start your local rnode (docker) instance on your pc with only a few clicks: Then follow this [tutorial](/dapps/setup-docker/).

## Docker Setup (Experts)

> Please fill in the `<bootstrap ID>`. The current network ID is posted on [RChain public testnet information](https://rchain.atlassian.net/wiki/spaces/CORE/pages/678756429/RChain+public+testnet+information).

```bash
docker run -it --rm --name rnode -v /data/rhoc-daemon-01:/var/lib/rnode rchain/rnode:latest run --network <args> --shard-id <args> --bootstrap <args> -finalization-rate <args> --fault-tolerance-threshold <args> --synchrony-constraint-threshold <args> --fork-choice-stale-threshold <args> --fork-choice-check-if-stale-interval <args> --drop-peer-after-retries <args> --give-up-after-skipped <args>
```

- `--network-id <arg>` The network to run on (testnet , mainnet).
- `--shard-id <arg>` The network is splitted into shards for scaling.
- `--bootstrap <arg>` The bootstrap server for initial connection to the network.
- `--finalization-rate <arg>` Block finalization is triggered after adding every 'n' blocks. Use this option to configure this.
- `--fault-tolerance-threshold <arg>` Float value representing that the node tolerates up to fault-tolerance-threshold fraction of the total weight to equivocate.
- `--synchrony-constraint-threshold <arg>`Float value representing that the node waits until at least synchrony-constraint-threshold fraction of the validators (by stake weight) proposed at least one block since is node's last proposal.
- `--fork-choice-stale-threshold <arg>` Node will request for fork choice tips if the latest FCT is more then ForkChoiceStaleThreshold old.
- `--fork-choice-check-if-stale-interval <arg>` Interval for check if fork choice tip is stale.
- `--drop-peer-after-retries <arg>` Fair round robin dispatcher drop inactive peer after round robin rounds. After giving up several times the peer gets dropped from the queue.
- `--give-up-after-skipped <arg>` Fair round robin dispatcher give up and try next peer after skipped packets. Skipped packets are buffered in other peers packet queues.

**Examples:**

- run rnode

```bash
docker run --rm -d -v C:\Users\Nakamoto\Desktop\Rnode:/var/lib/rnode --network host --name rchain-mainet-peer rchain/rnode:latest run \
--bootstrap "rnode://487e2c0c519b450b61253dea0a23b4d184a50089@node0.root-shard.mainnet.rchain.coop?protocol=40400&discovery=40404" \
--finalization-rate 1 --fault-tolerance-threshold -1 --network-id mainnet --shard-name root --max-number-of-parents 1
```

> please fill in you own userpath `-v C:\Users\<your-user-name>\Desktop\Rnode`. Also copy conf files into Rnode folder: [link](https://github.com/rchain/rchain/blob/dev/node/src/main/resources/defaults.conf)

- help documentation

```bash
docker run rchain/rnode:latest --help
```

> if the message: `- Waiting for first connection` is there for more than 1 minute, please check your ports and ip: [Network Configuration](/docs/network-configuration)

## Docker for Mac

> Docker for Mac will only work with static NAT and port forwarding. network=host does not work on Mac. See RNode supported network configuration for more information on static NAT and port forwarding.

- Bootstrap address - Enter the address of the bootstrap node you want to connect with. See RNode bootstrap addresses for bootstrap nodes supported by the RChain core development team.
- Validator private key - Insert the key if you are a validator of test net, or if you are creating a private network and have a bonds file included in your genesis block.
- Network configuration - If you want to specify your ports, include --p in the run command. If you want to specify your host, include --host in the run command.

## Tips for working with RNode in Docker

### Naming Containers

Once the network is created, the server container will be put into the network, and then referenced by the client. It's easier if you give your server container a name. This is an example of of naming a server 'rnode-server-local'.

```bash
docker run --name rnode-server-local rchain/rnode:latest
```

### Using the --host flag

If you want to create a local docker network which consists of some nodes and a bootstrap node, you will have to specify the nodes' addresses with the --host flag. Make sure to not use the nodes' IP addresses for the --host flag. Instead use the hostnames. If the network is called 'rnode-net' and you named a docker container 'rnode-server-local', the hostname of that docker container is 'rnode-server-local.rnode-net'.

### Sharing directories with containers

To share a directory with a container use the volume command. You will need to create a directory on your local system that will store all of the RNode related files. Once the directory is created, you can share this directory with the Docker container by using the volume command. Below is an example of how the volume parameter can be specified as part of a run command.

RNode requires the path /var/lib/rnode exist on startup. Each instance of RNode requires its own separate /var/lib/rnode directory.

```bash
docker run -v "path to local directory":/var
```

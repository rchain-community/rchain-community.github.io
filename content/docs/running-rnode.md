# Running RNode (non-Docker)

These are the run commands to start an RNode Observer Node (read-only node). With this you are connecting to existing validator on mainnet.

## To connect to an existing network

> Please fill in the `<bootstrap ID>`. The current network ID is posted on [RChain public testnet information](https://rchain.atlassian.net/wiki/spaces/CORE/pages/678756429/RChain+public+testnet+information).

```bash
rnode run --network-id <arg> --shard-id <arg> --bootstrap <arg> --finalization-rate <arg> --fault-tolerance-threshold <arg> --synchrony-constraint-threshold <arg> --fork-choice-stale-threshold <arg> --fork-choice-check-if-stale-interval <arg> --drop-peer-after-retries <arg> --give-up-after-skipped <arg>
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
./rnode run --network-id mainnet --shard-id root --bootstrap "rnode://487e2c0c519b450b61253dea0a23b4d184a50089@node0.root-shard.mainnet.rchain.coop?protocol=40400&discovery=40404" --finalization-rate 1 --fault-tolerance-threshold -1 --synchrony-constraint-threshold 0 --fork-choice-stale-threshold 30minutes --fork-choice-check-if-stale-interval 30minutes --drop-peer-after-retries 0 --give-up-after-skipped 0
```

- help documentation

```bash
./rnode --help
```

> if the message: `- Waiting for first connection` is there for more than 1 minute, please check your ports and ip: [Network Configuration](/docs/network-configuration)

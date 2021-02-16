# Running a Standalone Validator

The information on this page is for people who will help launch and validate on the RChain public mainnet.

## Requirements

CPU: 4-8 Cores

Memory: 16-32 GB

## Setup

This is the setup for non-docker rnode, but rnode for docker (windows) works equivalent:

Remove cache (do this always, when you switch the network)

```bash
rm -Rf ~/.rnode/
```

Create Validator (-s means standalone)

```bash
./rnode run -s --map-size 1099511627776
```

This creates a new DAG with a new genesis block having 5 validators in bonds list, as you can observe if you look into RNode output. You always need at least 5 validators, otherwise the genesis ceremony wont start. You can find private and public keys for these validators in ~/.rnode/genesis/. The name of \*.sk file is a public key and private key is residing inside.

Now you can kill (Ctrl+C) your node and restart it in validator mode using one of private keys.

```bash
./rnode run -s --map-size 1099511627776 --validator-private-key $(cat ~/.rnode/genesis/*.sk | tail -1)
```

## Test

As the private key used to start a node matches the public key of a bonded validator in existing genesis block, your node is allowed to add new blocks on top of it. Deploy some code to your node.

```bash
./rnode deploy --private-key <deployer_private_key> --phlo-limit <value> --phlo-price <value> <file.rho>
```

Do not confuse `deployer_private_key` with validator key used to start a node. This should be a different key which will pay for deploy execution. For testing purposes you can set `--phlo-limit` 1000000 and `--phlo-price 1`.

You should see response with a deployID
DeployId is: 3044022100a65b2c5d890ed53174fcd9f53f150756c9ff4b37e0a4137f025d53ec418c1894021f18c42eccf307b27e6159606e92ca4e96f4b9688b6b95ee05944c8794b0dd76

And call your node to propose a block.

```bash
./rnode propose
```

You should see a hash of block created.
Response: Success! Block 8b70f0c681... created and added.

## Monitoring the Node

RNode features integration with Prometheus. [These instructions](https://github.com/rchain/rchain/blob/master/docker/node/README.md) describe a method for getting started with RNode metrics collection and display using Prometheus via Docker-compose.

## Visualizing the blockchain

To support debugging we have a process to collect information from the node and use it in graphviz to create a visualization of the DAG. Below are instructions for two methods for using this tool.

## Visualizing the blockchain when there are >6,000 lines

Once an active network has been running for a few hours, your call to vdag will likely generate >6,000 lines of output. In this scenario, you will need to have installed the Graphviz software and use it to create a .png file. Please see https://www.graphviz.org/download/ for information about installing and running Graphviz.

Once installed use the following command to generate a .png file based on vdag output.

```bash
rnode vdag | dot -Tpng >vdag.png
```

## Creating a private blockchain

You can create your own blockchain network.

Prerequisites for a private blockchain

- 1 bootstrap node
- 2 other node instances running on a network where they can communicate with each other (peers of each other).
- Keys for the node instances (these will be required for signing and creating the bond.txt file)
- A bond.txt file accessible by all node instances. You can either supply it, or use the system generated bonds file.
- A Rholang file to deploy across the network.

Steps to create a private blockchain

- Start the bootstrap node. This is the 1 node operating in standalone mode.
- Include the address of the bootstrap node in your run command for the peer nodes.

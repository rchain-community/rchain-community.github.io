# Propose a block to the blockchain

Propose triggers a block proposal to the network. This is a function only available to validating nodes. With a deploy you send your package to a validator and with a propose you request the validator to process your package. Validator try to bundle many deploys for best performance before sending them to the network for consensus.

## Propose a new block (non-Docker)

Example of the propose command on the server side:

```bash
root@salt:~# rnode propose
21:52:06.959 [main] INFO  c.r.n.configuration.Configuration$ - Starting with profile default
Response: Success! Block c0b68d2520... created and added.
```

Here is an example of the console output following the propose. The log shows the new fork-choice from the proposed and added block (c0b68d2520...).

```bash
21:52:08.806 [grpc-default-executor-55] INFO  c.rchain.casper.util.comm.CommUtil$ - CASPER: Beginning send of Block #1 (c0b68d2520...) -- Sender ID 3d86379153... -- M Parent Hash 06eb7dc6ab... -- Contents 16d7c61fa6...-- Shard ID rchain to peers...
21:52:08.820 [repl-io-141] INFO  c.rchain.casper.util.comm.CommUtil$ - CASPER: Sent c0b68d2520... to peers
21:52:08.820 [repl-io-141] INFO  c.rchain.casper.MultiParentCasper$ - CASPER: Added c0b68d2520...
21:52:08.844 [repl-io-141] INFO  c.rchain.casper.MultiParentCasper$ - CASPER: New fork-choice tip is block c0b68d2520....
```

## Propose a new block (Docker)

```bash
docker run -it --rm --network-id rnode-net --name rnode-propose1 -v $HOME/var/rholang:/var/ rchain/rnode:latest --grpc-host rnode1 propose
```

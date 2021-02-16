---
title: RCHAIN MAINNET ANNOUNCEMENT
slug: rchain-announcement
author: [rchain stuff]
date: 2020-02-25
tags: ["rchain announcement", "mainnet"]
excerpt: "RChain Mainnet is live 🌟🎉"
---

## RCHAIN MAINNET ANNOUNCEMENT

![mainnet](./images/concert.jpg)

_originally posted [in the coop blog](https://blog.rchain.coop/blog/2020/01/23/rchain-mainnet-announcement-the-block-height/)_

RChain Mainnet is live. Initially, the Cooperative will run all the nodes in the root shard but expects that to change in the upcoming months. The Cooperative took a snapshot of the Ethereum chain at block height `9371743`, which occur on the morning of January 28, 2020 and published the balances going into the genesis block. The community reviewed the genesis block balances.

RChain uses a pure proof-of-stake version of the correct-by-construction (CBC) Casper consensus framework.

Parameters for RChain Root Shard Nodes

- The root shard is limited to 100 validator nodes and unlimited read-only nodes.
- After the root shard, 100 validator slots are filled, bonding requests will be queued in a waiting list. Validators are randomly selected from the waiting list for bonding.
- Approved bonding requests get up to two weeks to provision hardware before they are placed in rotation.
- Unbonded validators may re-apply for validation. Their bonding will be treated just like any other bonding request and may be subject to queuing on the waiting list.
- The minimum bonding period for all validator nodes is four months.
- The deposit will be bounded for the entire time they are resident in the validator set unless the validator’s deposit is subject to slashing.
- When a validator requests to unbond to leave the validator set, the validator must wait a minimum of two weeks for their bond to be returned.
- Bonding minimum is 10,000 REV and maximum is 5,000,000 REV.
- Validator returns are comprised of two parts:


      	  a 7% segniorage fee
      	  a transaction fee

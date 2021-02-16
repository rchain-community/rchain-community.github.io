# Sharding proposal

## Introduction

Suppose we have a large problem to solve with the property that subproblems can be distributed to solvers and the subproblems can be assembled easily into a complete solution. However, suppose also that the solvers are untrustworthy, either due to faults or malicious behavior. For mere faults, replication suffices, but for malicious behavior we need a blockchain. Either way, given a fixed set of solvers, there is a tradeoff between the amount of parallelization we can use and the confidence we have in the answer.

At one end of the spectrum, we have a single blockchain. Every validator runs every program, checking the work of the other validators. This is as secure as we can get, but there is no opportunity to split up the problem.

At the other end, every validator is a degenerate sort of blockchain unto itself; each validator works completely independently. This is as parallel as we can get, and is completely insecure.

In between, we have independent groups of validators that come to agreement among themselves. The other shards do not check their work. This is not as secure as a single blockchain, but does allow subproblems to be worked on independently.

RChain’s sharding solution is designed to provide both ends of this spectrum as well as several points in between, allowing dApp developers to decide where they want to make the tradeoff.

## Network structure

A single shard\_ consists of a collection of computers running copies of the RChain node software, called validators. Each validator stakes a large quantity of a cryptocurrency called Rev. “Staking” means that if they deviate in a detectable way from the consensus protocol, they get slashed, losing their stake. A validator that has staked Rev is called bonded. The owners of validator nodes typically acquire Rev by purchasing it with some other currency, either directly from the RChain cooperative or on an exchange. The specific amount required to stake the shard is a parameter of the shard.

## The “root shard”

One shard, called the root shard, will have a small minimum stake and no performance requirements. This shard is expected to be slower than other shards because validators will be located all over the world. Because of its low participation requirements, it is also expected to have lots of participation and therefore be very secure.

All Rev is minted in the root shard. To reward validators, the cooperative will periodically mint more Rev and distribute it to bonded validators.

## Child shards

Any shard can issue its own staking token, but we do not expect that each shard’s staking token will be listed on an exchange. Instead, RChain shards have two special contracts called the depository and the mint. The depository is, among other things, a multisig wallet that contains a cryptocurrency meant to back the issuance of cryptocurrency in another shard. The mint is a multisig contract that creates new currency.

To create a new shard as part of the RChain network, a set of clients of a shard we’ll call the parent shard jointly create a depository contract and deposit funds into it. The clients then each run a validator node in a new shard we’ll call the child shard. The validators create a mint in the child shard and create the same quantity of funds. They then bond in the child using some of the newly minted funds. The validators monitor both the depository and the mint for incoming messages.

When the depository in the parent receives a “transfer” message with a purse and a public key, it deposits the funds from the purse into its own purse. The validators then instruct the mint in the child to create funds and deposit them into a wallet that responds to messages signed by the corresponding private key.

When the mint in the child receives a “transfer” message with a purse and a public key, it burns the funds in the purse. The validators then instruct the depository in the parent to withdraw funds from its purse and deposit them into a wallet that responds to messages signed by the corresponding private key.

The mint and depository contracts that ship with the RChain node software will only mint as many Rev in the child shard as are in the depository in the parent shard, but that does not guarantee that the validators of the child shard will behave properly. A client of the shard is always susceptible to collusion by enough of the validators. The validators could mint more currency than is in the corresponding depository; if they did, the price of the child currency would fall with respect to the backing currency in the parent. The validators could simply drain the depository. What the validators of a child shard cannot do is create more of the backing currency in the parent; so even if they misbehave in their own subtree, they cannot affect the money supply in the rest of the tree.

To defend against the validators of an ancestor shard walking off with all the money, it is in the interest of a child shard validator to also bond and validate in its parents all the way to the root. Since the RChain cooperative only issues validator rewards in the root, it is up to the validators of a child shard to decide whether to pass validation rewards down to their children or not.

## The future: composite shards

There is also a tradeoff between centralization and parallelism. If every validator in a shard A trusts some validator in another shard B, and every validator in B trusts some validator in A, then the two shards can behave as though they were a single shard without having to validate each others’ transactions. We say that A and B are regions of the composite shard. While the current node software does not support composite shards, we expect that in the future, there will be shards validated by owners willing to deploy, say, a fast node in each of several well-connected datacenters around the world. We can have arbitrarily many regions in a composite shard, but the capital expenditure cost to a would-be validator grows linearly in the number of shards. The nodes in a single datacenter are necessarily close together, so are more susceptible to physical attacks on the infrastructure. Also, not everyone will be able to make such a capital expenditure, so the composite shard will tend to be validated by the rich. To mitigate these dangers, clients of such shards may decide to enter into legal agreements that can be enforced locally against the owners of the local nodes. While the clients do not have the ability, in general, to lay claim to the funds in the depository, they may be able to lay claim to the validator hardware.

## Moving shards

If the validators of a child shard grow suspicious of the parent shard in which they’ve created the depository, they can simply transfer the value of the depository to some other shard and continue operation.

## Cross-chain shards

Two RChain shards are fundamentally separate blockchains already. If a set of validators want to run a fork of the RChain software, they may. If a validator set chooses to create, say, a multisig ERC20 contract whose value is backed by a depository on RChain, one could consider Ethereum to be a child shard of the RChain network.

We’ve seen currencies fork, but we haven’t yet seen them merge. RChain is set to change that: a subset of validators of a child shard can choose to withdraw their share of the funds from the depository and form a new, independent child shard with its own money supply and governance structure.

## Conclusion

RChain’s sharding architecture offers a wide spectrum of choices allowing clients to trade off security, performance, and centralization. It also allows interaction between future forks of RChain and other blockchains.

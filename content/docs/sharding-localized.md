# Sharding Via "Localized Processes"

## Motivation

Sharding allows for easy parallelization (across hardware) of independent transactions and is necessary for the level of scalability we desire for the RChain platform. In Rholang, names are the natural element to base a sharding solution on. Some names, like @1, are universal – they should be allowed to exist in any shard; while others, like an unforgable name carrying a reference to a purse, should be localized to a single shard and the only way to use that name is to some how interact with the shard where it lives. Moreover, since unforgable names cannot be referenced off-chain, accessing resources will always require a "public name" (some special quoted process) at the start of the flow. For example, suppose I own a purse reference which is stored in a channel given by the unforgable name x. Now, if I wish to use that purse to make a payment for some service how can I do it? I cannot simply write x in my source code which calls the service because it is unforgable. Instead there will need to be a public name, say @`rchain://myPurse` which contains a contract that will forward the name x to me under some condition (e.g. signature verification). Thus the transaction flow starts with a public name.

The idea based on these considerations is as follows:

- impose a structure on processes which underlie "public names";
- define such processes as "localized";
- extend the definition of localization to general processes and names;
- based on the imposed structure define a "local group" for localized processes and names;
- define a sharding structure around the local groups.

## Definitions

### Valid URI

URIs are a class of special Rholang processes denoted by backticks (see grammar). A URI is valid if it has the form of a (non-empty) path delimited by forward slash ('/') and beginning with "rchain://". The base prefix alone "rchain://" is not a valid URI because its path is empty. For example, `rchain://coop/contracts/examples/hello_world` is a valid URI. Note that the base prefix "rchain://" could be swapped out to easily create private blockchains, or other "alt-chains" build on the same RChain platform technology.

### Prefixes of a Valid URI

A prefix of a valid URI is the URI given by truncating after any forward slash ('/') following the base prefix "rchain://". For example, the prefixes of `rchain://coop/contracts/examples/hello_world` are: `rchain://`, `rchain://coop`, `rchain://coop/contracts` and `rchain://coop/contracts/examples`. Note that a URI is not a prefix of itself.

### Localized Processes and Names

The following rules are used to decide if a process or name is localized:

1. Valid URIs are localized.
2. A name which is equal to the quote of a localized process is localized. I.e. @P is localized if and only if P is localized.
3. For a process defining unforgable names, i.e. P = new [names] in { Q }, the process P and the defined names are localized if and only if Q is localized.
4. A general process, P, is localized if it contains any subprocesses (i.e P is a par) or continuations (e.g. P is a for, match, etc.) which are localized or it contains localized names.

Examples:

```javascript
 new doubler in { contract doubler(@x, return) = { return!(2 \* x) } } is not localized.
 new multiplier in { contract multiplier(@x, return) = { for(@y <- @`rchain://coop/contracts/examples/resources/multiply_factor`){ return!(y \* x) } } } is localized.
```

### Local Group

All localized processes and names belong to a local group. A local group is identified by a valid URI or the base prefix "rchain://". The local group of localized processes and names are determined by the following rules:

1. The local group of a valid URI is its longest prefix.
2. The local group of a localized name given by a quoted process is given by the local group of the underlying process. I.e. localGroup(@P) = localGroup(P).
3. For a process defining unforgable names, i.e. P = new [names] in { Q }, localGroup(P) = localGroup(n) = localGroup(Q), where n \in [names].
4. The local group of a general localized process is the union over all the local groups of the localized subprocess/continuations or localized names, where the union of a set local groups is their longest shared prefix.

Examples:

The local group of new multiplier in

```javascript
{ contract multiplier(@x, return) = { for(@y <- @`rchain://coop/contracts/examples/resources/multiply_factor`){ return!(y \* x) } } }
```

is identified by `rchain://coop/contracts/examples/resources`.

The local group of

```javascript
@`rchain://A/a`!(0) | @`rchain://B/b`!(2)
```

is identified by "rchain://". Note that in this example the process is actually separable, meaning it can be written as the parallel composition of localized processes with different local groups. As discussed below, an optimization to the sharding solution proposed here could be to identify such cases and treat each separate part independently.

### Shard

A shard is an independently replicated blockchain (or blockdag, or whatever, the particular structure is not important here). Therefore each shard must have its own set of validators (though these sets need not be disjoint) and run its own consensus protocol. We assume that each block contains the information needed for consensus (i.e. validator ids and bonded amounts). "Merge blocks" can exist between shards to allow cross-chain communication. A merge block contains the post-state information for all the shards that it touches. The fork-choice rule for including or excluding a marge block must stratify atomicity conditions, i.e. if a merge block is finalized in the chain of one shard then it must be finalized in all shards and similarly for if its exclusion from a shard is finalized. One way to obtain this atomicity is to establish a "dominance hierarchy" among the shards and enforce the rule that a merge block between two shards A and B in which A is dominant over B is finalized if and only if it is finalized in A.

## Sharding Solution

### Basics

A sharding solution provides a discipline to relate the theoretical grouping of names/processes (into "namespaces" or "regions" or "groups" – or the language chosen here "local groups") with the set of shards (independently replicated blockchains). It also specifies how shards themselves are allowed to change over time. It is important that the discipline is one in which a developer can develop contracts based on the theoretical side alone without worrying about the details of the implementation as shards. This is analogous to how a programmer working in a high level language can write code without knowing much of anything about the details of the hardware the code will run on. Of course if performance optimization is important then knowing something about the implementation of the abstract software constructs can be very helpful.

The sharding solution proposed here is as follows. Each shard will be identified by a single local group which can be represented by valid URI and it will serve code which is localized to that local group or any local group it contains that is not served by another shard. For example, suppose that S is a shard with identifying local group `rchain://root` and T is a shard with identifying local group `rchain://root/specific`. Then S would serve processes with local groups like `rchain://root` and `rchain://root/contracts` while T would serve local groups like `rchain://root/specific` and `rchain://root/specific/resources`. Code which contained some processes that would need to be served by S and some that would need to be served by T would have to be served by both in a merge block (as discussed below).

The dominance hierarchy of the shards will follow the natural tree structure for local groups, i.e. if A, B, and C are local groups and A = B ∪ C (note that this also implies that A = A ∪ B and A = A ∪ C) then a shard serving A is dominant over a shard serving B or C. When code is deployed to the platform, it must run on all shards which serve the local groups it uses, therefore it will need to exist in a merge block which includes all of those shards. For example, if A, B and C are local groups as above and all of them are served by different shards then a contract that contains processes localized to B and C will have local group equal to A (because A = B ∪ C) and will need to join the platform via a merge block between all three shards serving those local groups. Note that the root of the local group tree is "rchain://", which is not a valid URI and therefore not a shard. If two shards wish to communicate and the union of their corresponding local groups is "rchain://" then they will need to use a merge block, but the dominance will also need to be specified since it cannot be inferred from the tree.

Notice that this scheme meets the desired property that a developer is insulated from the implementation. A developer simply accesses resources using familiar file-system-like syntax and the deployment process behind the scenes can figure out where that code needs to exist to be served properly. However, if the developer happens to cross shard boundaries with their resource usage then merge blocks become involved which may increase the cost or time to run the code and improving on that performance would require knowing about the specifics of the sharding.

Also note that as an optimization to the deployment process, separable processes (defined briefly in the local group examples) could be deployed to their independent shards (if they exist) as this would cut down on unnecessary merge blocks.

### Creating/Destroying Shards

We will assume that at genesis there is a single shard identified by `rchain://root`.

A new shard can be created by proposing a "merge block" between an existing shard (the parent) and the new shard. The merge block would contain two sets of post state information, where the second one serves as the genesis information for the newly created shard. The new genesis information includes the local group identifying the new shard, the validator bond amounts and any parts of the state taken over from the parent. The restrisction here is that the new local group must be contained in the parent (e.g. if the parent was identified by `rchain://root` then the child could identified by `rchain://root/coop` but not `rchain://coop`). Moreover, stake cannot be duplicated or destroyed, therefore the new validator set must be a subset of the parent and bond amounts must be split betweent the two. Note that these validator assignments are not permenant and validator rotation still happens in both shards as per (yet-to-be-determined) protocol rules. This operation would not be done by an average developer using the platform, but instead by one of the validators in the parent shard (perhaps because there is a volume of contracts in a particular subset of their served local group so it makes sense to isolate them). Notice that by the dominance rules the new shard cannot be finalized until it is finalized in the parent shard, meaning that the majority of validators need to agree to the split. Also note that an avergae contract developer does not notice or care about this change. Their existing code will continute to function without being modified because it will be served by either the parent, child or possibly in merge blocks between the two. The only thing which may change for them are the operating costs.

Symmetrically, this operation can be reversed. A child shard can be absorbed into its parent via "terminal merge block" which moves state served by the child shard back into the parent, leaving the second post state information empty – respresenting the end of that blockchain. The restriction here is that stake cannot be destroyed, so all validators of the child become validators in the parent and if a validator was already in both then their stakes are consolodated. Once again, by the dominance rules, this change cannot be finalized until the majority of validators in both the parent and child have agreed to it. And once again, the average contract developer does not notice this change because all their existing code will continue to be served by the parent shard, but perhaps with different operating costs.

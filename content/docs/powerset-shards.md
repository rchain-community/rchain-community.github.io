# Powerset shards (Proposal)

## Validators

A validator is a participant in the casper protocol. Casper requires each validator to know what the entire set of validators is. Let V be the set of validators.

## Regions

Assume a nonempty finite set R of regions and a function v:R → ℘⁺(V) that picks out a nonempty subset of validators for each region. We say that a validator inhabits a region X if V ∈ v(X). Regions get to set slashing criteria on the validators that inhabit them for performance, network bandwidth, storage capacity, etc.

## Namespaces

The set S of namespaces is the positive powerset of the set of regions: S = ℘⁺(R). For each namespace s ∈ S, we assign a countably infinite set N_s of names in the namespace s. The validators for the namespace S ∨ T are v(S) ∪ v(T). Deploying code in a namespace with many ∨s will be more expensive, since more validators have to validate the messages. The execution may also be slower or otherwise constrained, since the criteria for inclusion of a validator in other regions may be less strict.

## Terms are colored with a namespace

Every input expression is associated with the namespace of the names it is listening on. Cross-namespace joins are forbidden, so the namespace is unique. Every output expression is associated with the namespace of the name being sent on. When sending or listening on a public name, it must be annotated with a namespace. Every new production annotates each new name with a namespace. Other productions live in the nearest enclosing input.

## Mobility

Consider the case where b is in the namespace B, y is in the namespace Y, and the following process is running (necessarily in the namespace B by the previous paragraph):

    for(a <- b) { a!(Q) } | b!(*y)

At the same time, the following input process is running in the namespace Y:

    for(x <- y) { P }

The process in B reduces to

    y!(Q)

but that ought to run in the namespace Y, so B then transfers y!(Q) to Y and removes it from its own state.

Similarly, consider the case where b is in the namespace B, y is in the namespace Y, and the following process is running in B:

    for(a <- b) { for (c <- a) { Q } } | b!(*y)

The process reduces to

    for (c <- y) { Q }

but that ought to run in the namespace Y, so B then transfers for (c <- y) { Q } to Y and removes it from its own state.

In both cases, Y needs B to be in a safe state to be sure that it can add the message to its state. B needs Y to be in a safe state to be sure that it can remove the message from its state. Here, "safe" means that perhaps not all validators in a namespace R know that R is committing to some action, but S can tell that there's no message that a validator in R could receive to cause a rollback.

## Joins

Joins between names that are not in the same namespace is a type error. If a process in the namespace B and a process in the namespace Y wish to race, then they should send messages to a process in the namespace B∨Y.

If neither knows about the other, but a process wants to join messages from both, then there will have to be a forwarder process from B and Y independently to B∨Y, where the join takes place. This does not, of course, match the semantics of a cross-namespace join! A semantics-preserving translation would suffer from the transitive closure problem.

## Casper contracts

Bonding, unbonding, slashing, and distributing rewards will be implemented on chain as "blessed" Rholang contracts. The stuff that sends messages over the network will be implemented in scala and will communicate with the blessed contracts via the tuplespace.

## Slashing

When a validator is slashed, every validator needs to know about it. Suppose that validator b in region B is caught equivocating. To slash b, we could use the top namespace in which everyone has to participate but where it need happen only once, or we could suggest a slashing block independently to each region. If the latter, there may be a coalition in B that ignores the slashing block. Is that rejection itself cause for slashing the validators in the coalition?

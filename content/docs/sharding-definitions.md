# Shards in RChain

## Definitions

Shard - a set of validators working together to validate transactions and create blocks. Validators in one shard can be clients of another shard, but they cannot exchange unforgeable names.

What is lost - the ability to use OCaps security between the shards.  
The following Code block can be exchanged across shards:

```javascript
new x in {y!(*x)}
```

not

```javascript
y!(*@{182acdb344-7fd533-bbd5433cfe})
```

Shards support unforgeable names within the validator set. A block proposal containing an unforgeable name from a validator within the validator set is fine. Both of the above code blocks are supported within a shard.

### The Sharding Client

The validators in a child shard are clients of the parent shard. This has a few implications:

They must listen for events taking place in the depository contract in the parent.
They must listen for events taking place in the mint contract on the blockchain they are validating.
They have to create events (deployments) based on events both of these chains.

### Creating a Shard

A group of Rev holding validators come together and decide they want to spawn a new child shard.

If the shard wants to engage in cross shard transfers, and is not a child of the root shard, then it is advisable that validators in the shard validate transactions in the parent. To do this, they will need to stake that shard separately.

Steps

1. The validators go through the process of Initializing the blockchain.
2. A validator creates a depository contract deployment in the parent shard that includes the validator list (ip addresses, node id and public keys), K and shard name. K should be a proportion of N (% needed to pass a vote)
3. All the Validators then send (purse, signature over the above tuple (genesis hash, validator list, k) to the newly created depository.
4. The Mint contract is updated to include the K / N parameters for the shard.
5. When a shard is mounted, Rev minted in Genesis will be backed by Rev in the depository.

### Transferring value across Shards

By sharding the blockchain, in essence we create 'altcoins' in each shard. Rev will exist in the rchain shard (the root shard). All other shards will have token that will be 'backed' by Rev, much in the same way that currency can be backed by gold. Tokens in shards will be exchanged for Rev in the rchain shard with a 1:1 exchange rate.

The process of transferring token between 2 shards requires invoking a contract in the nearest common ancestor of both shards. The platform will only support the atomic transfer from a child to a parent and a parent to a child.

Client software will need to provide the following data:

- The list of shards by which the transfer will take place (path from one account to the other, via an ancestor)
- Signatures for the transaction
- Deployments for Payments

### Listening for Events

The validators in a shard have to be aware of certain events in the parent shard. These are:

1. Inbound transfers of Rev token into the depository

Events in the child shard they have to be aware of for the purposes of updating the depository parameters:

1. Token transfers to parent shard.
2. Bonding events
3. Unbonding events (immediately updates N, wallet is created and sits in the child until the wait period is over)
4. Slashing events (forced unbonding - same as above, except no wallet is returned, as the bond is slashed)

#### Inbound Token transfers (depository increase)

1.  Validators are listening on the depository contract & receive a message that token has been deposited.
    1.  The message has to include the address of the wallet (shard identifier), the secret, and the amount being transferred
    2.  This message is stored in the client.
    3.  The address of the destination wallet is checked.
        1.  If this shard, then the token transfer terminates here
        2.  If not this shard, locate the K/N contract
2.  Monitor the transaction to the depository reaches a level of safety on the parent shard
3.  Each node can choose the frequency the node polls the parent shard for messages on the depository)

    1.  When a node is satisfied with the safety level, it creates a deployment to the mint contract.
        1.  The call to Mint is to create a purse and send it to a destination.
        2.  The destination could be another K/N contract or a wallet (final destination)
        3.  The Mint contract gathers up deployments until K is met.
        4.  Token is minted.

### Parent-Child Transfer

1.  User in parent invokes the `transfer` function of the depository.  args: (purse, public key, return channel); returns session id over return channel.
2.  Block containing 1\. finalized.
3.  Child validators see 2\. and each deploys a message to the k-of-n mint contract.
4.  Mint creates a wallet with the tokens at `rho:uuid:<session id>`.
5.  Blocks containing 3., 4\. are finalized.
6.  Child Validators send messages to parent k-of-n contract.
7.  Confirmation sent to user over same return channel as 1.
8.  Blocks containing 6., 7\. finalized

Note: the session id is also used in the k-of-n contract to relate the validator's message to an active request.

```javascript
//session id creation
contract newId(return) = { new id in { return!(*id.toByteArray) } }
```

## Outbound Token Transfers

### Child-Parent Transfer

1.  User in parent invokes the `transfer` function of the mint args: (purse, public key, return channel); returns session id over return channel.
2.  Block containing 1\. finalized.
3.  Child Validators send messages to parent k-of-n contract.
4.  Depository splits out a purse with the right number of tokens and wraps it in a wallet with the right public key, placing the result at `rho:uuid:<session id>`.
5.  Blocks containing 3., 4\. are finalized.
6.  Child validators see 5\. and each deploys a message to the k-of-n mint contract.
7.  Confirmation sent to user over same return channel as 1.
8.  Blocks containing 6., 7\. finalized

## Referencing Shards

Users are familiar with urls and uri formats. Therefore it's reasonable to treat the hierarchy of shards as one would treat a directory structure, and reference them in the same way.

As part of testnet launch, the Core dev team will create the number of shards that are needed to demonstrate network performance of 20,000 tps (40,000 would be even better). The actual number of shards will depend on the performance of a single shard.

The root shard will contain the genesis block for the network. It shall be called 'rchain'

If shards A and B are both children of the root shard, they would be referenced as rchain/A and rchain/B

## Viewing Shards and Shard information

The blockchain of the parent shard will store information about it's child shards. This information is:

- The validators in the shard
- The K/N contract for the shard & amount stored in the depository
- The name of the shard

The above information should be sufficient for a Read only node or client to build a tree of the shard structure similar to a blockchain explorer.

Other information that is available for a shard on the blockchain:

- Total amounts bonded in the shard
- Transactions processed / unit of time (so validators can pick profitable shards)
- Transaction fees / trailing 7 days or unit of time.
- Performance requirements for a validator.

## Bonding

1.  User in child calls `bond` function of PoS contract; args: (purse, public key, return channel); returns status over return channel (bond may fail validity conditions).
2.  PoS updates k-of-n contract on mint (PoS has authority to do this).
3.  Blocks containing 1., 2\. are finalized.
4.  Child validators (other than new) send messages to k-of-n contract updating it.
5.  New public key added to accepted list, k updated to new value.
6.  Blocks containing 4., 5\. are finalized.
7.  New validator sees 6\. as their confirmation

## Unbonding

- Similar to bonding
- PoS contract handles core logic
- If PoS accepts the unbonding request then validators update K of N contract in parent post finalization
- Bond is released in the child shard after the unbonding period.

Question: If the validator has funds locked up in the K/N contract, those funds should be held until the unbonding wait period expires.

## The Blessed Mint Contract and Sharding

The blessed Mint contract will exist in each shard. While the master Rev mint contract (our version of 'gold') exists only in the rchain shard at the root of the tree, all other shards have pegged their token supply to the token supply in the root shard. The mint contracts in all the shards have to mint tokens at the same time, such that the exchange rate for Rev between the shards remain 1:1 all the way up to the rchain shard (root shard). The blessed Mint contract will be a K/N contract that is created by the K/N Sharding contract

## Exodus Block

Transfer the token from fort knox out to the new mount point. The K/N contract is invoked, and the required number of validators need to agree on Exodus.

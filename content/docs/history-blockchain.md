# History of Mobile Process Calculi

by Joshy Orndorff

In 1992 Robin Milner et al introduced the pi calculus, a member of the mobile process calculus family, as a new and novel model of computation [[paper](https://dl.acm.org/ft_gateway.cfm?id=151240&ftid=289787&dwn=1&CFID=153770346&CFTOKEN=6894c386a5ee5d2c-40734F3C-C2A2-949F-6AAE98DF0EA2B5A5)]. The pi calculus has several properties that make it an attractive option for modern programming. It is Turing complete, allows for straight-forward compositional programming, and is fundamentally concurrent. With the appropriate structure on it's channels, it allows for programming with in object capability paradigm.

## History of Blockchain

In 2009 Bitcoin introduced the proof of work blockchain allowing mutually distrusting parties to coordinate permissionlessly through a currency. In 2013 Ethereum generalized that idea to coordinate on arbitrary computations through a system of smart contracts. Both systems have been successful but have struggled to scale.

Progress has been made toward scaling Bitcoin-like UTXO systems through concurrent consensus algorithms [[spectre](https://www.cs.huji.ac.il/~yoni_sompo/pubs/17/SPECTRE.pdf), [cbc casper](https://github.com/ethereum/research/blob/master/papers/CasperTFG/CasperTFG.pdf), [hashgraph](https://www.swirlds.com/downloads/SWIRLDS-TR-2016-01.pdf), [casanova](https://arxiv.org/pdf/1812.02232.pdf)]. However even these algorithms will not scale Ethereum as it's computational model is inherently sequential and totally-ordered.

Recently, several blockchain projects are beginning to explore smart contracting solutions based on mobile process calculi [[RChain](https://architecture-docs.readthedocs.io/index.html), [Ambients](https://ipfs.io/ipfs/QmPhPJE55GvqSz7Pwvkc8n9dbKmqGw6tUGTE1MgfNQvzsf)] rather than traditional sequential models like Ethereum. Such projects will be able to take advantage of concurrent consensus.

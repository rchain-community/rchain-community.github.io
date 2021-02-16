# Research

Much of the innovations that RChain brings to the world of blockchain and driven by fundamental breakthroughs in distributed systems programming, with the development of the Rho-calculus. Below, find an overview of the most relevant papers and sources underpinning the RChain technology.

See [Intro to Design of Computational Calculi 4.1: Injecting Names
into Rho-Calculus][intro] and more in the [Learn][] category of our
blog.

[intro]: https://www.rchain.coop/blog/intro-to-design-of-computational-calculi-4-1-injecting-names-into-rho-calculus/
[learn]: https://www.rchain.coop/blog/category/developer/learn/

## Rho-calculus

the RChain execution model is derived from the syntax and semantics of rho-calculus. The rho-calculus is a variant of the π-calculus that was introduced in 2004 to provide the first model of concurrent computation with reflection. “Rho” stands for reflective, higher-order.

Those unfamiliar with the π-calculus are strongly encouraged to explore it. The π-calculus is the first formal system to successfully model networks where nodes may regularly join and drop from the network. It assumes fine-grained concurrency and process communication i.e. two processes may be introduced by a third process. The rho-calculus extension inherits all of those features and adds reflection.

- [The Polyadic pi-Calculus: A Tutorial](http://www.lfcs.inf.ed.ac.uk/reports/91/ECS-LFCS-91-180/) –by Robin Milner
- [Higher category models of the pi-calculus](https://arxiv.org/abs/1504.04311) —by Mike Stay &amp; Lucius Gregory Meredith
- [Logic as a Distributive Law (PDF)](https://arxiv.org/pdf/1610.02247v3.pdf) —by Mike Stay &amp; Lucius Gregory Meredith
- [Contracts, Composition, and Scaling: The Rholang specification](https://developer.rchain.coop/assets/rholang-spec-0.2.pdf)  
  Draft version 0.2 Feb 2018  
  Lucius Gregory Meredith, Jack Pettersson, Gary Stephenson, Michael
  Stay, Kent Shikama, Joseph Denman

## Casper CBC

Casper is a family of Proof of Stake consensus protocols, developed in collaboration with Vlad Zamfir.

- [A Template for Correct-by-Construction Consensus Protocols](https://github.com/ethereum/research/blob/master/papers/cbc-consensus/AbstractCBC.pdf) –by Vlad Zamfir
- [Casper the Friendly Ghost](https://github.com/ethereum/research/blob/master/papers/CasperTFG/CasperTFG.pdf) –by Vlad Zamfir
- [The History of Casper (Medium series)](https://medium.com/@Vlad_Zamfir/the-history-of-casper-part-1-59233819c9a9) —by Vlad Zamfir

## RChain Platform Architecture

- [RChain Platform Architecture][archdoc] by Ed Eykholt, Lucius Meredith, Joseph Denman July 2017

**Abstract**: The RChain Platform Architecture description provides a
high-level blueprint of the RChain decentralized, economically
sustainable public compute infrastructure. While the RChain design is
inspired by that of earlier blockchains, it also realizes decades of
research across the fields of concurrent and distributed computation,
mathematics, and programming language design. The platform includes a
modular, end-to-end design that commits to correct-by-construction
software and industrial extensibility.

[archdoc]: https://rchain-architecture.readthedocs.io/en/latest/

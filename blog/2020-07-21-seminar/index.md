---
title: 'Structural types for algebraic theories'
slug: seminar
author: [dckc]
date: 2020-07-21
tags: ['seminar']
excerpt: 'MIT Category Theory Seminar with Christian Williams'
---

https://www.youtube.com/watch?v=aJyxtUopJ74

### Abstract

RChain is a distributed computing system based on a concurrent language with reflection. The ρ calculus, or reflective higher-order π calculus, is a concurrent language with operations that control the distinction between data and code. This gives networks intrinsic structure, which can offer deep knowledge and utility. This can be used to think globally about the web.

To reason about this structure, Namespace Logic [Meredith, Radestock 2005] augments the ρ calculus with first order logic, to create a predicate calculus for denoting subclasses of terms. For example, the predicate for a process to be single-threaded is "not[null] and not[par(not[null],not[null])]" -- like an integer being prime. These predicates provide types for the ρ calculus, which condition programs and enable high-level reasoning in concurrent networks.

We present a categorical formulation of the algorithm (-) + first order logic. A language can be presented as an algebraic theory with binding; we then form its topos of presheaves, and therein construct a polymorphic type system with subtyping. The algorithm extends the idea of namespace logic to a broad class of formal languages, and it is especially powerful in concurrent languages with reflection.

A draft paper can be found [here](https://github.com/cbw124/stat/blob/master/stat.pdf)

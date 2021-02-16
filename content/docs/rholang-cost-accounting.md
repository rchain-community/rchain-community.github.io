# Cost of matching in replay

written by Mike Stay and Kyle Butt

## Background

When a user submits code to a validator to deploy, it runs the code once and records a trace that is added to the block. When the block is proposed to other validators, they must check that the proposed trace is a valid one by re-running the code. Therefore, every validator runs every program.

Deployers pay for executing programs using Rev; the price of executing a program necessarily rises with the number of validators that are participating in the network but also decreases as the price of Rev increases relative to the currency in which costs are paid.

A major part of Rholang program execution is the matcher. In the original proposal for Rholang, patterns were very simple; I don't have access to historical revisions of the 0.1 spec, but we can see evidence of that in the old BNFC grammars. Kyle Butt expanded the patterns to a much more complicated language that allows arbitrary processes connected by the logical operators /\, \/, ~ (AND, OR, and NOT). Arbitrary patterns may, however, take exponential time to match.

The matching process occurs in parallel across many threads. This makes cost accounting hard to do for the proposer such that other validators can check that the deployer was charged correctly.

One proposed solution is to have purely sequential access to the tuplespace on replay.

Greg Meredith proposed a solution that would charge a fixed cost per potential match in the trace; the cost under that proposal is some constant K times the number of proposes P on the channel times the number of consumes C on the channel.

Kyle proposed restricting the pattern language in those positions so that matching in a for or a contract would be cheap enough to ignore.

This document analyzes different pattern grammar fragments for the complexity of matching in order to inform decisions about how to charge for it.

## Problems with the proposals

### Purely sequential

This prevents us from taking advantage of the inherent parallelism in Rholang for all but one of the computers.

### Greg's proposal

The constant K is used something like phlo, in that if the work to do the match exceeds K, the deployment fails. If K is small, this effectively makes the matching language simple anyway. If K is large, people will avoid doing matching in a for or a contract, pushing it instead to a match whenever possible.

The proposal also quadratically penalizes users for writing code where a single ack channel is reused in a series of sequential operations:

job1!(*ack) |
for (\_ <- ack) {
job2!(*ack) |
for (_ <- ack) {
…
jobN!(\*ack) |
for (_ <- ack) {
done!()
}
}
}

## Arity matching

The major issue is the expressibility of the pattern language; arity matching, while cheapest, also makes certain use cases impossible. For example, suppose there's a feed of jobs and a set of contracts looking for jobs. With arity matching, the feed would need sequence numbers and the contracts would have to look at a job and then be trusted to put it back if it didn't match what they were looking for.
A compromise position
Instead of cutting the matching language all the way down to mere arity matching, we cut it down from a language where failed matches have exponential cost to one where failed matches have merely polynomial cost.

Polynomial time isn't entirely ignorable; we have to consider the potential for a denial of service attack. We hope to keep the exponents small enough that in order to cause enough work to have any real effect on the system, the length of the data would have to be so large as to be economically prohibitive.
Complexity Analysis of Potential Matches
Suppose there are P produces and C consumes in parallel in the deployment; the maximum number of failed matches is the case where none of the produces match any of the consumes, so the complexity is PC times the cost of a failed match.
Complexity Analysis of Pattern Language Fragments
We identified four sublanguages of the pattern matching language worth considering.

### Arity.

This is the simplest sublanguage, where matching is done solely on the number of message parts. The comparison happens in a single instruction, so the complexity is 1.

No par. This sublanguage allows recursively atomic processes, but not, for instance, RÇON. Here, the match is essentially comparing protobufs for equality, so the complexity of a single match is proportional to the sum of the lengths of the pattern and the target. Call this quantity k for the analysis below.
Par + /\. This sublanguage allows all processes, but only the logical connective AND (/\). Given n atoms in the pattern and m atoms in the target, each pattern can potentially match any one of the target atoms. If there is a free variable in the pattern, all the concrete atoms match first, the first free variable gets the rest, and all other top-level free vars get Nil. Therefore the complexity is O(knm).
Par + all connectives. This is the currently implemented pattern matching language, which includes the logical connectives OR (\/) and NOT (~) as well as AND (/\). Because matching involves having to check all permutations of both the term and the target, matching is exponential, O(knm).

If we choose option 2 or 3 instead of 1, the cost to the proposer for failed matches is a polynomial in the relevant quantities. To mount an attack against a single proposer, a deployer would have to deploy a large amount of code to have any significant effect. This quickly gets too expensive for the deployer.

Note also that the match and matches keywords can still make use of sublanguage number 4 even if for and contract use sublanguage 2 or 3.

### Implementation difficulty

Mateusz Gorski has done all the cost accounting work so far and also a lot of work on the interpreter. He says it would be an order of magnitude easier to restrict the pattern language in consumes than to do the accounting for failed matches.

There are two ways they might do it. The first restricts the grammar. Changing the grammar won't need to change any of the matcher code, since it will statically reject the more extensive patterns before they get to the matcher.

The second is adding some code to the normalizer. The normalizer works on patterns, not just processes. A Rholang program is really just a pattern with no free variables. At the top level, the normalizer already excludes any such pattern; we'd modify it so it would exclude slightly more.

His opinion is that these are both far simpler changes than adding new cost accounting code for failed matches.

---
title: RCAST 39 - KNOTS AS PROCESSES
slug: rcast39
author: [rchain stuff]
date: 2019-08-21
tags: ["knots", "processes"]
excerpt: "David Snyder, who co-wrote “Knots as processes: a new kind of invariant,” with Greg Meredith, joins the call along with Isaac DeFrain and Christian Williams."
---

## RCAST 39: KNOTS AS PROCESSES

![ladl](./images/rcast39.jpg)

https://soundcloud.com/rchain-cooperative/rcast-39-knots-as-processes

David Snyder, who co-wrote “[Knots as processes: a new kind of invariant,](https://arxiv.org/abs/1009.2107)” with Greg Meredith, joins the call along with Isaac DeFrain and Christian Williams.

### TRANSCRIPT

Greg: Thanks again, Derek, for hosting, and thanks to Christian and Isaac for joining. Today we have a special guest, David Snyder. Thank you, David, for taking time out of your schedule to talk with us.

David: No problem.

Greg: Isaac had a request at the end of the last podcast that we talk about “Knots as Processes.” I’ll sketch out the overall result that we were aiming for, and then we can talk about some of the subtleties, like how we work out the approach and what that did in terms of how we work on the proof. That sounds like a game plan for everyone?

David: Sounds good to me.

Greg: As I mentioned last time, the motivations that I was interested in was bringing bisimulation to mainstream mathematics. Bisimulation is a key proof technique. This was inspired by folks like Hurley and folks like that who are bringing algebraic topology techniques over into concurrency theory to try to use some of those proof techniques. I thought, “Concurrency theory has bisimulation—you guys need that.”

David: Right.

Greg: That was the idea. So I thought, “Let’s do something simple first. Something that is already known,” cause it was known in the sixties that ambient isotropy is decidable. It shouldn’t be too surprising that you could get a result with bisimulation. The thought is: Do you give encodings of knots as processes?

Then the theorem is: two knots are ambient isotopic, which is the notion of equivalents and knots, if their encodings are processes. That’s the result that we were aiming for. The trick how to do this: It turns out that that ambient isotopy is equivalent to being able to transform a knot diagram of a knot into the knot.

Let’s say we have knots K1 and K2. If I take a knot diagram of K1, and if I can use the Reide-meister moves (which you could think of them as graph transforms), which transformed that knot diagram in very specific ways. If you can construct a sequence of Reide-meister moves from a diagram of K1 and a diagram of K2, then the knots are ambient isotopic. Does that make sense?

David: It makes sense to me.

Isaac: One question that I have: Did they prove the decidability of the ambient isotopy to—did they prove that using the Reide-meister moves…

Greg: Yes, decidability was done via the Reide-meister moves. Basically, Reide-meister moves are the name of the game, at least as related to computability.

David: Originally, it was this guy named Hopkin back in 1957; it was right before I was born. He used three-dimensional topology, but there’s actually a lot of other proofs now too. There are some other proofs that don’t use it.

Christian: Do the Reide-meister moves correspond to certain concurrences in the calculus?

Greg: Not exactly. They’re not at the congruence level for the calculus, but they end up being transformed on processes that are property-preserving in a particular way.

The other piece of the puzzle that is necessary: all we want to do is to encode a knot diagram into a process. That’s a lot easier than encoding a knot into a process because a knot diagram is essentially a quadrivalent graph.

David: You can have lots of knot diagrams, but quadrivalent is the one that everybody’s expecting.

Christian: What is a quadrivalent graph?

David: Every node has four edges. Basically, you project a knot onto a plane. There are lots of ways to do that. But for most of them, what they call general position, you’re going to have nodes that have just four edges kind of coming into.

Isaac: Four is important cause that represents a crossing of two pieces of the knot.

Greg: That’s exactly right.

David: Typically, from opposite sides, so to speak, they usually separate each other so that one will be broken. So you can see which one goes over.

Isaac: One goes under, one goes over.

Greg: Yeah, exactly. It’s really interesting. If you look at these in the light of proof nets, they’re suspiciously similar to proof nets in the sense that you’re visiting these things in both polarities. So Gerard’s long trip condition on proof nets. There’s a version of that that holds for knot diagrams, which also shouldn’t be too surprising given the decidability. That’s a digression.

In general, there’s a way to convert every graph, not just the quadrivalent graphs. There’s a way to convert every graph into a process. There are lots of different ways to do that as well. Cardelli, Ghelli, and Gardner gave one encoding. Our encoding is a little bit different. You can use these different encodings to go after this problem.

I was interested in a circuit-like encoding that had some other intuitions behind it. If you look at the diagram of a crossing, you can think of this as like a circuit. Picture in your mind’s eye, you’ve got four terminal points on this circuit. You have a rectangle, and there are four terminal points on the rectangle where we might attach signal.

Let’s say for fun, we’ll label the rows X1 and X2. The top left is X1 and the top right is X2. The bottom left is Y1 and the bottom right is Y2. You can imagine that these might turn into channels and processes. We want a model signal flow from these terminals from one terminal to another.

Economically we might connect the X2 terminal to the Y1 terminal; then we can connect the X1 terminal to the Y2 terminal. Does that make sense?

Isaac: Yeah, so we get one of these crossings.

Greg: To make it a crossing, what we want to do is say that the signal going over one of those, diagonals is always free to flow and the other one has to wait. so that if there is signal going through that wire, then it must be synchronized and wait for the signal to flow. It’s like a traffic light. Does that make sense?

Isaac: Yeah. So this is to distinguish between the over-crossing and the under-crossing.

Greg: Exactly right. The over-crossing always gets to just go. If you have some signal arriving X2, then there’s no additional synchronization to get over to Y1. And it works bi-directionally. If you have signal arriving at Y1, there is no additional synchronization required in order to get the signal coming out at X2.

Christian: Are the nodes the processes and the wires the channels?

Greg: You’re going to think about it slightly differently. You’re going to think about a process that represents the circuit that we just drew. You can decompose a knot diagram into a bunch of these circuits that have all been wired together. Does that make sense?

Isaac: Yeah, definitely.

Greg: Without peeking at the paper, I would encourage people to write down a Pi calculus or Rho calculus process that does that—that models that circuit that we just described. You know that you really grasp Pi or Rho if you can write that circuit down. I used Dowker-Thistlethwaite codes to provide an algorithmic representation to wire up all the crossings correctly. If I just give you their end crossing, that’s not enough. You need to know how the crossings are wired up because there are lots and lots of nine crossing knots.

For people who are interested, there’s a beautiful site called KnotPlot, which provides a little zoology of all the crossings. The trick is you have to figure out how to wire up the crossings. Ss I said, there are lots of knots for a given number of crossings. As the number of crossings goes up, there are more and more knots that have those crossings.

There are different encodings for knots. I use the Dowker-Thistlethwaite codes to give me a spec that I could just walk over and then calculate the wirings. That’s another piece of the puzzle that you need. I strongly encourage people to look at this issue of writing down one of these circuits as a process and then writing down some encoding of how to wire up the crossings together.

Once I had that, the proof looked relatively simple. Then David said, but what about…and then he mentioned this phenomenon that I had never encountered before. David, you want to talk about the Perko pairs?

David: Sure. These things are interesting to look at. Originally, you see the whole storyline. You go back to a P.G. Tate; he was inspired by Lord Kelvin to look at knots. Kelvin thought knots were at the core of chemical units. I don’t think they had the atomic theory quite yet. Anyway, Tate made this big table of knots. He went through by hand and made all these four vein graphs and played around with changing crossings, making them over-crossings or under-crossings, looking at all the possible things.

Then a student of his called Little proves Little’s Theorem, which turns out to be false, but he said that if you have a knot, where something called the ride, you travel along the diagram in a certain direction, and whenever you come to a right-hand crossing, like when you go over an over-crossing, and inter-crossings going to your left, that’s positive. Then if the end of crossing is going to your right, then that’s negative. Then every time you go over an over-crossing count all the positive crossings as pluses and negative crossings as negatives and total that up, you get what’s called the ride of the knot. Little claims that he had proved that in 1899 this is a knot variant. The minimal ride you can get out of any of the diagrams for knots, and that will be unique. That’s what ends up being funneled.

Anyway, there’s this thing called the Perko pair. It wasn’t discovered until the early 1970s by Kenneth Perko, who was an undergraduate at Princeton. Vincent has a really strong tradition in geometric topology and knot theory. He had done some work with Milner, but somebody told him to go through this table and understand how Conway had calculated these invariants for knots. So he went through and found knots that have 10 crossings in a minimal presentation that there was actually a duplicate pair that had escaped notice for basically a hundred years. So it’s called the Perko pairs.

There was a guy at Princeton before Alexander, in the twenties and thirties, he was a giant of geometric topology. He calculated these things called Alexander polynomials. It was a brilliant idea. You calculate your polynomials and if the polynomials are different than you know you have two different knots.

But it is possible for two different knots to have the same polynomial. It’s not a total invariant. It doesn’t identify them. It goes one way, but not the other. Basically, Conway, when he was a high school student, went through Tate’s table with the 11 crossing knots and he calculated the Alexander polynomial and found duplicates. And he got rid of those duplicates.

Apparently, he didn’t look at the 10 crossing knots. Then Conway’s table made it into this textbook by this guy named Dale Rolfsen. It was a bible of knot theory for a long time. I actually have an original copy from 1976 and that pair made it into this table. By the time Perko had discovered this, it had made it into this book. So it was kind of a big deal that they had found yet another pair. That just shows how hard knots are, to come that long to even notice. Plus they were having to do all this stuff by hand, so it wasn’t so exciting. At least hopefully with this, you can automate it. They have programs now as well. I don’t know if I’ve actually counted all the 18 crossings yet. I know for sure they’ve been up to 17. It’s huge and it gets really complicated very quickly. I think there’s an exponential algorithm for numbering these things.

Christian: Do we still not have a systematic method of classification?

David: Not really.

Greg: It’s a really interesting point that you raise, Christian, because one of the things that I wanted to provide was a shift in a perspective on variants. Whether you’re talking about the Alexander polynomial or the Jones polynomial, there’s something interesting about polynomials. Polynomials have a notion of dynamics baked into them. But that’s not the way in which the polynomial is being used as odds and bearings. I was really interested in invariants that are about behavior. The behavior of the algebraic gadget is the thing that is the invariant of the knot. In some sense, it’s shifting from this view of the knot as a static thing, just hanging out there in space, to something that is dynamic, so there’s signal flowing around wires. It’s a very different way of viewing the knots. The invariant becomes a different kind of invariant.

Isaac: It’s funny cause that seems more consistent with how to view a knot anyways because everything I’m looking at is like: start at some point on the knot and start traversing it in a particular direction. That’s a signal.

Greg: That’s exactly right. As a result of this shift in the way we think about the invariant, this other thing comes along for free: the application of the spatial logics and the Hennessy-Milner logics. Because they classify processes.

Isaac: Right.

Greg: So in fact, you have these lovely theorems that processes are bisimilar if and only if they satisfy all the same formulae, and if you also have a theorem that says two knots are ambient isotopic, if and only if they’re bisimilar, then we get the Hennessy-Milner logics classifying the knots. It’s a systematic classification system.

David: There is some type of classification; basically, every knot is determined by its compliment in three-dimensional space as well, but it just changes it to another kind of hard problem.

Greg: Push the bubble to a different part of the carpet.

Christian: Each polynomial would determine a certain class of processes?

Greg: That’s one direction. But again, as I said, I’m less interested in that direction through the application of the invariants from Algebraic topology, or knot theory in particular, over to process theory. I’m more interested in processes and Hennessy-Milner formulae applied to knot theory.

Christian: I was just wondering what you meant by the polynomials having to do with dynamics.

Greg: I’m just saying that inherently, there’s a notion of dynamics that comes from a polynomial. We can calculate: I plug in a value for the variable and I get a number out. It is a program, but that programmatic aspect of the invariant is left by the wayside. We just look at the structure of the polynomial.

Ever since Lambda, something has been staring us in the face and we’re not seeing how important it is. And that is the structure-function relationship. If you shift sciences for a minute, when you move to a place where telos and purpose is the name of the game, then the structure-function relationship leaps out in stark contrast.

If you’re trying to understand an organism, something as simple as a virus or a bacteria, the structure-function relationship is essential. Understanding how a structure gives rise to a behavior is part and parcel of biology. You don’t have a good biological account until you have some kind of handle on those kinds of questions.

In a mathematical context, a lot of that gets lost. The structure-function relationship of the polynomial is not giving us the same kind of information about the knot. Whereas the kind of knot invariant that we’re calculating with the process, first of all with Lambda and Pi and all of the computational calculi, the structure-functional relationship is right there.

There is no way to get around it. What you see is what you get. That’s one of the things that’s really interesting about this approach to computation. There’s no hidden extra state that you have to keep around in your mind in order to understand how the thing behaves. It’s all instruction. That’s sort of the essence of bisimulation.

Bisimulation is capturing the content of the structure-function relationship, not just in the Pi calculus, but in all of these computational calculi that have these properties. Now what we’re saying is, that structure-function relationship can yield interesting information about structures like knots outside of physical structures, or at least physically realizable.

That was the other thing that was really important about this work was to try to say that Pi calculus isn’t just for computation anymore. We can use it to reason about the physical world and physical dynamics, which was another underlying point of doing the work that I did with David. It isn’t just about computation. Put a different way, if you want it to go after Wheeler’s bit-for-bit program, here’s a tiny baby step in that direction. How do I get from computation to a manifest physical world? Here’s a baby step that will do that.

Isaac: I agree that this structure-function relationship is an important thing. This bisimulation is capturing that in a really essential way. I see the importance of trying to bring that notion over to different areas of mathematics.

Greg: Yeah. In particular, if the physicists really are serious about trying to get a physical universe rising out of computation, then ultimately they’re going to have to deal with exactly that. Bisimulation says something really essential about that. Exercising these kinds of ideas in these nicely constrained toy problems like ambient isotopy, which is not so much of a toy—David’s history just shows us how subtle it can really be. But it’s so much simpler than trying to model what it’s like to chase a dog through a park.

David: Right. It’s amazing how difficult it gets so quickly.

Greg: That is precisely right. Anyone who’s had two or three dogs meet in a park, and they’re all on leashes, they know precisely how tangled things can get.

David: For sure. Especially Australian shepherds. They’ve got a lot of energy.

Greg: They certainly do.

David: I’ve been thinking along similar ideas from a slightly different angle. I don’t know if I have it as well-formed as you do, because you obviously thought about these things much more deeply for much longer, but just how some mathematicians think of function as rules versus the graph of a function. One is more dynamic than the other. There’s a tendency in modern mathematics to focus more on that function of a graph, and you lose something by doing that. Obviously, there’s a lot of power in that too.

Greg: Yeah, I agree.

David: I think you’re on to something here. We’ve got to keep pushing on this one.

Greg: I agree. I want to revisit the encoding, but really use Rho calculus as opposed to the Pi calculus and see if something changes. Because the square root calculation absolutely did change.

Christian: In the context of bisimulation, what is structure and what is function?

Greg: The structure is the structure of the term and function is the evolution of the term. It’s very hard to get mathematicians who are outside of the computational realm to understand the payoff. You can use the Hennessy-Milner logics to go and do classification. What’s true for the mathematicians to grok is, there’s this whole other line of work that has to be done to go and do a bunch of classifications, like classify various families of knots with these formulae, which is a whole extra line of work.

It’s already interesting just to have this cool theorem, and then point out that when you put the two theorems together, the one about bisimulation corresponding to logical characterization and bisimulation corresponding to calculus. When you put those two together, then you get this classification scheme. But in order to be received by the mainstream mathematical audience, you have to take this additional step, which is to go and classify different families of knots using the Hennessy-Milner formula. I just never had the time to get right. It’s a lot of work.

David: It is. It’s the same here. I’ve got these other projects that I’ve been working on, but I’m excited to come back to it. We’ve been meaning to do it. It’s always been there. I’m excited about the Rho calculus too. I looked at the paper that you had written a long time ago.

Greg: 2005.

David: I had a lot of background information that I needed to assimilate to really understand what was going on in there. I re-read it last week after that route processes posting you had. I’m very excited now.

Greg: Oh, that’s awesome. That’s good to hear. We’d like more mainstream mathematicians to have that response to the Rho calculus paper.

David: Right. Well, someone will be like, how’s it going to benefit me? There’s always that aspect of it too. They’re so invested in their own research programs. Anything that’s going to either take them away from that or threaten them, they might not react well. But hey, you can’t stop the truth from coming out.

Greg: That’s exactly right. Science and math proceed at a particular pace. Hopefully, that pace is mostly governed by the process of pursuing the truth, which in the case of science is the scientific method, and in the case of mathematics is publishing and reviewing proofs. It is slowed down quite a bit because people have tastes. People want to look at proofs that are in areas that they’re interested in or are popular. The process doesn’t proceed exactly ideally.

But as Christian and Isaac and I talked about, it is a different kind of governance model. When a community is interested in the truth, the kind of governance that you get is very different. It has that going for it.

David: There probably will be a shift coming up, like in the Homotopy Type Theory. I see more of computer science and mathematics getting closer together like they were more so at the beginning of computer science.

Greg: I think you’re right. I’m delighted that the Homotopy Type Theory is getting the kind of attention and engagement that it is. To be honest, the LADL program proposes a completely different notion of type. At some point, I really want to compare and contrast notions of type from Homotopy Type Theory.

David: That would be interesting.

Greg: I think Homotopy Type Theory is still beholden to or captured by a notion of function.

David: I agree with that.

Greg: Function is just not the only game in town. In fact, if you look carefully at most computational phenomenon, it’s very far from what goes on. We have lots and lots of intuitions about functions, but nature has other ideas about how to scale.

David: Exactly.

Christian: You say you want to expand this knot idea to the Rho calculus. Does reflection add a whole other aspect or dimension to that interpretation?

Greg: One of the things that I was always really interested in was a kind of recursive knot idea—the tower of knots—where inside the crossing you have a tangle. One of the ports coming in, you could fray that wire into a bunch of different wires. Those wires could all be intertwined or tangled. Then at any one of the crossings of those wires inside this crossing, you could do the same again.

David: Have you ever seen the picture of the Alexander polynomial?

Greg: That’s exactly right. It becomes a recursive or fractal-like construction. In the same way that in the spring we talked about this tower of computations, you can apply the same idea to knots. Instead of stopping at a crossing, you can virtualize what the crossing is.

Christian: Could you elaborate on that just a little bit?

Greg: There’s a way in which every knot corresponds to a braid. The braid has N points at the top and N points at the bottom. You could think of every crossing in a knot as like a braid. In fact, you can generalize it from a braid to a tangle where when the signal comes in, it doesn’t remain a single wire, it gets framed. Inside a particular crossing, you could have arbitrary complexity of a tangle. Does that make sense? Can you visualize that?

Christian: Yeah.

Greg: And then inside that tangle, you have a bunch of crossings. Those could also be tangles.

David: If you Google Conway tangles, there’ll be some pretty decent explanations of it. Some good pictures. A picture is worth a thousand words.

Greg: With the Rho calculus, because you have reflection, you can model that. Whatever channels you’re using for the signals coming in, they could turn out to either be or transport tangles at the crossing level. The reflection of the Rho calculus gives you an edge or an angle for you to express recursive knots. Those beasties are more satisfying because I don’t have to have any atoms. In some sense, the crossing is like an atom. Then I will boil away the atoms if I can.

David: Right.

Greg: The intuition goes back to Greg Chaney, who was certainly a mathematician after my own heart. He points out that wherever you have atoms in a theory, whether it’s axioms or elements in a set theory, wherever you have an unexplained set of gadgets that you start off with as your ground, that represents the risk of your theory. So I’m always trying to minimize the risk of the theory. That’s really all the Rho program does. The reflective program is just about minimizing that risk so you can know exactly where the ground is. Like in the case of Rho, the ground is zero. That’s your only risk. The idea of zero is not too much of a risk. It’s a little bit of a risk, but it’s not as much of a risk as an infinite set of names that has essentially unrealizable properties.

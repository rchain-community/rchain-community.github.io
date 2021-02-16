# Conway

To illustrate the potential for infinite precision arithmetic in rholang here is a toy interpretation of Conway’s surreal numbers (https://en.wikipedia.org/wiki/Surreal_number) in rholang.


```javascript
G ::= { G* | G* }
```
Following Conway, we use the notation GL for the collection of games on the left of G and GR for the right. An interpretation that follows more or less the same pattern as the interpretation of the natural numbers as given above can be expressed in a 1-line equation.
```javascript
⟦G⟧( l, r ) = ∏L ∈ GL l!( ⟦L⟧( l, r ) ) | ∏R ∈ GR r!( ⟦R⟧( l, r ) )

where

∏s ∈ S P( s ) = P( s ) | P( s’ ) | P( s’’ ) | … , for each s ∈ S

Then we can implement negation as

-{ GL | GR } = { -GR | -GL }
⟦-G⟧( l, r ) = new lp, rp, rtn. neg( l, r, lp, rp ) | ⟦G⟧( lp, rp )

neg( l, r, lp, rp ) = for( g <- lp ){ r!( neg( l, r, lp, rp | *g ) ) } | for( g <- rp ){ l!( neg( l, r, lp, rp | *g ) }
```
Note the lazy evaluation of the next level of recursion! The recursive call to negation will not be invoked unless some agent asks for a particular component game of either the left or right side of ⟦-G⟧( l, r ). The example illustrates that rholang provides a very natural syntax for integrating both lazy and eager evaluation. It also illustrates how this feature allows the implementation to handle potentially infinite games, and treat numbers as streams. The reader is encouraged to take the definition of addition of Conway games and interpret it in this setting.
## Conclusions
We have provided a few examples of rholang contracts implementing of notions of quantity and other familiar data structures. We use the examples of the natural numbers because they are familiar concepts and most readers will have robust mental models of them and considerable experience with their basic theory and some realizations in computational systems. As such translations of these familiar notions into the rholang setting should help provide some insight into the nature of computation in rholang, and mobile process calculi more generally.

There are additional motivations. One of these is to show the simplicity and ease of translating both familiar such as the natural numbers and the booleans, and sophisticated mathematical ideas and specifications, such as Conway’s surreal numbers, directly into rholang code. This not only facilitates communication and the flow of ideas from formal methods into rholang contracts, but it also facilitates proofs about rholang contracts as proofs about corresponding mathematical specs are also as directly translated.

Moreover, this completes an obligation set up in the rholang specification to provide a Church numeral like representation of basic arithmetic operations. In the spec it is noted that it is not necessary to realize arithmetic operations in this manner. The compositional nature of the rholang semantics, very much like the compositional nature of the 𝛌-calculus makes it not only possible, but quite efficient to provide modularized implementations of key data structures and operations, such as arithmetic, that map readily onto implementations that are more efficient in the environment of modern hardware architecture and existing languages, libraries, and compilers.

Finally, this allows those with a bent for implementation, as well as those with a proclivity to mathematics to have fun! They can use rholang to engage each other and the richer world of ideas and computations that informs rholang contracts. The representation of quantity, as in the encodings of the natural numbers and Conway games, provides a simple example that has been observed for more than a decade, but has not had anyone to do a real deep investigation. More specifically, with the advent of spatial and behavioral types, computational interpretations of concepts of number and quantity can be investigated in a much more disciplined and detailed way. 

The reality is that types like Naturals, Integers, Rationals, Constructibles, Algebraic, Real, Complex, Geometric are in some sense only a random walk through the notions of quantity and number. They represent a particular history of the investigation of the ideas, from a very specific and somewhat peculiar sensibility, and one that has not, for the most part, been influenced by what we know about computing, primarily because the understanding of computation has only emerged in the last century, whereas most of these notions of quantity and number have developed in the preceding millennia. In the same way that Conway’s reformulation of number as game gives rise to a completely new and much more inclusive notion of number, with the expressive power of spatial and behavioral types coupled to the computational interpretations of number and quantity, we can develop classifications of number and quantity that have never been seen before. Because of the way these types arise as directly related to the computational phenomena they classify and organize, we will see a much tighter relationship between the types of number described and the numbers that inhabit the types. Would that i could say more about this, but it is far beyond the scope of this paper. i do hope it sparks the imagination of even one soul who feels the call to investigate it.


// Alex Bulkin’s original draft

```javascript
contract Number( increment, decrement, next, prior ) = { 
    selectswitch { 
        case f <- increment, n <- next => { ## produces the next number
            next!(n) | f!(n) | Number( increment, decrement, next, prior )
        }
        case f <- increment => { ## creates the next number
            new new_next, new_prior, new_inc, new_dec in { 
                f!( @Number( new_inc, new_dec, new_next, new_prior ) ) 
                | new_prior!(@Number( increment, decrement, next, prior))
                | Number( increment, decrement, next, prior )
        }
        case f <- decrement, p <- prior { 
            ## produces the previous number, zero does not have one
            prior!(p) | f!( p ) | Number( increment, decrement, next, prior )
        }
}
Zero = new i, d, n, p in Number(i, d, n, p)
```

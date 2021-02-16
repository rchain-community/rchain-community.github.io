# Booleans

We can emulate this approach to arrive at the booleans with
```javascript
⟦true⟧( false, true ) = true!( 0 )
⟦false⟧( false, true ) = false!( 0 )
⟦if cond P else Q⟧( false, true ) 
= 
 ⟦cond⟧( false, true ) | select{ case _ <- true => ⟦P⟧( false, true ); case _ <- false => ⟦Q⟧( false, true ) }
```
Under the assumption that ⟦cond⟧( false, true ) evaluates to a boolean, it will trigger the evaluation of ⟦P⟧( false, true ) or ⟦Q⟧( false, true ) depending on which value it evaluates to. The reader is encouraged to provide translations of and and or.

# Church Numerals

In this implementation the natural numbers are represented by nested outputs.
```javascript
⟦0⟧( zero, succ ) = zero!( 0 )
⟦n⟧( zero, succ ) = succ!( ⟦n - 1⟧( zero, succ ) )
```
This allows for a relatively concise implementation of addition
```javascript
⟦m+n⟧( zero, succ ) = {
    new zerom, zeron, succm, succn, rtn;
    for( r <- rtn ) { *r }
    | add( zerom, zeron, succm, succn, zero, succ, rtn )
    | ⟦m⟧( zerom, succm ) | ⟦n⟧( zeron, succn )
}
```
where we avail ourselves of the contracts copy and add below. The implementation illustrates the use of namespaces to isolate processes from each other. If the interpretation of m and n are realized in the same namespace, that is, using the same zero and succ channels, then processes operating on them have to worry about mixing and interaction between the processes representing those numbers. More precisely, a process that interacts with both
```javascript
 ⟦m⟧( zero, succ ) and ⟦n⟧( zero, succ )
```
needs to worry, potentially, about which process the communications on zero and succ originate from. If we have distinct names zerom, zeron, succm, succn, then we can effect an identification of the processes representing each number.
```javascript
 ⟦m⟧( zerom, succm ) and ⟦n⟧( zeron, succn )
```
That’s what the implementation of + does. It interprets each number into its own separate namespace, then it calls add which interacts with each process, pulling on each succi channel concurrently, until one or both of them reaches zeroi, copying the remainder from the source namespace into the result namespace, zero and succ, before piling on the succs from the original parameters to the interpretation of +, to at a time, account for the decrements of the simultaneous recursive descent.



// copy moves a process representing a number in the namespace 

// defined by zero1 and succ1 into a namespace defined by zero2 and succ2

```javascript
copy( zero1, succ1, zero2, succ2, rtn ) = {
    select {
        case mo <- succ1 => {
new rtp;
for( r <- rtp ) { rtn!( succ2!( *r ) ) }
| copy( zero1, succ1,zero2,succ2,rtp ) | mo
        }
        case z <- zero1 => rtn!( zero2!( 0 ) )
    }
}
```

// add implements the arithmetic addition between numbers in different namespaces 

// placing the resulting process in the namespace zeromn, succmn, on the channel rslt

```javascript
add( zerom, succm,  zeron, succn, zeromn, succmn, rslt ) = {
   select {
       case mmo <- succm; nmo <- succn => {  // both processes have more to say about succession
          new rsltmt;
             for( r <- rsltmt ){
                rslt!( succmn!( succmn!( *r ) ) ) // we decremented by 2 in the join
             }
            | add( zerom, zeron, succm, succn, zeromn, succmn, rsltmt )
            | *mmo | *nmo
       }
       case mmo <- succm; zn <- zeron => { // n has run out of things to say about succession, but not m 
            new rtn;
            for( mmr <- rtn ) {
                rslt!( succmn!( *rtn  ) )
            }
            | copy( zerom, succm, zeromn, succmn, rtn ) | *mmo
       }
       case nmo <- succn; zm <- zerom => {  // m has run out of things to say about succession, but not n            
            new rtn;
            for( nmr <- rtn ) {
                rslt!( succmn!( *rtn  ) )
            }
            | copy( zeron, succn, zeromn, succmn, rtn ) | *nmo
       }
       case zm <- zerom; zn <- zeron => { // both processes have run out of things to say about succession
            rslt!( zeromn!( 0 ) )
       }
}
```
Of course, this is not the only interpretation. There is a dual interpretation where successor is not realized as output, but as input. The reader is encouraged to investigate an implementation of this interpretation as it is equally instructive.

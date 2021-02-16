# Names and Processes
Rholang has two kinds of values: processes and names.

## Names 
A name represents a communication channel. You can send messages to a name or you can receive a message from a name.

The names are created with the construct
```javascript
new someName in {
//... code using someName
}
```
In the above example, the name `someName` is private. By "private", we mean that no other process can send or receive messages over this channel unless we explicitly send its name to the other process.  

If rholang is running on the blockchain, the messages sent on this channel will be publicly visible, so it is not "private" in the sense of being secret.  Channels created with `new` cannot be mentioned explicitly in rholang source code.  Even if you see the bits of a private name on the blockchain, there is no language production to turn those bits back into the name.  

We sometimes use the term "unforgeable" to describe these names when we want to emphasize the inability to construct them from bits.

Receiving messages over a name is done using the `for` construction
```javascript
for( x <- name1, y <- name2) {
...
}
```

## Processes
In Rholang everything is a process. Values like strings, booleans or numbers are also processes.
The processes can be aggregated using the operator '|'. Below are a few examples:
```javascript
1
true
1 + 1
new myName in {...}
someName ! ("hello")
for( x <- someChannel) { ... }
p | q
```
### Primitive values
Rholang currently supports integers, strings, booleans, tuples, lists, sets and maps.

## Recursion

Many programming languages use iteration as a fundamental way of controlling the flow of their programs. Iteration inherently means doing a process to one item then the next then the next. Because rholang is a fully concurrent programming language this is impossible. But that's actually a strength!

```
manually iterate through the list [1, 2, 3, 4]
```

This process is clearly not sustainable because long lists would be extremely deeply nested. Worse, any code that we actually write would have a maximum depth. And we don't want to limit the length of our list. Consider this crafty code

```
Simple recursion that passes a counter and compares it to the lists length
```

```
Better version that uses pattern matching to detect empty list
```

## Recursion operators
- map
- filter
- sumlist


### Exercise
Write a contract that takes in two integers that represent a minimum and a maximum.

Exercise: group forwarder. I, the king, send messages to the forwarder who copies them to all the recipients. Rather than just having kill switch, I have the ability to change group subscription.





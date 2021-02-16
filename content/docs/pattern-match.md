# Pattern matching

There are two kinds of value in Rholang, names and processes. Patterns are names or processes with free variables and logical connectives, which appear to the left of an arrow in a `for` or a `match`:

```javascript
for (<name pattern> <- <channel>)
{ <process> }
```

```javascript
match <process>
{ <process pattern> => <process> }
```

A variable is either name-valued or process-valued. It is an error to use a process-valued variable in name position and vice-versa. Name positions are to the right of a `new`, to the right of an asterisk `*`, to the right and left of an arrow in a `for` (and in the desugaring of a contract), and to the left of an exclamation mark `!` in a send. Name-valued variables are bound by a `new` production and in name positions in patterns. In each of the following examples, `x` is a new name-valued variable whose scope is `P`:

```javascript
new x in P
for (w, x <- y) { P }
for (@{x!(Q)} <- y) { P }
for (@{for(z <- x) { Q }} <- y) { P }
contract foo(x) = { P }
match R { x!(Q) => P }
match R { contract x(y) = { Q } => P }
```

Process-valued variables are bound in process positions in patterns. Process positions are after an at sign `@`, in the body of a send, in the body of a `for`, and in all process constructors like expressions, collections, and so on. In each of the following examples, `P` is a new process-valued variable whose scope is `Q`.

```javascript
contract foo(@P) = { Q }
for (@{x!(P)} <- y) { Q }
for (@{for (@P <- z) { R }} <- y) { Q }
for (@{ P | R } <- y) { Q }
match R { P => Q }
match R { [P, S, ...T] => Q }
match R { contract foo(x) = { P } => Q }
match R { contract foo(@S) = { x!(P + S) } => Q }
```

In addition to free variables we have the logical connectives "AND", written `/\`, and "OR", written `\/`. In order to match with a list of patterns, separated by `/\`, a process or name must match each pattern in the list. For example, to send a message over a channel `students` that will be received by

```javascript
for(@{ @"grade"!(x) /\ @y!(10) } <- StudentGradeLevel){ ... }
```

the process we send must necessarily be of the form `@"grade"!(10)`. The first pattern requires that the process be something of the form `@"grade"!(x)`, where `x` is a process variable, and the second pattern requires that `x` be `10`. So this waits for a student to register in grade 10 and then executes the body of the `for`. If we register the student in grade 10 via

```javascript
StudentGradeLevel!(@"grade"!(10))
```

in parallel with the `for` above, `x` will bind to `10` and `y` will bind to `"grade"`. In contrast, in order to match a list of patterns, separated by `\/`, a process or name need only match ONE pattern in the list. Because we cannot depend on a specific pattern matching, we cannot use patterns separated by `\/` to bind any variables. For instance, replacing the `/\` with an `\/` in the `for` above yields an incorrect Rholang program

```javascript
for(@{ @"grade"!(x) \/ @y!(10) } <- StudentGradeLevel){ ... }
```

which is incorrect because `x` and `y` are both free. Furthermore, we cannot capture `x` or `y` because we cannot use a binder to capture variables inside a pattern. We will cover this more later on, when we talk about patterns within patterns.

To correct this code, we could write something like

```javascript
for(@{ @"grade"!(10) \/ @"grade"!(11) } <- StudentGradeLevel){ ... }
```

which waits for a student to register in either grade `10` or `11` before executing the body of the `for`.

We can use both `/\` and `\/` in any given pattern, such as in:

```javascript
for(@{ 10 \/ 20 /\ x } <- @"chan"){ ... }
```

This program is not quite correct. In Rholang, precedence rules for logical connectives are standard, meaning that `/\` binds tighter than `\/`, so the `for` above is equivalent to

```javascript
for(@{ 10 \/ { 20 /\ x } } <- @"chan"){ ... }
```

which has the free variable `x`. We can make this into a correct Rholang program by shifting parentheses

```javascript
for(@{ { 10 \/ 20 } /\ x } <- @"chan"){ ... }
```

Finally, logical connectives need not only separate process patterns, but can be used in any component of a pattern. For example, we can simplify our code that waits for a student to register in either grade `10` or `11` and write

```javascript
for(@{ @"grade"!(10 \/ 11) } <- StudentGradeLevel){ ... }
```

This will match with whichever of `StudentGradeLevel!(@"grade"!(10))` and `StudentGradeLevel!(@"grade"!(11))` runs first. The same precedence rules from before apply.

## Patterns in a **for**

The term

```javascript
for (@{x!(P)}, @{for(y <- z) { y!(Q) }} <- chan) { ... }
```

expects to receive two names on the channel `chan`, where the names are serializations of certain processes that must match the given patterns. The first name should be the serialization of a single send of a single process; the name variable `x` gets bound to the channel on which the send occurs, and the process variable `P` gets bound to its payload. The second name should be the serialization of a single receive, whose body consists of a single send of a single process. The name variable `z` gets bound to the channel on which the receive is listening, and the process variable `Q` gets bound to the payload of the send. The name variable `y` does not get bound, but the matcher checks to see that the same variable is used to the left of the arrow in the `for` and to the left of the exclamation mark in the send.

Patterns let us implement structured queries on data. Suppose that we send lots of processes with a similar structure on a name `people`:

```javascript
people!(@"name"!("Joe") | @"age"!(20) | @"eyes"!("blue") | @"seq"!(0)) |
people!(@"name"!("Julie") | @"age"!(30) | @"eyes"!("brown") | @"seq"!(0)) |
people!(@"name"!("Jane") | @"age"!(40) | @"eyes"!("green") | @"seq"!(0)) |
people!(@"name"!("Jack") | @"age"!(50) | @"eyes"!("grey") | @"seq"!(0))
```

Then we can think of the name `people` as a table in a database and query it. A rough translation of the SQL statement `SELECT age, name FROM people WHERE age > 35` in the context of the data above would be

```javascript{numberLines: true}
  new people, stdout(`rho:io:stdout`) in {
    people!(@"name"!("Joe") | @"age"!(20) | @"eyes"!("blue") | @"seq"!(0)) |
    people!(@"name"!("Julie") | @"age"!(30) | @"eyes"!("brown") | @"seq"!(0)) |
    people!(@"name"!("Jane") | @"age"!(40) | @"eyes"!("green") | @"seq"!(0)) |
    people!(@"name"!("Jack") | @"age"!(50) | @"eyes"!("grey") | @"seq"!(0))|
    for (@{@"seq"!(0) | {row /\ {@"name"!(name) | @"age"!(age) | _}}} <= people) {
      if (age > 35) {
        stdout!([name, age])
      } |
      people!(row | @"seq"!(1))
    }
  }
```

6. The `for` production uses a double arrow `<=`, so it reads repeatedly from the table `people`. It uses a pattern to match the structure of the processes sent on the channel `people`. The pattern starts with an at sign `@`, because anything to the left of an arrow in a `for` is a name, i.e. a serialized process.

The pattern continues with `@"seq"!0`. This bit of data prevents the `for` loop from reading the same row multiple times: once a row has been read, it's put back into the database on line 10, but the sequence number gets incremented to 1. Since the `for` only wants rows with sequence number 0, each row only gets read once.

Next in the pattern comes `row /\ ...`. The process variable `row` gets bound to everything in the process other than `@"seq"!0`. The operator `/\` is the logical connective "AND", which will also try to match the next pattern to the data.

Finally in the pattern is the subpattern `{@"age"!age | @"name"!name | _}`, which binds the process variables `age` and `name`. The underscore wildcard binds to the send on `@"eyes"` and discards it.

7. This is the translation of the `WHERE` clause.

8. Here we merely print out the name and age, but we could do arbitrary processing. We expect to see

```javascript
@{["Jane", 40]}
@{["Jack", 50]}
```

in either order.

10. As noted above, this line updates the sequence number so that rows are not read twice. If we have multiple readers of the database, each will be assigned a sequence number. As soon as a row is read, it is put back into the database for the next reader; any processing is done in parallel with the write, so even though this pattern sequentializes the readers, the access is still very fast.

## Patterns in a **match**

Patterns can also be used in a `match` production.

```javascript{numberLines: true}
  new sumProd in {
    contract sumProd(@arr, ret) = {
      new fold, sum, prod in {
        contract fold(@init, op, @arr, ret) = {
          match arr {
            [h ...t] => {
              new tailCh in {
                fold!(init, *op, t, *tailCh) |
                for (@folded <- tailCh) {
                  op!(h, folded, *ret)
                }
              }
            }
            [] => ret!(init)
          }
        } |
        contract sum(@arr, ret) = {
          new add in {
            contract add(@a, @b, ret) = {
              ret!(a + b)
            } |
            fold!(0, *add, arr, *ret)
          }
        } |
        contract prod(@arr, ret) = {
          new mult in {
            contract mult(@a, @b, ret) = {
              ret!(a * b)
            } |
            fold!(1, *mult, arr, *ret)
          }
        } |
        new sumCh, prodCh in {
          sum!(arr, *sumCh) |
          prod!(arr, *prodCh) |
          for (@s <- sumCh; @p <- prodCh) {
            ret!([s, p])
          }
        }
      }
    } |
    sumProd!([4,5,6], "stdout")
  }
```

This example shows how to implement a fold over a list, then uses it to compute the sum and product of a list.

4.) The `fold` contract expects a process `init`, a name `op`, a process `arr`, and a name `ret`.

5.) It begins by looking at the structure of the `arr` process.

6.) This line begins with a process pattern `[h ...t]` that binds the process variable `h` to the head of the list and the process variable `t` to the tail of the list. If the pattern matches `arr`---that is, if `arr` has at least one element---then the process to the right of the arrow `=>` executes.

7.) A new channel is declared for sending the intermediate result on.

8.) Line 8 is the recursive call in the fold; it provides the intermediate result channel here and listens for the intermediate result on line 9.

10.) This combines the head with the intermediate result and sends the final result over the given return channel `ret`.

17.) The `sum` contract expects a process `arr` and a name `ret`.

19-21) To sum up an array, we have to add together the elements, so we define a contract that takes two things, adds them together, and sends the result on the given channel.

22.) The sum of an empty array is 0.

25-32) Identical to `sum` except for using multiplication andinstead of addition and 0.

34-35) Invoke the `sum` and `prod` contracts simultaneously.

36.) Wait until both have returned and bind process variables to the results.

37.) Send a two-element list back containing the results.

42.) Invoke the main contract on an example list.

## Patterns With Wildcards

We can also include wildcards in patterns. The intuition for these is that they throw away whatever they match to in the pattern. This can be useful, for example, to synchronize processes by listening on a channel `ack` for an acknowledgment that one process has completed and that the body of this `for` is supposed to execute.

```javascript
for( _ <- ack ){ ... }
```

## Patterns with simple types

It's possible to match simple types: `Int`, `Bool`, `String`, `Uri`, and `ByteArray`

```javascript
for( @Int <- ack) { ... }
```

If you want to capture the value you matched, you can use the and logcial connective: `/\`

```javascript
for( @{x /\ Int} <- ack) { ... }
```

## Aditional Docs

[clarification on pattern matching](https://developer.rchain.coop/assets/illegal%20moves.pdf)

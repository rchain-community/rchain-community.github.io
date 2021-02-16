# Sending and Receiving

Sending and receiving is one of the most important things to understand in Rholang.

> Because Rholang is an asynchronous programming language, there is no return in a function.That's why you call a function `HelloWorld(args)` via sending on the `functions` name HelloWorld. You are sending via the ! syntax.

> Because of the asynchrony you don't know when the `function` you called via HelloWorld!(args) is sending the processed data **back** over some other channel. Thats why there is no `return` in the `function`. Instead Rholang has the for(args<-channels) syntax for waiting until all the needed arguments are received over the channels.

## Example

```javascript{numberLines: true}
new HelloWorld, stdout(`rho:io:stdout`) in {
  HelloWorld!("Hello, world!") |
  for (@text <- HelloWorld) {
    stdout!(text)
  }
}
```

1. This line declares a new name-valued variable `HelloWorld` and assigns to it a newly-created private name.

2. Every name is of the form `@P`, where `P` is a rholang process. The `!` production takes a name `n` on its left and a process `P` on its right, then sends `@P` over the channel named `n`. Lineforms the name `@"Hello, world"` and sends it on the channel whose name is stored in the variable `HelloWorld`.

3. This `for` production creates a process that waits for a single message to be sent on the channel whose name is stored in the variable `HelloWorld`. The pattern `@text` gets matched against the serialized process, binding the process-valued variable `text` to the original process that was sent.

4. Rholang runtime environments may choose to include built-in processes listening on channels. In this tutorial, we use new with the urn `rho:io:stdout` to request a channel where sent messages get printed to a console.

> When you send data over a channel and there is no contract which is listening with for(args<-channels) for that channel, then these data is stored in the tuplespace (like a database), until some contract is starting to listening for it.

### Name Equivalence

It is possible to write one single name in several different ways. For example, the two following channels are equivalent:

```javascript
@{10 + 2}
@{5 + 7}
```

Any message sent over these channels can be received by listening on the channel `@12`. There are other instances in which a name can be written in two different ways. The guiding principle for this is that if `P` and `Q` are two equivalent processes, then `@P` and `@Q` are equivalent names. In particular, all of the following channels are equivalent:

```javascript
@{ P | Q }
@{ Q | P }
@{ Q | P | Nil }
```

Before using a channel, Rholang first evaluates expressions and accounts for these `|` rules at the top level--but only at the top level. This means that if an arithmetic expression forms part of a pattern within a pattern, it is left untouched. Because of this,

```javascript
for( @{ x + 5 } <- @"chan" ){ ... }
```

will never receive any message on `@"chan"` since if we send anything, such as `10 + 5`, over `@"chan"`, the arithmetic expression gets evaluated and the name `@15` is sent.

Finally, channels also respect a change in variable name (alpha equivalence), so the following channels are equivalent:

```javascript
@{ for( x <- chan ){ ... } }
@{ for( z <- chan ){ ... } }
```

## Replicated receive

```javascript{numberLines: true}
new HelloWorld, stdout(`rho:io:stdout`) in {
  for (@text <= HelloWorld) {
    stdout!(text)
  } |
  HelloWorld!("Hello, world!") |
  HelloWorld!("Hola, mundo!")
}
```

2.) Instead of handling only a single message, a `for` using a double arrow `<=` will persist, spawning a copy of the body for each message received.

5-6) We send the string processes `"Hello, world!"` and `"Hola, mundo!"` on the channel `HelloWorld`. It is non-deterministic which message will be processed first.

## Contracts as sugar for replicated receive

```javascript{numberLines: true}
new HelloWorld, stdout(`rho:io:stdout`) in {
  contract HelloWorld(@text) = {
    stdout!(text)
  } |
  HelloWorld!("Hello, world!") |
  HelloWorld!("Hola, mundo!")
}
```

2.) The only difference between this example and the last one is this line. The `contract` production is syntactic sugar. The process `contract Name(...formals) = { P }` means the same as `for (...formals <= Name) { P }`.

## Replicated send

```javascript{numberLines: true}
new HelloWorld, stdout(`rho:io:stdout`), stderr(`rho:io:stderr`) in {
  HelloWorld!!("Hello, world!") |
  for (@text <- HelloWorld) {
    stdout!(text)
  } |
  for (@text <- HelloWorld) {
    stderr!(text)
  }
}
```

2.) The double-bang `!!` means that this message will be sent again as soon as it is read.

3-4, 6-7) There are two listening processes; each one consumes a single message from the channel and forwards it to either `"stdout"` or `"stderr"`. The order in which they get forwarded to those channels is nondeterministic.

## Sequential send

In order to have one message follow after another is known to have been received, we must use an acknowledgement message.

```javascript{numberLines: true}
new chan, ack, stdoutAck(`rho:io:stdoutAck`) in {
  chan!(0) |
  for (_ <- ack) {
    chan!(1)
  } |
  for (@num <= chan) {
    stdoutAck(num, *ack)
  }
}
```

2. We send the message 0 on `chan`.
3. We wait for a message on the channel `ack`, throw it away, and then proceed with the body.
4. We send the messageon `chan`.
5. We listen persistently for messages sent on `chan`.
6. We forward each message to the channel `"stdoutAck"`, which expects both a value to print and a channel on which to send an acknowledgement message that the text has been received and printed. In this program, we are guaranteed that 0 will be printed before 1.

## Sending and receiving multiple processes

```javascript{numberLines: true}
new chan, stdout(`rho:io:stdout`) in {
  chan!(1,2,3) |
  chan!((4,5,6)) |
  chan!(7,8) |
  chan!([9, 10], 11) |
  chan!(12 | 13) |
  for (@x, @y, @z <= chan) {
    stdout!(["three", x, y, z])
  } |
  for (@a, @b <= chan) {
    stdout!(["two", a, b])
  } |
  for (@a <= chan) {
    stdout!(["one", a])
  }
}
```

2. We send three numeric processes on `chan`. This send necessarily synchronizes with the `for` on line 7.
3. We send one tuple process on `chan`. This send necessarily synchronizes with the `for` on line 13.
4. We send two numeric processes on `chan`. This send necessarily synchronizes with the `for` on line 10.
5. We send a list process and a numeric process on `chan`. This send necessarily synchronizes with the `for` on line 10.
6. We send a single process that is the par of two numeric expressions on `chan`. This send necessarily synchronizes with the `for` on line 13.

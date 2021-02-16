# Data Structures

It is common for programs to process and store real world data. And whenever you have lots of data it is important to keep it organized so you can find the information you need quickly. In the analog world, paper files are kept organized by stacking them, putting them in folders, and file cabinets. The same concept applies in programming, and rholang is no exception (for once!).

## String Methods

Let's start with a familiar idea. We've seen strings since the very first program in lesson one. Really strings are just a nice way to organize a bunch of characters, and that makes them a data structure. Like all data structures, strings have "methods" that you can perform on them.

String's length method tells how many characters are in a string. While it's slice method creates a new string with some characters sliced off of each end. Strings also support the `++` operator for concatenation.

```javascript
new wordLength, stdout(`rho:io:stdout`) in {
  contract wordLength(@word) = {
    stdout!("How many characters in " ++ word)|
    stdout!(word.length())|
    stdout!("Shorter version: " ++ word.slice(0, 5))
  }
  |
  wordLength!("Cantaloupe")
}
```

What is the result of `"hello world".length()`?

- [ ] 2
- [ ] 10
- [x] 11
- [ ] undefined
- [ ] "hello"

Which of the following evaluates to "ello"?

- [x] `"hello world".slice(1, 5)`
- [ ] `"hello world".slice(0, 5)`
- [ ] `"hello world".slice(1, 4)`
- [ ] `"hello world".slice(3, 6)`

Strings also have a method called `hexToBytes` that is designed to work on strings that contain valid hexadecimal numbers. It gives back a byte array that is represented by that hex number. Try to run `"1241243e".hexToBytes()`

Pro tip: It is also possible to slice a byte array. Experiment with that on your own.

## Tuples

Tuple can rhyme with either "couple" or "drupal"; both pronunciations are correct. You've seen tuples before when you wrote contracts that take in multiple arguments like `contract c(x, y, z) = { Nil }`. The number of items in a tuple is know as its arity. So the tuple received by contract `c` is arity three.

Tuples contain several pieces of data **in order**. They are always a fixed arity, and have relatively few methods. Thus they are the least interesting data structure, but at the same time, the most fundamental. Let's look at some of the methods offered by tuples.

```javascript
new tCh, print(`rho:io:stdout`) in {

  tCh!!((3, 4, 5))|

  // Test nth
  for (@t <- tCh){
    print!(["Test nth. Expected: 5. Got ", t.nth(2)])
  }
  |

  // Test toByteArray
  for (@t <- tCh){
    print!(["toByteArray test. Got: ", t.toByteArray()])
  }
}
```

What is the arity of [3, 4, 9, Nil]?

- [ ] 3
- [x] 4
- [ ] 9
- [ ] Nil

What would `("a", "b", "c").nth(3)` evaluate to?

- [ ] 3
- [x] That's an error
- [ ] "c"
- [ ] ("a", "b", "c")

### Exercise

Write a program that takes in a 4-tuple and prints elements 0 and 3 to the screen.

## Lists

Lists are a lot like tuples, but they are made with square brackets instead of parentheses. They also have more methods, and can be concatenated or glued together using the `++` operator just like strings can. Here are examples of all of list's methods.

```javascript
new lCh, stdout(`rho:io:stdout`) in {

  // Make a new list, l
  lCh!!([3, 4, 5])|

  // Test nth
  for (@l <- lCh){
    stdout!("Test nth. Expected: 5. Got: ${ans}" %% {"ans": l.nth(2)})
  }
  |

  // Test toByteArray
  for (@l <- lCh){
    stdout!(["Test toByteArray. Got: ", l.toByteArray()])
  }
  |

  // Test slice
  for (@l <- lCh){
    stdout!(["Test slice. Expected: [4, 5]. Got: ", l.slice(1, 3)])
  }
  |

  // Test length
  for (@l <- lCh){
    stdout!("Test length. Expected: 3. Got: '${ans}" %% {"ans": l.length()})
  }
}
```

### Exercise

Implement the body of the following running log contract. The user will call the contract every time they go for a run passing in the distance that they ran. The contract will keep track of all the runs in a list. You may also write methods to get all the run data, or get the total distance the user has run.

```javascript
new logRun, runsCh in {

  // No runs to start with
  runsCh!([])|

  contract logRun(distance) = {
    // Your code here
  }
}
```

## Sets

Sets are similar to lists in some ways, but the one big difference is that sets **are not ordered**. A set is a collection of processes, but there is no first or last item in the set. There are also **no duplicates** allowed in sets. Let's take a look at some of set's methods.

```javascript
new sCh, stdout(`rho:io:stdout`) in {

  sCh!!(Set(3, 4, 5))|

  // Test toByteArray
  for (@s <- sCh){
    stdout!(["Test toByteArray. Got: ", s.toByteArray()])
  }
  |

  // Test Add
  for (@s <- sCh){
    stdout!(["Test add. Expected Set(3, 4, 5, 6), Got: ", s.add(6)])
  }
  |

  // Test Diff
  for (@s <- sCh){
    stdout!(["Test diff. Expected: Set(5) Got: ", s.diff(Set(3, 4))])
  }
  |

  // Test Union
  for (@s <- sCh){
    stdout!(["Test union. Expected: Set(1, 2, 3, 4, 5). Got: ", s.union(Set(1, 2))])
  }
  |

  // Test Delete
  for (@s <- sCh){
    stdout!(["Test delete. Expected: Set(3, 4). Got: ", s.delete(5)])
  }
  |

  // Test Contains
  for (@s <- sCh){
    stdout!(["Test contains. Expected: true. Got:", s.contains(5)])|
    stdout!(["Test contains. Expected: false. Got: ", s.contains(6)])
  }
  |

  // Test Size
  for (@s <- sCh){
    stdout!("Test size. Expected 3. Got: ${ans}" %% {"ans": s.size()})
  }
}
```

Which code would produce a set of all club members who have not paid their dues?

- [x] `allMembers.diff(paidMembers)`
- [ ] `paidMembers.diff(allMembers)`
- [ ] `paidMembers.union(allMembers)`
- [ ] `paidMembers.contains(allMembers)`

What is the result of `Set(1,2,3) == Set(3,2,1)`

- [x] `true`
- [ ] `false`
- [ ] invalid syntax
- [ ] `Set(2)`

## Maps

Maps are a lot like sets but they contain **key value pairs**. Maps are also unordered, but when you add an item (which is now known as a key) you also add an associated value. Here are examples of all of map's methods.

```javascript
new mCh, print(`rho:io:stdout`) in {

  mCh!!({"a": 3, "b": 4, "c": 5})|

  // Test toByteArray
  for (@m <- mCh){
    print!(["Test toByteArray. Got: ", m.toByteArray()])
  }
  |

  // Test Union
  for (@m <- mCh){
    print!(["Test union. Expected: {a: 3, b: 4, c: 5, d: 6}. Got: ", m.union({"d": 6})])
  }
  |

  // Test Diff
  for (@m <- mCh){
    print!(["Test diff. Expected: {b: 4, c: 5}. Got: ", m.diff({"a": 3})])
  }
  |

  // Test Delete
  for (@m <- mCh){
    print!(["Test delete. Expected: {a: 3, b: 4}. Got: ", m.delete("c")])
  }
  |

  // Test Contains
  for (@m <- mCh){
    print!(["Test contains. Expected: true. Got: ", m.contains("c")])|
    print!(["Test contains. Expected: false. Got: ", m.contains("d")])
  }
  |

  // Test Get
  for (@m <- mCh){
    print!(["Test get. Expected: 4. Got: ", m.get("b")])
  }
  |

  // Test GetOrElse
  for (@m <- mCh){
    print!(["getOrElseSuccessful. Expected: 4. Got: ", m.getOrElse("b", "?")])|
    print!(["getOrElseFailed. Expected: ?. Got: ", m.getOrElse("d", "?")])
  }
  |

  // Test Set
  for (@m <- mCh){
    print!(["Test set. Expected {a: 3, b: 2, c: 5}. Got: ", m.set("b", 2)])
  }
  |

  // Test Keys
  for (@m <- mCh){
    print!(["Test keys. Expected Set(a, b, c)). Got: ", m.keys()])
  }
  |

  // Test Size
  for (@m <- mCh){
    print!(["Test size. Expected 3. Got: ", m.size()])
  }
}
```

What is the result of `{"years": 1, "weeks": 52, "days": 365}.get(52)`

- [ ] weeks
- [ ] years
- [ ] 52
- [x] Nil

To demonstrate the usefulness of maps in rholang, let's consider this contract that looks up the capital of any country (that I bothered to type).

```javascript
new capitalOf, print(`rho:io:stdout`) in {
  new mapCh in {

    // Use a persistent send instead of peeking later
    mapCh!!({"Canada": "Ottawa",
             "Nigeria": "Abuja",
             "Germany": "Berlin",
             "Antarctica": Nil,
             "China": "Beijing",
             "Ecuador": "Quito",
             "Australia": "Canberra"})
    |
    contract capitalOf(@country, return) = {
      for (@map <- mapCh) {
        return!(map.getOrElse(country, "I don't know"))
      }
    }
  }
  |
  new answerCh in {
    capitalOf!("Canada", *answerCh)|
    for (@cap <- answerCh) {
      print!("Capital of ${cntry} is ${cap}." %% {"cntry": "Canada", "cap": cap})
    }
  }
}
```

## Exercise

Starting from the example code above, make a Countries and Capitals quiz game where the user calls up a contract and get's back a challenge country as well as an answer channel. The user then sends her best guess for that country's capital back over the answer channel and gets back a boolean for whether she was correct.

To learn how to use this game interactively with a nice user interface, check out some dapp development examples such as the [nth caller game](https://github.com/JoshOrndorff/nth-caller-game)

## Exercise

Map's `diff` method takes another map as an argument. What happens if the diff map has some of the same keys but with different values associated. For example:

```
{"a": "A", "b": "B", "c": "C"}.diff({"a": 25})
```

## Method Summary Table

That was a lot of info about data structures in one go. So here is a handy table to remind you what methods exist. This info is also on the [cheat sheet](./cheat-sheet).

<div style='overflow-x:auto'>
  <table>
  <thead>
  <tr>
  <th>Method</th>
  <th>Tuple</th>
  <th>List</th>
  <th>Map</th>
  <th>Set</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>nth</td>
  <td>x</td>
  <td>x</td>
  <td></td>
  <td></td>
  </tr>
  <tr>
  <td>toByteArray</td>
  <td>x</td>
  <td>x</td>
  <td>x</td>
  <td>x</td>
  </tr>
  <tr>
  <td>union</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td>x</td>
  </tr>
  <tr>
  <td>diff</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td>x</td>
  </tr>
  <tr>
  <td>add</td>
  <td></td>
  <td></td>
  <td></td>
  <td>x</td>
  </tr>
  <tr>
  <td>delete</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td>x</td>
  </tr>
  <tr>
  <td>contains</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td>x</td>
  </tr>
  <tr>
  <td>get</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td></td>
  </tr>
  <tr>
  <td>getOrElse</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td></td>
  </tr>
  <tr>
  <td>set</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td></td>
  </tr>
  <tr>
  <td>keys</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td></td>
  </tr>
  <tr>
  <td>size</td>
  <td></td>
  <td></td>
  <td>x</td>
  <td>x</td>
  </tr>
  <tr>
  <td>length</td>
  <td></td>
  <td>x</td>
  <td></td>
  <td></td>
  </tr>
  <tr>
  <td>slice</td>
  <td></td>
  <td>x</td>
  <td></td>
  <td></td>
  </tr>
  </tbody>
  </table>
  </div>

## Sending and Receiving on Compound Names

We've learned about several interesting data structures in this lesson. Data structures are processes just like integers, booleans, and `Nil`. So they can be quoted and turned into names like all those other processes. We can build contracts on those names just like we can any other names. Names that are built on data structures such as tuples are often called compound names.

In this example, Alice and Bob each have one unforgeable name (that I've called key). The keys may be useful on their own (for things not shown in the snippet), but only when used together, can the contract shown be called. This is known as "rights amplification".

```javascript
new alice, bob, key1, key2, stdout(`rho:io:stdout`) in {

  alice!(*key1)|
  bob!(*key2)|

  contract @(*key1, *key2)(_) = {
    stdout!("Congratulations, Alice and Bob, you've cooperated.")
  }
}
```

What tuple is used to build the compound name in `contract @(*self, "getVal")(_) = { Nil }`?

- [ ] `self`
- [ ] `"getval"`
- [x] `(*self, "getVal")`
- [ ] `@(*self, "getVal")`
- [ ] `@"getVal"`

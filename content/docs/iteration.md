# Iteration
In the code below, we show an example of iterating through a list.

```javascript{numberLines: true}
  new iterate in {
    contract iterate(@list, process, done) = {
      match list {
        [hd, ...tl] => {
          new ack in {
            process!(hd, *ack) |
            for (_ <- ack) { iterate!(tl, *process, *done) }
          }
        }
        _ => done!(Nil)
      }
    } |
    new process, done in {
      iterate!([4,5,6], *process, *done) |
      contract process(@item, ack) = {
        /* handle processing of item */
        ack!(Nil)
      } |
      for (_ <- done) {
        /* done! */
        Nil
      }
    }
  }
```
3.) The `match` construction allows destructuring a variable through pattern matching.

4.) List patterns support matching the remainder of a list.  If `list` matches the pattern of a head/tail pair then we execute the main body of the loop.

5.) We create a channel for the item handler to notify us that it's done with the current item.

6.) We invoke the processor on the item and the acknowledgement channel.

7.) When we receive acknowledgement, we reinvoke the iterator on the tail.

10.) If the list is empty, we signal that the processing is complete.

14.) We invoke the iterator.

15-18) This `contract` gets invoked for each item in the list.  On line 17, we tell the iterator that we're done with this item.

19.) This `for` contains the code that should be executed when the interaction is complete.

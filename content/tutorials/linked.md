# Linked List
We can build a cons cell in much the same way. We need a channel for the value and a channel for the next pointer and a channel for the nil.

```javascript
⟦nil⟧( value, next, nil ) = nil!( 0 )
⟦a:l⟧( value, next, nil ) = value!( ⟦a⟧( value, next, nil ) ) | next!( ⟦l⟧( value, next, nil ) )
```

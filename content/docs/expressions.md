# Expressions
An Expression or mathematical expression is a finite combination of symbols that is well-formed according to rules that depend on the context. 
Expressions are special because they are evaluated before sending the result to a channel. 

The following operators are used for building expressions:

## Arithmetic operators
The supported arithmetic operators are: `+`, `-`, `/`, `*`.

## Relational operators
The supported relational operators are: `>`, `>=`, `<`, `<=', `==`, `!=`.

## Logical operators
The supported logical operators are: `and`, `or`, `not`.

## Matches expression
The `p matches q` expression is similar to  
```javascript
match p {
  q -> true
  _ -> false
}
```
The difference between `matches` and the above is that the former is an expression.

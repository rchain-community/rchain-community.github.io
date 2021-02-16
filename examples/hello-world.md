---
title: Hello World Example
filepath: hello-world.rho
filetype: vue
order: 1
---

```javascript
new helloworld, stdout(`rho:io:stdout`) in {
  contract helloworld( world ) = {
    for( @msg <- world )
    { stdout!(msg) }
  }

  | new world, world2 in {
      helloworld!(*world)
    | world!("Hello World")
    | helloworld!(*world2)
    | world2!("Hello World again")
    }
  }

```

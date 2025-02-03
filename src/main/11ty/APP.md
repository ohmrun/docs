# APP  
`stx.nano.APP<P,R>` Is used for injecting constructors  

## Implicit return type acceptance  

Either you can use the available [wildcard](Wildcard.md).  

```haxe  
  __.reject(__.fault().of('err'));
```
Internally, the above calls `ARR.fromR`

## Injecting Constructor or Type

Or  the lambda is called with some type P, in this case `stx.nano.Fault`
```haxe
  __.reject(f -> f.of('err'))
``` 
  
Internally, `__.reject` uses it's hidden second `haxe.PosInfos` parameter to generate a `stx.nano.Fault` and call the supplied lambda with it.
# Projection

a Projection is a way of describing a particular way of writing a Haxe module that looks like the following:

`XDef` - a typedef  
`XApi` - an interface  
`XSum` - an enum  

If the base is an `XDef`, it'll also contain an `XCls` with a partial or complete implementaion

`X` would be the `abstract` over the base, complete with constructors and `@:from` functions

`XLift` would contain all of the homomorphic or catamorphic functions of `X`,  
accessed through an instance normally, or for applicative style via `X.__.fn(self:X,...)`;

`XCtr` if it exists is a set of constuctors of `X`  
`XArg` if it exists is an abstract over an enum of `XArgSum` which describes all possible constructor arguments together coupled with `@:from` functions to allow their implicit use.


# Fluent Interfaces

Monad instances and Arrowlets gain a lot of their functionality through keeping the type stable through a chain of functions.

Type unification in Haxe is quite literal and so the solution used here is to create an abstract to which all subtypes conform for compositional use.

A `SomethingApi` wrapped by a `Something` abstract class will often have a declaration in the interface like so:

```haxe
  public function toSomething():Something
```

This function should not need to be called where constructors are avaliable in the abstract type declaration but if introducing a new member which is an implementation of `SomethingApi` it would often be necessary to call `toSomething` so the type system behaves correctly
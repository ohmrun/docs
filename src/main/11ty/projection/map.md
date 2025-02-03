# Map

`map` is a function which takes any generic `X<T>` and transforms `T` to `TT` via a lambda function.

Here is a possible map for `Option`.

```haxe
static public function map<T, TT>(self: OptionSum<T>,f: T -> TT):Option<TT> {
  return switch(self){
    case Some(v)  : Some(f(v));
    case None     : None; 
  }
}
```

It is a homomorphic function in the sense that it takes an `Option` and returns an `Option`.
# stx.nano.Wildcard

## Usage
`Wildcard` along with [static extensions](https://haxe.org/manual/lf-static-extension.html) produces a floating global accessor available everywhere it's constructor is imported.

```haxe
using stx.Nano;
using LiftSomething;

class LiftSomething{
  static public function make_option<T>(wildcard:Wildcard,?v:T):Option<T>{
    return v == null ? None : Some(v);
  }
  static function main(){
    var val     = __.make_option(1);
    var nothing = __.make_option(null);
  }
}
```

## Wildcard Constructors

## Library Modules

In general, each stx library has a wildcard constructor of `xxx` where `stx_xxx` is the name of the library

```haxe
__.test()//stx_test
__.assert()//stx_assert
```

Although some of the more high falutin' libraries (stx_coroutine, stx_proxy) connect their constructors directly.  

```haxe
  //stx.Proxy
  __.await(a,b -> null);
  __.yield(y,x -> null);
  __.belay(ft);
  __.ended(r)
  //stx.Coroutine
  __.wait(f -> null);
  __.emit(1,x);
  __.hold(ft);
  __.term(r);
```
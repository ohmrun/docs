# Conventions

## Constructors

### Unit 
#### `() -> T`
#### Constructor with no parameters  

If there is a way of constructing a type with no parameters, it will have a `unit` constructor.

```haxe
@:noUsing static public function unit():Type;
```

### Pure 
#### `T -> F<T>`
#### Generic constructor

If a type has an unbounded generic type, there will be `pure` constuctor

```haxe
@:noUsing static public function pure<T>(t:T):F<T>
```

### Lift
#### Lift a type to it's abstract representation  

If a type is an `abstract`, it will have a `lift` constructor

```haxe
typedef TypeDef = {};
abstract Type(TypeDef) from TypeDef{
  @:noUsing static public function lift(self:Typedef):Type{
    return (self:Type);
  }
}
```

### Prj
#### Get an underlying type

To return an `abstract` to it's underlying type, use `prj`

```haxe
abstract SomeString(String){
  public function prj():String;
}
```

### Self
#### Get published type.

For use from within an abstract,provides the `this` value as it's externally available type.

```haxe
abstract SomeString(String){
  private var self(get,never):SomeString;
  private function get_self():SomeString return lift(this);
}
```

### Make
#### Default constructor static function

Rather than name all possible constructor static functions, the convention is to make a fully open constructor `make` and use the roman numeral scheme
`makeI`, `makeII` for unnamed constructors

### fromFunXX
#### Function to type Naming Conventions  

If a type can be constructed from a function, the convention is:

```haxe
  static public function fromFunXX(self:Void->Void);
  static public function fromFunXR<R>(self:Void->R);
  static public function fromFunPR<R,R>(self:P->R);
  static public function fromFunPX<P>(self:P->Void);
  static public function fromFunTypeR<R>(self:Type->R);
```


### Applicative style

Abstract types have an underscore accessor that allows access to the applicative version of their instance functions.

```haxe
  using stx.Fn;

  function react(){
    final arrI : Cluster<Int>   = [1,2,3,4];
    final arrII                 = arrI.map(x -> x + 1);

    final fnI                   = Cluster._.map.bind(_,x -> x * 10).fn();
    final fnII                  = Cluster._.map.bind(_,x -> x + 99).fn();
    final fnIII                 = fnI.then(fnII);

    final arrIII                = fnIII(arrII);
  }
```

### Type Naming Conventions
#### suffixes

`Api`   -> `interface`
```haxe
  interface XApi{}
```  
`Cls`   -> `class`  
```haxe
  class XCls{}
```  
`Sum`   -> `enum`  
```haxe
  enum XSum{}
```  

`Def`   -> `typedef`  
```haxe
  typedef XDef = {}
```  

### Generic Parameter Naming Conventions

  `P` -> parameter  
  `O` -> intermediate result  
  `R` -> final result  
  `E` -> error type  

(this does not apply to `stx_proxy`)

####
  Parameters are enumerated via roman numerals
  
```haxe
  function zip<Pi,Pii>(self:Option<Pi>,that:Option<Pi,Pii>):Option<Couple<Pi,Pii>>
```
### Function Naming Conventions

see [here]() for `stx.Fn` docs.

#### `Void->Void`
```haxe
typedef Block = Void->Void
interface ReactApi{
  public function react():Void;
}
```

#### `P -> Void`
```haxe
typedef Sink<P>  = P -> Void;
interface SpendApi<P>{
  public function spend(p:P):Void;
}
```

#### `Void -> R`
```haxe
typedef Thunk<R> = Void -> R;
interface ReplyApi<R>{
  public function reply():R;
}
```

#### `P -> R`
```haxe
typedef Unary<P,R> = P -> R;
interface ApplyApi<P,R>{
  public function apply(p:P):R;
}
```

#### `Pi -> Pii -> R`
```haxe
typedef Binary<Pi,Pii,R> = Pi -> Pii -> R;
interface ComplyApi<Pi,Pii,R>{
  public function comply(pI:Pi,pII:Pii):R;
}
```
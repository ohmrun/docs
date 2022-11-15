# Functions and Coroutines

Functions, so far as practise goes, map one value space to another. Sometimes the return value space is well defined, other times not so much, especially where the temporality of values means that the inputs of a function may not be ready immediately.

Coroutines allow a function to interrogate the caller, asking for values rather than returning a result.

In many languages the answer is `await` and `yield` which Haxe doesn't presently have.

## Async Await

Say I have `async` `await` and I want three bytes and to close a stream before adding the values together


Say `get_byte` returns a `Future<Int>`, and `done` returns a `Future<Noise>` when the stream is closed.
```haxe
  final i8I     : Int   = await get_byte();
  final i8II    : Int   = await get_byte();
  final i8III   : Int   = await get_byte();
  final done            = await close();
  final value           = i8I + i8II + i*i8III;

```

In order to handle `value`, the type and expressions of the function need to be completely rewritten, everything after done being a handler zipping the implicit Futures together and producing a callback handler like:

```haxe
final make_value = (i,ii,iii) -> i + ii + iiii;
//--------------------------------------------------------v callback
final curried : Int -> (Int -> (Int -> (Noise -> Void)) -> (Int->Void) -> Void)
    = (i:Int) -> {
        return (ii:Int) -> {
          return (iii:Int) -> {
            return (_:Noise) -> {
              //make sure pipe closed, even though no value produced
              return (cb:Int->Void) -> cb(make_value(i,ii,iii));
            }
          }
        }
      }
```
The application looks a little like this, and satisfies a simple type description.

```haxe 
  //assuming Future._.zip(a,b) produces Future<Couple<A,B>>
  //decouple takes a (l,r) -> z function and produces a Couple<L,R> -> Z function.

  final continuation : (Int -> Void) -> Void = 
    i8I.zip(Future.lazy(curried)).map(__.decouple(i,curry) -> curry(i))
       .zip(i8II).map(__.decouple((ii,curry) -> curry(ii)))
       .zip(i8III).map(__.decouple((iii,curry) -> curry(iii)))
       .zip(done).map(__.decouple((done,curry) -> curry(done)));
  
```

Whole program rewriting makes function composition, and therefore code reuse difficult for any language that doesn't have type constructors of some kind.

The simple minded answer looks like the following:

```haxe
enum CoroutineSum<I,O,R,E>{
  Emit(o:O,next:Coroutine<I,O,R,E>);//Emit value of type O and return next part of coroutine
  Wait(tran:Transmission<I,O,R,E>);//Wait for value of type I and return next part of coroutine
  Hold(held:Held<I,O,R,E>);//Hold this value for waiting on an event or thread coordination.
  Halt(r:Return<R,E>);//done, or an error
}

The other half of my Haxe/Blub solution are enumerations of the generic parameters which I build manually.

for example:

```haxe
  enum InputRequestSum{
  /**Request State**/
  IReqState;
  /**Calls readAll under the hood, so won't return until exit.**/
  IReqTotal(?buffer_size:Int);
  /**Request Typed Value**/
  IReqValue(bs:ByteSize);
  /**Request Bytes**/
  IReqBytes(pos:Int,len:Int);
  IReqClose;
}
```

While this doesn't give you the ability to request by assigning variables and then waving your magic wand,
you **can** *compose* your coroutines to deal with the same situation in such a way as you can draw your basis for composition closer to your design than with async/await.

Here's the response type.

```haxe
enum InputResponse{
  IResValue(packet:Packet);
  IResBytes(b:Bytes,?type:Option<ByteSize>);
  IResStarved;
  IResState(state:InputState);
}
```

Here's the Haxe version of the above

```haxe
  function get_byte(res:InputResponse){
    return switch(res){
      case IResValue(x) if (x.type == I8) : __.prod(x.data);
      default                             : __.term(__.fault().of(IncorrectType));
    }
  }
  function get_closed(res:InputResponse,data){
    return switch(res){
      case IResState(Io_Input_Closed(None,_))         : __.prod(data);
      case IResState(Io_Input_Closed(Some(error),_))  : __.term(error);//some error, terminate.
      default                                         : 
        //not closed, keep asking. Touch more logic if you want to implement attempts
      __.wait(get_closed);
    }
  }
  final coroutine : Coroutine<InputResponse,Blocked,Int>= __.wait(get_byte).flat_map(
    (i:Int) -> __.wait(get_byte).flat_map(
      (ii:Int) -> __.wait(get_byte).flat_map(
        (iii:Int) -> get_closed.bind(_,make_value(i,ii,iii))
      )
    )
  );
```

You can drive the above coroutine with anything that can generate an `InputResponse`, so a synchronous or asynchronous version of `stdin` would do.
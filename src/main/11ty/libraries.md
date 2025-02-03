# Libraries

Stx libraries are imported via `using`.

If the library name is `stx_$x`, you can use `using stx.$x`;

Sometimes libraries will have types that aliase types in the `stx` namespace, or internal representations not needed for general usage, in which case they will have a type `stx.$x.Core`, eg: `using stx.proxy.Core`
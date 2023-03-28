# Fold

`fold` in stx refers to a catamorphism and should be on any `enum` based type. 

It allows you to handle any branch of the case to transform whatever value is inside.

Because the shape is different for every type, no interface can be written, but it should always be in a [projection](projection.md)

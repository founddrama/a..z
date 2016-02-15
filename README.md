# a..z

**`a..z`** is a tiny, self-contained JavaScript library for generating ranges of
~~letters~~ _characters_. Give it the start and end characters, and it spits out
that range, as an array.

`a..z` has one exported function: `range`.

### API

**range** `a..z.range(alpha, omega, stepFn)`

Produces a `range` (an `Array`) starting with the character `alpha` and ending
with `omega`. Optionally provide `stepFn` to alter the intervals between the
letters in the produced `range`. If you provide a `stepFn`, it takes a single
argument which is a `Number` and returns a `Number`.

#### Examples

In [Node](http://nodejs.org/), just require `a..z`:

    var a..z = require('a..z');

Give it a single letter, and get that letter back out:

    a..z.range('a');
    //=> ['a']

Give it a start an end letter, and you get all the letters in between:

    a..z.range('a', 'd');
    //=> ['a', 'b', 'c', 'd']

Want the letters reversed? Just give them reversed:

    a..z.range('Z', 'W');
    //=> ['Z', 'Y', 'X', 'W']

Give code points and get those characters out:

    a..z.range(91, 94);
    //=> ['[', '\\', ']', '^']

Provide a step function as a third argument to skip letters:

    a..z.range('A', 'J', function(c) { return x + 3; });
    //=> ['A', 'D', 'G', 'J']

Or get really crazy:

    a..z.range('A', 'B', (function() {
      var n = 0;
      
      return function(c) {
        if (n < 1) {
          n += 1;
          return c;
        } else {
          n = 0;
          return c + 1;
        }
      };
    }()));
    //=> [ 'a', 'a', 'b', 'b' ];

There's also a little `..` notation for creating the ranges, if you're into that
sort of thing:

    a..z.range('a..d');
    //=> ['a', 'b', 'c', 'd']
    a..z.range('a..<d');
    //=> ['a', 'b', 'c']

### Tests!

`a..z` has a bunch of [nodeunit](https://github.com/caolan/nodeunit) tests. You can run them:

    npm install && grunt nodeunit:all

(BTW: If you haven't already, you should have [Grunt](http://gruntjs.com/)
installed globally: `npm install -g grunt-cli`)

### License

`a..z` is available for use under the [MIT software license](http://opensource.org/licenses/MIT).
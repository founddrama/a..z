/*jshint node:true */
var a_z  = require('../main');

var ARITY_ERROR_MESSAGE = 'You must supply at least 1 argument to #range';
var _1st_ARG_TYPE_ERROR = '1st argument to #range was an invalid type.';
var _2nd_ARG_TYPE_ERROR = '2nd argument to #range was an invalid type.';
var everyOtherFn        = function(n) { return n + 2; };

module.exports = {
  
  'Basic test: "A" to "Z" gives back all letters A-Z.' : function(test) {
    var alphabet = a_z.range('A', 'Z');
    
    test.expect(2);
    test.deepEqual(alphabet, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
      'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    test.equal(alphabet.length, 26);
    test.done();
  },
  
  'Partial range: "E" to "H" gives back all letters E-H.' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('E', 'H'), ['E', 'F', 'G', 'H']);
    test.done();
  },
  
  'Reversed: give letters "Q" to "L" gives back all letters "L" to "Q" but reversed.' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('Q', 'L'), ['Q', 'P', 'O', 'N', 'M', 'L']);
    test.done();
  },
  
  'CharCodes: numbers 512 to 514 gives back characters "\u0200" to "\u0202".' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range(512, 514), ['\u0200', '\u0201', '\u0202']); // ['Ȁ', 'ȁ', 'Ȃ']
    test.done();
  },
  
  'One argument: giving one argument to getRange returns that character in an array.' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('A'), ['A']);
    test.done();
  },
  
  'One argument: but that single argument is just an empty string and we throw an error.' : function(test) {
    test.expect(1);
    test.throws(function() { a_z.range(''); }, ARITY_ERROR_MESSAGE);
    test.done();
  },
  
  'Throw an error when the 1st argument is the wrong type.' : function(test) {
    test.expect(7);
    test.throws(function() { a_z.range(['A','r','r','a','y']); }, _1st_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range({'o':'b','j':'e','c':'t'}); }, _1st_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range(undefined); }, ARITY_ERROR_MESSAGE);
    test.throws(function() { a_z.range(null); }, ARITY_ERROR_MESSAGE);
    test.throws(function() { a_z.range(function(){}); }, _1st_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range(/regex/); }, _1st_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range(-1); }, _1st_ARG_TYPE_ERROR);
    test.done();
  },
  
  'Throw an error when the 2nd argument is the wrong type.' : function(test) {
    test.expect(7);
    test.throws(function() { a_z.range('A', ['A','r','r','a','y']); }, _2nd_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range('A', {'o':'b','j':'e','c':'t'}); }, _2nd_ARG_TYPE_ERROR);
    test.doesNotThrow(function() { a_z.range('A', undefined); }, _2nd_ARG_TYPE_ERROR);
    test.doesNotThrow(function() { a_z.range('A', null); }, _2nd_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range('A', function() {}); }, _2nd_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range('A', /regex/); }, _2nd_ARG_TYPE_ERROR);
    test.throws(function() { a_z.range('A', -1); }, _1st_ARG_TYPE_ERROR);
    test.done();
  },
  
  'ArityError: you must supply 2 arguments to #range.' : function(test) {
    test.expect(5);
    test.throws(function() { a_z.range(); }, ARITY_ERROR_MESSAGE);
    test.throws(function() { a_z.range(undefined); }, ARITY_ERROR_MESSAGE);
    test.throws(function() { a_z.range(null); }, ARITY_ERROR_MESSAGE);
    test.doesNotThrow(function() { a_z.range(0); });
    test.doesNotThrow(function() { a_z.range(0, 0); });
    test.done();
  },
  
  'Step Functions: given "A" to "Z", but every other letter.' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('A', 'Z', everyOtherFn), ['A', 'C', 'E', 'G', 'I',
      'K', 'M', 'O', 'Q', 'S', 'U', 'W', 'Y']);
    test.done();
  },
  
  'Providing a "whole string" as an argument just uses the first letter.' : function(test) {
    test.expect(3);
    test.deepEqual(a_z.range('foo', 'bar'), ['f', 'e', 'd', 'c', 'b']);
    test.deepEqual(a_z.range('shenanigans'), ['s']);
    test.deepEqual(a_z.range('x', 'zookeeper'), ['x', 'y', 'z']);
    test.done();
  },

  'Range DSL: "a..d" should give back letters "a" through "d".' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('a..d'), ['a', 'b', 'c', 'd']);
    test.done();
  },

  'Range DSL: "a..<d" should give back letters "a" through "c".' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('a..<d'), ['a', 'b', 'c']);
    test.done();
  },

  'Range DSL: "a..h" with a stepFn to skip every other letter.' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('a..h', everyOtherFn), ['a', 'c', 'e', 'g']);
    test.done();
  },

  'Range DSL: "a..<h" with a stepFn to skip every other letter.' : function(test) {
    test.expect(1);
    test.deepEqual(a_z.range('a..<h', everyOtherFn), ['a', 'c', 'e', 'g']);
    test.done();
  },

  'Range DSL: ignore the 2nd argument if it is not a function.' : function(test) {
    test.expect(7);
    test.deepEqual(a_z.range('a..d', 'e..f'), ['a', 'b', 'c', 'd']);
    test.deepEqual(a_z.range('a..<d', 'e..f'), ['a', 'b', 'c']);
    test.deepEqual(a_z.range('a..d', 2), ['a', 'b', 'c', 'd']);
    test.deepEqual(a_z.range('a..d', null), ['a', 'b', 'c', 'd']);
    test.deepEqual(a_z.range('a..d', []), ['a', 'b', 'c', 'd']);
    test.deepEqual(a_z.range('a..d', {}), ['a', 'b', 'c', 'd']);
    test.deepEqual(a_z.range('a..d', /foo/), ['a', 'b', 'c', 'd']);
    test.done();
  },

  'Range DSL: only process the first range in a string that looks like it contains multiple ranges.' : function(test) {
    test.expect(3);
    test.deepEqual(a_z.range('a..d..f'), ['a', 'b', 'c', 'd']);
    test.deepEqual(a_z.range('a..d..f..z'), ['a', 'b', 'c', 'd']);
    test.deepEqual(a_z.range('a..<d..f'), ['a', 'b', 'c']);
    test.done();
  }
};
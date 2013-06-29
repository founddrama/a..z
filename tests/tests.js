var a2z = require('../main');

exports['Basic test: "A" to "Z" gives back all letters A-Z.'] = function(test) {
  test.expect(1);
  test.deepEqual(a2z.range('A', 'Z'), ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
  test.done();
};

exports['Partial range: "E" to "H" gives back all letters E-H.'] = function(test) {
  test.expect(1);
  test.deepEqual(a2z.range('E', 'H'), ['E', 'F', 'G', 'H']);
  test.done();
};

exports['Reversed: give letters "Q" to "L" gives back all letters "L" to "Q" but reversed.'] = function(test) {
  test.expect(1);
  test.deepEqual(a2z.range('Q', 'L'), ['Q', 'P', 'O', 'N', 'M', 'L']);
  test.done();
};

exports['CharCodes: numbers 512 to 514 gives back characters "\u0200" to "\u0202".'] = function(test) {
  test.expect(1);
  test.deepEqual(a2z.range(512, 514), ['\u0200', '\u0201', '\u0202']); // ['Ȁ', 'ȁ', 'Ȃ']
  test.done();
}

exports['One argument: giving one argument to getRange returns that character in an array.'] = function(test) {
  test.expect(1);
  test.deepEqual(a2z.range('A'), ['A']);
  test.done();
};

exports['ArityError: you must supply 2 arguments to getRange'] = function(test) {
  test.expect(3);
  test.throws(function() { a2z.range(); }, 'You must supply at least 1 argument to getRange.');
  test.doesNotThrow(function() { a2z.range(0); });
  test.doesNotThrow(function() { a2z.range(0, 0); });
  test.done();
}

exports['Step Functions: given "A" to "Z", but every other letter.'] = function(test) {
  test.expect(1);
  test.deepEqual(a2z.range('A', 'Z', function(n) { return n + 2; }), ['A', 'C', 'E', 'G', 'I',
    'K', 'M', 'O', 'Q', 'S', 'U', 'W', 'Y']);
  test.done();
};
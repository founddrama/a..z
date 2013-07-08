/*jshint curly:false, eqeqeq:false, node:true */
function truish(x) {
  return x || x === 0;
}

function validateArgument(x) {
  switch (typeof x) {
    case 'string':
      return true;
    case 'number':
      return x >= 0;
    default:
      return false;
  }
}

function ArityError(message) {
  this.message = message || this.message;
}
ArityError.prototype = new Error();

function getCharCode(c) {
  return typeof c == 'number' ? parseInt(c, 10) : c.charCodeAt(0);
}

/**
 * @param alpha {String|Number} REQUIRED A string or number. If a character,
 * that is the starting character for our range; if a number, that is the
 * starting code point for our range. Anything else throws a TypeError.
 * @param omega {String|Number} OPTIONAL See 'alpha' for requirements. If the
 * character code for 'omega' is less than 'alpha', the range returned is in
 * reverse order.
 * @param stepFn {Function} OPTIONAL A function to determine how to advance
 * through the range.
 * @return range
 */
function getRange(alpha, omega, stepFn) {
  if (!truish(alpha)) {
    throw new ArityError('You must supply at least 1 argument to #range.');
  }
  
  if (!validateArgument(alpha)) throw new TypeError('1st argument to #range was an invalid type.');
    
  omega = truish(omega) ? omega : alpha;

  if (!validateArgument(omega)) throw new TypeError('2nd argument to #range was an invalid type.');
  
  stepFn = typeof stepFn == 'function' ? stepFn : function(n) { return n + 1; };
  
  var range = [];
  var alphaN = getCharCode(alpha);
  var omegaN = getCharCode(omega);
  var reverse = omegaN < alphaN;
  var a = reverse ? omegaN : alphaN;
  var z = reverse ? alphaN : omegaN;
  
  while (a < z + 1) {
    range = range.concat(String.fromCharCode(a));
    a = stepFn(a);
  }
  
  return reverse ? range.reverse() : range;
}

exports.range = getRange;
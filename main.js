function truish(x) {
  return x || x === 0;
}

function ArityError(message) {
  this.message = message || this.message;
}
ArityError.prototype = new Error();
ArityError.prototype.message = 'The incorrect number of arguments were supplied.';

function getCharCode(c) {
  return typeof c == 'number' ? c : c.charCodeAt();
}

// not esp. useful - just gets the hex
// w/o actually returning the escape
function charCodeToUtf8(c) {
  c = getCharCode(c);
  return c.toString(16);
}

function getRange(alpha, omega, stepFn) {
  if (!truish(alpha)) {
    throw new ArityError('You must supply at least 1 argument to getRange.');
  }
  
  omega = omega || alpha;
  stepFn = typeof stepFn == 'function' ? stepFn : function(n) { return n + 1; }
  
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
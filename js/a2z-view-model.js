/*globals console:true, ko:true */
/*jshint curly:false, evil:true, newcap:false */
function a2zViewModel() {
  var self              = this,
      rx                = new RegExp('^a2z\\.range\\([\\w\\W]+\\);?$'),
      DEFAULT_RANGE_SRC = "a2z.range('a', 'z', function(c) {\n  return c + 2\n})",
      JOIN_TOKEN        = ', ';

  function _out(range) {
    return range.join(JOIN_TOKEN);
  }

  self.a2zSource = ko.observable(DEFAULT_RANGE_SRC);

  self.a2zOut = ko.computed(function() {
    var range;

    try {
      range = self.a2zSource();
      if (rx.test(range.trim())) range = eval(range);
      else throw new Error('a2zSource does not look like a proper a2z.range call - is someone up to no good?');

      return _out(range);
    } catch (e) {
      if (console && console.warn) {
        console.warn(e.message);
      }

      return '<em>Typing...</em>';
    }
  });

  self.outputStatus = ko.computed(function() {
    try {
      var range = self.a2zSource();
      if (rx.test(range.trim())) range = eval(range);
      return 'panel-success';
    } catch (e) {
      return 'panel-danger';
    }
  });
}

ko.applyBindings(new a2zViewModel());
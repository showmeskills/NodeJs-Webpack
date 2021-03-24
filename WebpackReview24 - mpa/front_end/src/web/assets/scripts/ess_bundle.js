System.register([], function (_export, _context) {
  "use strict";

  var Persen;
  return {
    setters: [],
    execute: function () {
      Persen = class Persen {
        constructor() {}

        fn() {
          console.log(' ====>>>>', 'es module !!!');
        }

      };

      _export("default", Persen);
    }
  };
});

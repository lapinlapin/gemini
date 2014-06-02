'use strict';

var util = require('util'),
    inherit = require('inherit');

module.exports = inherit({
    __constructor: function(selector, wdElement) {
        this.selector = selector;
        this._wdElement = wdElement;
    },

    toString: function() {
        return util.format('[object Element(selector=\'%s\')]', this.selector);
    }
});

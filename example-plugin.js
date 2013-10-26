(function() {
    "use strict";
    /*jslint browser: true */
    /*jslint plusplus: true */
    $.fn.fontColor = function(color) {
        var i,
            k = this.length;
        color = color || 'maroon';
        for (i = 0; i < k; i++) {
            this[i].style.color = color;
        }
        return this;
    };
}());

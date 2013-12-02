(function() {
    "use strict";
    /*jslint browser:true, plusplus:true*/
    /*global $*/
    var init;

    init = function() {
        $(window).on ('hashchange', function() {
            var id = window.location.hash.replace(/^#/, ''),
                pages = $('div[data-role="page"]');
            if (!document.getElementById(id)) {
                return false;
            }
            pages.each(function() {
                if (this.id === id) {
                    this.style.display = 'block';
                    document.title = $('#' + id + ' div[data-role="header"] h1').html();
                } else {
                    this.style.display = 'none';
                }
            });
        });
        var pages = $('div[data-role="page"]'),
            id = window.location.hash.replace(/^#/, '');
        pages.each(function() {
            this.style.display = 'none';
        });
        if (id) {
            document.title = $('#' + id + ' div[data-role="header"] h1').html();
            document.getElementById(id).style.display = 'block';
        } else {
            $.mobile.changePage(pages.get(0).id);
        }
    };

    $.fn.hashchange = function(handler, eventName) {
        this.on('hashchange', handler, eventName);
        return this;
    };

    $.mobile = {

        changePage : function(id) {
            window.location.hash = id;
        }
    };

    init();

}(document, window));

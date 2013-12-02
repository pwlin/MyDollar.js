(function() {
    "use strict";
    /*jslint browser:true, plusplus:true*/
    /*global $*/
    var loaded = false,
        init,
        onHashChange;

    init = function() {
        if (loaded === true) {
            return;
        }
        loaded = true;
        var pages = $('div[data-role="page"]'),
            id = window.location.hash.replace(/^#/, '');
        onHashChange(pages);
        pages.each(function() {
            this.style.display = 'none';
        });
        if (!id || !document.getElementById(id)) {
            id = pages.get(0).id;
        }
        $.mobile.changePage('#');
        setTimeout(function() { document.location.replace('#' + id); }, 1);
    };

    onHashChange = function(pages) {
        $(window).on('hashchange', function() {
            var id = window.location.hash.replace(/^#/, '');
            if (!id || !document.getElementById(id)) {
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
    };

    $.fn.hashchange = function(handler, eventName) {
        this.on('hashchange', handler, eventName);
        return this;
    };

    $.mobile = {
        changePage : function(id) {
            window.location.hash = id;
        },

        init : function() {
            init();
        }
    };

}(document, window));

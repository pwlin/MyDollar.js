(function() {
    "use strict";
    /*jslint browser:true, plusplus:true*/
    /*global $*/
    var mainContainer,
        currentPage = null,
        historyState = [];
    
    $.fn.hashchange = function(handler, eventName) {
        this.on('hashchange', handler, eventName);
        return this;
    };
    
    $.mobile = {

        changePage : function(el, id, handler) {
            $.log(el, id, handler, 'change page');
        },

        slidePage : function(page) {
            var l = historyState.length,
            state = window.location.hash;
            if (l === 0) {
                historyState.push(state);
                this.slidePageFrom(page);
                return;
            }
            if (state === historyState[l - 2]) {
                historyState.pop();
                this.slidePageFrom(page);
            } else if (state === '') {
                historyState.push(state);
                this.slidePageFrom(page);
            } else {
                historyState.push(state);
                this.slidePageFrom(page);
            }
        },
        
        slidePageFrom : function(page, from) {
            mainContainer.append(page);

            page = $('#' + page.id);
            
    
            if (!currentPage || !from) {
                page.attr("class", "page center");
                currentPage = page;
                return;
            }
    
            // Position the page at the starting position of the animation
            page.attr("class", "page " + from);
    
            currentPage.one('webkitTransitionEnd', function(e) {
                $(e.target).remove();
            });
    
            // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            mainContainer[0].offsetWidth;
    
            // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
            page.attr("class", "page transition center");
            currentPage.attr("class", "page transition " + (from === "left" ? "right" : "left"));
            currentPage = page;    
        }

    };

    mainContainer = $('div[data-role="main-container"]'); 

}(document, window));

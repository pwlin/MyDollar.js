var MyDollar, $;
(function() {
    "use strict";
    /*jslint browser: true */
    /*jslint plusplus: true */
    /*jslint todo: true */
    /*global console */
    var getType,
        arrayUnique,
        arrayRemoveElement,
        isEmptyObject,
        myEventListeners,
        MyRealDollar;

    getType = function(mix) {
        return Object.prototype.toString.call(mix);
    };

    arrayUnique = function(arr) {
        return arr.filter(function(elem, pos, self) {
            return self.indexOf(elem) === pos;
        });
    };

    arrayRemoveElement = function(arr, key) {
        return arr.filter(function(i) {
            return i !== key;
        });
    };

    isEmptyObject = function(obj) {
        return Object.keys(obj).length === 0;
    };

    myEventListeners = {};

    MyDollar = $ = function(selector) {
        return new MyRealDollar(selector);
    };

    MyRealDollar = function(selector) {
        var selectorType = getType(selector),
            nodes,
            i,
            k;
        if (selectorType === '[object HTMLDocument]') {
            selector = 'body';
        }
        nodes = document.querySelectorAll(selector);
        k = nodes.length;
        for (i = 0; i < k; i++) {
            this[i] = nodes[i];
        }
        this.length = nodes.length;
        this.nodeType = getType(nodes[0]);
        return this;
    };

    MyDollar.fn = MyRealDollar.prototype = {

        ready : function(callback) {
            if (this.nodeType === '[object HTMLBodyElement]') {
                document.addEventListener('DOMContentLoaded', callback, false);
            }
            return this;
        },

        on : function(event, callback, eventName) {
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                if (eventName === undefined) {
                    this[i].addEventListener(event, callback);
                } else {
                    this[i].removeEventListener(event, myEventListeners[eventName + '-' + i]);
                    delete myEventListeners[eventName + '-' + i];
                    myEventListeners[eventName + '-' + i] = callback;
                    this[i].addEventListener(event, myEventListeners[eventName + '-' + i]);
                }
            }
            return this;
        },

        off : function (event, eventName) {
            var i,
                k = this.length;
            if (eventName !== undefined) {
                for (i = 0; i < k; i++) {
                    this[i].removeEventListener(event, myEventListeners[eventName + '-' + i]);
                    delete myEventListeners[eventName + '-' + i];
                }
            }
            return this;
        },

        attr : function(mix, value) {
            var i,
                k = this.length,
                prop,
                ret = null,
                mixType = getType(mix);
            if (value === undefined && mixType !== '[object Object]') {
                ret = this[0].getAttribute(mix) || '';
            } else {
                if (mixType === '[object Object]') {
                    for (i = 0; i < k; i++) {
                        for (prop in mix) {
                            if (mix.hasOwnProperty(prop)) {
                                this[i].setAttribute(prop, mix[prop]);
                            }
                        }
                    }
                } else {
                    for (i = 0; i < k; i++) {
                        this[i].setAttribute(mix, value);
                    }
                }
            }
            return ret !== null ? ret : this;
        },
        removeAttr : function(mix) {
            var i,
                k = this.length,
                x,
                y;
            if (getType(mix) === '[object Array]') {
                for (i = 0; i < k; i++) {
                    y = mix.length;
                    for (x = 0; x < y; x++) {
                        this[i].removeAttribute(mix[x]);
                    }
                }
            } else {
                for (i = 0; i < k; i++) {
                    this[i].removeAttribute(mix);
                }
            }
            return this;
        },

        hasClass : function(className) {
            var i,
                k = this.length,
                x,
                y,
                nodeClasses,
                ret = false;
            for (i = 0; i < k; i++) {
                nodeClasses = this[i].getAttribute('class');
                if (nodeClasses === null) {
                    break;
                } else {
                    nodeClasses = nodeClasses.split(' ');
                    y = nodeClasses.length;
                    for (x = 0; x < y; x++) {
                        if (nodeClasses[x] === className) {
                            ret = true;
                            break;
                        }
                    }
                }
                if (ret === true) {
                    break;
                }
            }
            return ret;
        },

        addClass : function(mix) {
            var i,
                k = this.length,
                x,
                y,
                m,
                n,
                mixed,
                originalClasses = [],
                originalClassesString = '',
                newClasses = [];
            for (i = 0; i < k; i++) {
                originalClassesString = this[i].getAttribute('class') || '';
                originalClasses = originalClassesString.split(' ');
                y = originalClasses.length;
                for (x = 0; x < y; x++) {
                    mixed = mix.split(' ');
                    n = mixed.length;
                    for (m = 0; m < n; m++) {
                        newClasses.push(mixed[m]);
                    }
                }
                newClasses = arrayUnique(originalClassesString.split(' ').concat(newClasses));
                this[0].setAttribute('class', $.trim(newClasses.join(' ')));
            }
            return this;
        },

        removeClass : function(mix) {
            var i,
                k = this.length,
                m,
                n,
                mixed,
                originalClasses = [],
                originalClassesString = '';
            for (i = 0; i < k; i++) {
                if (mix === undefined) {
                    this[i].removeAttribute('class');
                } else {
                    originalClassesString = this[i].getAttribute('class') || '';
                    originalClasses = originalClassesString.split(' ');
                    mixed = mix.split(' ');
                    n = mixed.length;
                    for (m = 0; m < n; m++) {
                        originalClasses = arrayRemoveElement(originalClasses, mixed[m]);
                    }
                    if (originalClasses.length > 0) {
                        this[0].setAttribute('class', $.trim(originalClasses.join(' ')));
                    } else {
                        this[i].removeAttribute('class');
                    }
                }
            }
            return this;
        },

        data : function(mix, value) {
            var i,
                k = this.length,
                prop,
                ret = null,
                mixType = getType(mix);
            if (mix === undefined) {
                ret = this[0].dataset;
            } else if (value === undefined && mixType !== '[object Object]') {
                ret = this[0].dataset[mix] || '';
            } else {
                for (i = 0; i < k; i++) {
                    if (mixType === '[object Object]') {
                        for (prop in mix) {
                            if (mix.hasOwnProperty(prop)) {
                                this[i].dataset[prop] = mix[prop];
                            }
                        }
                    } else {
                        this[i].dataset[mix] = value;
                    }
                }
            }
            return ret !== null ? ret : this;
        },

        removeData : function(mix) {
            var i,
                k = this.length,
                x,
                y,
                prop,
                mixed;
            for (i = 0; i < k; i++) {
                if (mix === undefined) {
                    for (prop in this[i].dataset) {
                        if (this[i].dataset.hasOwnProperty(prop)) {
                            delete this[i].dataset[prop];
                        }
                    }
                } else {
                    if (getType(mix) === '[object Array]') {
                        y = mix.length;
                        for (x = 0; x < y; x++) {
                            delete this[i].dataset[mix[x]];
                        }
                    } else {
                        mixed = mix.split(' ');
                        y = mixed.length;
                        for (x = 0; x < y; x++) {
                            delete this[i].dataset[mixed[x]];
                        }
                    }
                }
            }
            return this;
        },

        html : function(mix) {
            var i,
                k = this.length,
                ret = null,
                mixType = typeof mix;
            if (mix === undefined) {
                ret = this[0].innerHTML || '';
            } else if (mixType === 'function') {
                for (i = 0; i < k; i++) {
                    this[i].innerHTML = mix(i, this[i].innerHTML);
                }
            } else if (mixType === 'string') {
                for (i = 0; i < k; i++) {
                    this[i].innerHTML = mix;
                }
            }
            return ret !== null ? ret : this;
        },

        empty : function () {
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                while (this[i].lastChild) {
                    this[i].removeChild(this[i].lastChild);
                }
            }
            return this;
        },
        val : function (value) {
            var ret = null,
                i,
                k = this.length;
            if (value === undefined) {
                ret = this[0].value || '';
            } else {
                for (i = 0; i < k; i++) {
                    this[i].value = value;
                }
            }
            return ret !== null ? ret : this;
        },

        append : function(el) {
            var elIsHTMLObj = getType(el).substring(0, 12) === '[object HTML' ? true : false,
                elObj,
                i,
                k = this.length;
            for (i = 0; i < k; i++) {
                elObj = elIsHTMLObj === true ? el.cloneNode(true) : $.el('span', { 'html' : String(el) });
                this[i].appendChild(elObj);
            }
            return this;
        },

        prepend : function(el) {
            var elIsHTMLObj = getType(el).substring(0, 12) === '[object HTML' ? true : false,
                elObj,
                i,
                k = this.length;
            for (i = 0; i < k; i++) {
                elObj = elIsHTMLObj === true ? el.cloneNode(true) : $.el('span', { 'html' : String(el) });
                this[i].insertBefore(elObj, this[i].firstChild);
            }
            return this;
        },

        before : function(el) {
            var elIsHTMLObj = getType(el).substring(0, 12) === '[object HTML' ? true : false,
                elObj,
                i,
                k = this.length;
            for (i = 0; i < k; i++) {
                elObj = elIsHTMLObj === true ? el.cloneNode(true) : $.el('span', { 'html' : String(el) });
                this[i].parentNode.insertBefore(elObj, this[i]);
            }
            return this;
        },

        after : function(el) {
            var elIsHTMLObj = getType(el).substring(0, 12) === '[object HTML' ? true : false,
                elObj,
                i,
                k = this.length;
            for (i = 0; i < k; i++) {
                elObj = elIsHTMLObj === true ? el.cloneNode(true) : $.el('span', { 'html' : String(el) });
                this[i].parentNode.insertBefore(elObj, this[i]);
            }
            return this;
        },

        remove: function(selector) {
            var i,
                k;
            if (selector === undefined) {
                k = this.length;
                for (i = 0; i < k; i++) {
                    this[i].parentNode.removeChild(this[i]);
                }
            } else {
                selector = $(selector);
                k = selector.length;
                for (i = 0; i < k; i++) {
                    selector[i].parentNode.removeChild(selector[i]);
                }
            }
            return this;
        },

        hide: function() {
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                this[i].style.display = 'none';
            }
            return this;
        },

        show: function(type) {
            type = type || '';
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                this[i].style.display = type;
                if (this[i].getAttribute('style') === '') {
                    this[i].removeAttribute('style');
                }
            }
            return this;
        },

        toggle: function() {
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                this[i].style.display = this[i].style.display === 'none' ? '' : 'none';
            }
            return this;
        },

        click : function(callback, eventName) {
            return this.on('click', callback, eventName);
        },

        css : function(mix, value) {
            var i,
                k = this.length,
                x,
                y,
                prop,
                ret = null,
                retObj = {},
                computedStyle,
                computedValue,
                mixType = getType(mix);
            if (value === undefined && mixType !== '[object Object]') {
                computedStyle = window.getComputedStyle(this[0]);
                if (mixType === '[object Array]') {
                    y = mix.length;
                    for (x = 0; x < y; x++) {
                        computedValue = computedStyle.getPropertyValue(mix[x]);
                        if (computedValue !== null) {
                            retObj[mix[x]] = computedValue;
                        }
                    }
                    ret = retObj;
                } else {
                    computedValue = computedStyle.getPropertyValue(mix);
                    if (computedValue !== null) {
                        ret = computedValue;
                    } else {
                        ret = '';
                    }
                }
            } else {
                for (i = 0; i < k; i++) {
                    if (mixType === '[object Object]') {
                        for (prop in mix) {
                            if (mix.hasOwnProperty(prop)) {
                                this[0].style.removeProperty(prop, mix[prop]);
                                this[0].style.setProperty(prop, mix[prop]);
                            }
                        }
                    } else {
                        this[0].style.removeProperty(mix);
                        this[0].style.setProperty(mix, value);
                    }
                    if (this[0].getAttribute('style') === '') {
                        this[0].removeAttribute('style');
                    }
                }
            }
            return ret !== null ? ret : this;
        }

    };

    $.log = function() {
        console.log(arguments);
    };

    $.each = function(mix, callback, type) {
        if (mix !== undefined) {
            var i,
                k,
                prop;
            type = type || getType(mix);
            if (type === '[object Object]') {
                for (prop in mix) {
                    if (mix.hasOwnProperty(prop)) {
                        callback(prop, mix[prop]);
                    }
                }
            } else if (type === '[object Array]' || type === '[object NodeList]') {
                k = mix.length;
                for (i = 0; i < k; i++) {
                    callback(i, mix[i]);
                }
            }
        }
    };

    $.el = function(tag, attribs) {
        var el = document.createElement(tag);
        $.each(attribs, function(k, v) {
            if (k === 'html') {
                el.innerHTML = v;
            } else {
                el.setAttribute(k, v);
            }
        }, '[object Object]');
        return el;
    };

    $.trim = function(str) {
        return str.trim();
    };

    $.getType = function(el) {
        return getType(el);
    };

    $.isEmptyObject = function(obj) {
        return isEmptyObject(obj);
    };

}());

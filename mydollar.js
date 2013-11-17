var MyDollar, $;
(function() {
    "use strict";
    /*jslint browser:true, plusplus:true, todo:true*/
    /*global console*/
    var getType,
        arrayUnique,
        arrayRemoveElement,
        isEmptyObject,
        myEventListeners,
        consoleType = typeof console,
        MyD;

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
        return new MyD(selector);
    };

    MyD = function(selector) {
        var selectorType = getType(selector),
            nodes,
            i,
            k;
        if (selectorType.substring(0, 12) === '[object HTML') {
            nodes = [selector];
        } else if (selector === window) {
            nodes = [window];
        } else {
            nodes = document.querySelectorAll(selector);
        }
        k = nodes.length;
        for (i = 0; i < k; i++) {
            this[i] = nodes[i];
        }
        this.length = nodes.length;
        this.nodeType = getType(nodes[0]);
        return this;
    };

    MyDollar.fn = MyD.prototype = {

        ready : function(handler) {
            this[0].addEventListener('DOMContentLoaded', handler, false);
            return this;
        },

        on : function(event, handler, eventName) {
            var i,
                k = this.length,
                eventNameSuffix = '-on';
            for (i = 0; i < k; i++) {
                if (eventName === undefined) {
                    this[i].addEventListener(event, handler);
                } else {
                    this[i].removeEventListener(event, myEventListeners[eventName + '-' + i + '-' + eventNameSuffix]);
                    delete myEventListeners[eventName + '-' + i + '-' + eventNameSuffix];
                    myEventListeners[eventName + '-' + i + '-' + eventNameSuffix] = handler;
                    this[i].addEventListener(event, myEventListeners[eventName + '-' + i + '-' + eventNameSuffix]);
                }
            }
            return this;
        },

        off : function (event, eventName) {
            var i,
                k = this.length,
                eventNameSuffix = '-on';
            if (eventName !== undefined) {
                for (i = 0; i < k; i++) {
                    this[i].removeEventListener(event, myEventListeners[eventName + '-' + i + '-' + eventNameSuffix]);
                    delete myEventListeners[eventName + '-' + i + '-' + eventNameSuffix];
                }
            }
            return this;
        },

        one : function (event, handler, eventName) {
            var i,
                k = this.length,
                eventNameSuffix = '-one',
                makeHandler = function(element1, event1, handler1, eventName1) {
                    return function (e) {
                        handler1.apply(element1, [e]);
                        element1.removeEventListener(event1, myEventListeners[eventName1]);
                        delete myEventListeners[eventName1];
                    };
                };
            for (i = 0; i < k; i++) {
                this[i].removeEventListener(event, myEventListeners[eventName + '-' + i + '-' + eventNameSuffix]);
                delete myEventListeners[eventName + '-' + i + '-' + eventNameSuffix];
                myEventListeners[eventName + '-' + i + '-' + eventNameSuffix] = makeHandler(this[i], event, handler, eventName + '-' + i + '-' + eventNameSuffix);
                this[i].addEventListener(event, myEventListeners[eventName + '-' + i + '-' + eventNameSuffix]);
            }
            return this;
        },

        each : function(handler) {
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                handler.apply(this[i]);
            }
        },

        parent : function() {


        },

        attr : function(mix, value) {
            var i,
                k = this.length,
                prop,
                ret = null,
                mixType = getType(mix),
                valueType = typeof value;
            if (value === undefined && mixType !== '[object Object]') {
                ret = this[0].getAttribute(mix) || '';
            } else {
                for (i = 0; i < k; i++) {
                    if (mixType === '[object Object]') {
                        for (prop in mix) {
                            if (mix.hasOwnProperty(prop)) {
                                this[i].setAttribute(prop, mix[prop]);
                            }
                        }
                    } else {
                        this[i].setAttribute(mix, valueType === 'function' ? value.apply(this[i], [i, this[i].getAttribute(mix)]) : value);
                    }
                }
            }
            return ret !== null ? ret : this;
        },

        removeAttr : function(mix) {
            var i,
                k = this.length,
                x,
                y,
                mixType = getType(mix);
            for (i = 0; i < k; i++) {
                if (mixType === '[object Array]') {
                    y = mix.length;
                    for (x = 0; x < y; x++) {
                        this[i].removeAttribute(mix[x]);
                    }
                } else {
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
                mixType = typeof mix,
                mixed,
                originalClasses = [],
                originalClassesString = '',
                newClasses = [];
            for (i = 0; i < k; i++) {
                originalClassesString = this[i].getAttribute('class') || '';
                originalClasses = originalClassesString.split(' ');
                y = originalClasses.length;
                for (x = 0; x < y; x++) {
                    mixed = mixType === 'function' ? mix.apply(this[i], [i, originalClassesString]) : mix;
                    mixed = mixed.split(' ');
                    n = mixed.length;
                    for (m = 0; m < n; m++) {
                        newClasses.push(mixed[m]);
                    }
                }
                newClasses = arrayUnique(originalClassesString.split(' ').concat(newClasses));
                this[i].setAttribute('class', $.trim(newClasses.join(' ')));
            }
            return this;
        },

        removeClass : function(mix) {
            var i,
                k = this.length,
                m,
                n,
                mixType = typeof mix,
                mixed,
                originalClasses = [],
                originalClassesString = '';
            for (i = 0; i < k; i++) {
                if (mix === undefined) {
                    this[i].removeAttribute('class');
                } else {
                    originalClassesString = this[i].getAttribute('class') || '';
                    originalClasses = originalClassesString.split(' ');
                    mixed = mixType === 'function' ? mix.apply(this[i], [i, originalClassesString]) : mix;
                    mixed = mixed.split(' ');
                    n = mixed.length;
                    for (m = 0; m < n; m++) {
                        originalClasses = arrayRemoveElement(originalClasses, mixed[m]);
                    }
                    if (originalClasses.length > 0) {
                        this[i].setAttribute('class', $.trim(originalClasses.join(' ')));
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
            } else {
                for (i = 0; i < k; i++) {
                    this[i].innerHTML = mixType === 'function' ? mix.apply(this[i], [i, this[i].innerHTML]) : mix;
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
                k = this.length,
                valueType = typeof value;
            if (value === undefined) {
                ret = this[0].value || '';
            } else {
                for (i = 0; i < k; i++) {
                    this[i].value = valueType === 'function' ? value.apply(this[i], [i, this[i].value]) : value;
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

        remove: function() {
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                this[i].parentNode.removeChild(this[i]);
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

        toggle: function(type) {
            type = type || '';
            var i,
                k = this.length;
            for (i = 0; i < k; i++) {
                this[i].style.display = this[i].style.display === 'none' ? type : 'none';
            }
            return this;
        },

        click : function(handler, eventName) {
            return this.on('click', handler, eventName);
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
                mixType = getType(mix),
                valueType = typeof value;
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
                                this[i].style.removeProperty(prop, mix[prop]);
                                this[i].style.setProperty(prop, mix[prop]);
                            }
                        }
                    } else {
                        computedStyle = window.getComputedStyle(this[i]);
                        computedValue = computedStyle.getPropertyValue(mix) || '';
                        this[i].style.removeProperty(mix);
                        this[i].style.setProperty(mix, valueType === 'function' ? value.apply(this[i], [i, computedValue]) : value);
                    }
                    if (this[i].getAttribute('style') === '') {
                        this[i].removeAttribute('style');
                    }
                }
            }
            return ret !== null ? ret : this;
        }

    };

    $.log = function() {
        if (consoleType !== undefined) {
            console.log(arguments);
        }
    };

    $.each = function(mix, handler, type) {
        if (mix !== undefined) {
            var i,
                k,
                prop;
            type = type || getType(mix);
            if (type === '[object Object]') {
                for (prop in mix) {
                    if (mix.hasOwnProperty(prop)) {
                        handler(prop, mix[prop]);
                    }
                }
            } else if (type === '[object Array]' || type === '[object NodeList]') {
                k = mix.length;
                for (i = 0; i < k; i++) {
                    handler(i, mix[i]);
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

    $.uniqId = function() {
        var letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return letter + '-' + new Date().valueOf();
    };

    /**
     * @param {String} url
     * @param {Object} settings
     */
    $.ajax = function(url, settings) {
        var requestTimeout,
            xhReq = new XMLHttpRequest(),
            formData = null;
        settings = settings || {};
        settings.complete = settings.complete || function() { return false; };
        settings.error = settings.error || function() { return false; };
        settings.timeout = settings.timeout || 10000;
        settings.method = settings.method || 'get';
        settings.method = settings.method.toUpperCase();
        settings.headers = settings.headers || null;
        settings.data = settings.data || null;
        if (settings.data !== null) {
            formData = [];
            $.each(settings.data, function(k, v) {
                formData.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }, '[object Object]');
            formData = formData.join('&');
            if (settings.method === 'GET') {
                url = url.indexOf('?') < 0 ? url + '?' + formData : url + '&' + formData;
            }
        }
        requestTimeout = setTimeout(function() {
            xhReq.abort();
            settings.error('Aborted by a timeout.', xhReq);
        }, settings.timeout);

        xhReq.onload = function() {
            if (xhReq.status === 200) {
                clearTimeout(requestTimeout);
                settings.complete(xhReq.response);
            }
        };
        xhReq.onerror = function() {
            clearTimeout(requestTimeout);
            settings.error('An error occurred.', xhReq);
        };
        xhReq.open(settings.method, url, true);
        if (settings.headers !== null) {
            $.each(settings.headers, function(k, v) {
                xhReq.setRequestHeader(k, v);
            }, '[object Object]');
        }
        xhReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (settings.method === 'POST') {
            xhReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xhReq.send(formData);
    };


}());


var MyDollar,$;(function(){var g,b,f,c,a,d=typeof console,e;g=function(h){return Object.prototype.toString.call(h)};b=function(h){return h.filter(function(j,k,i){return i.indexOf(j)===k})};f=function(h,i){return h.filter(function(j){return j!==i})};c=function(h){return Object.keys(h).length===0};a={};MyDollar=$=function(h){return new e(h)};e=function(h){var m=g(h),l,n,j;if(m.substring(0,12)==="[object HTML"){l=[h]}else{if(h===window){l=[window]}else{l=document.querySelectorAll(h)}}j=l.length;for(n=0;n<j;n++){this[n]=l[n]}this.length=l.length;this.nodeType=g(l[0]);return this};MyDollar.fn=e.prototype={ready:function(h){this[0].addEventListener("DOMContentLoaded",h,false);return this},on:function(o,m,j){var l,h=this.length,n="-on";for(l=0;l<h;l++){if(j===undefined){this[l].addEventListener(o,m)}else{this[l].removeEventListener(o,a[j+"-"+l+"-"+n]);delete a[j+"-"+l+"-"+n];a[j+"-"+l+"-"+n]=m;this[l].addEventListener(o,a[j+"-"+l+"-"+n])}}return this},off:function(n,j){var l,h=this.length,m="-on";if(j!==undefined){for(l=0;l<h;l++){this[l].removeEventListener(n,a[j+"-"+l+"-"+m]);delete a[j+"-"+l+"-"+m]}}return this},one:function(p,n,l){var m,j=this.length,o="-one",h=function(q,k,i,r){return function(s){i.apply(q,[s]);q.removeEventListener(k,a[r]);delete a[r]}};for(m=0;m<j;m++){this[m].removeEventListener(p,a[l+"-"+m+"-"+o]);delete a[l+"-"+m+"-"+o];a[l+"-"+m+"-"+o]=h(this[m],p,n,l+"-"+m+"-"+o);this[m].addEventListener(p,a[l+"-"+m+"-"+o])}return this},each:function(l){var j,h=this.length;for(j=0;j<h;j++){l.apply(this[j])}},attr:function(n,o){var m,h=this.length,q,l=null,j=g(n),p=typeof o;if(o===undefined&&j!=="[object Object]"){l=this[0].getAttribute(n)||""}else{for(m=0;m<h;m++){if(j==="[object Object]"){for(q in n){if(n.hasOwnProperty(q)){this[m].setAttribute(q,n[q])}}}else{this[m].setAttribute(n,p==="function"?o.apply(this[m],[m,this[m].getAttribute(n)]):o)}}}return l!==null?l:this},removeAttr:function(n){var m,j=this.length,h,o,l=g(n);for(m=0;m<j;m++){if(l==="[object Array]"){o=n.length;for(h=0;h<o;h++){this[m].removeAttribute(n[h])}}else{this[m].removeAttribute(n)}}return this},hasClass:function(n){var m,j=this.length,h,p,o,l=false;for(m=0;m<j;m++){o=this[m].getAttribute("class");if(o===null){break}else{o=o.split(" ");p=o.length;for(h=0;h<p;h++){if(o[h]===n){l=true;break}}}if(l===true){break}}return l},addClass:function(v){var q,o=this.length,u,s,j,h,w=typeof v,r,t=[],l="",p=[];for(q=0;q<o;q++){l=this[q].getAttribute("class")||"";t=l.split(" ");s=t.length;for(u=0;u<s;u++){r=w==="function"?v.apply(this[q],[q,l]):v;r=r.split(" ");h=r.length;for(j=0;j<h;j++){p.push(r[j])}}p=b(l.split(" ").concat(p));this[q].setAttribute("class",$.trim(p.join(" ")))}return this},removeClass:function(s){var p,o=this.length,j,h,t=typeof s,q,r=[],l="";for(p=0;p<o;p++){if(s===undefined){this[p].removeAttribute("class")}else{l=this[p].getAttribute("class")||"";r=l.split(" ");q=t==="function"?s.apply(this[p],[p,l]):s;q=q.split(" ");h=q.length;for(j=0;j<h;j++){r=f(r,q[j])}if(r.length>0){this[p].setAttribute("class",$.trim(r.join(" ")))}else{this[p].removeAttribute("class")}}}return this},data:function(n,o){var m,h=this.length,p,l=null,j=g(n);if(n===undefined){l=this[0].dataset}else{if(o===undefined&&j!=="[object Object]"){l=this[0].dataset[n]||""}else{for(m=0;m<h;m++){if(j==="[object Object]"){for(p in n){if(n.hasOwnProperty(p)){this[m].dataset[p]=n[p]}}}else{this[m].dataset[n]=o}}}}return l!==null?l:this},removeData:function(n){var m,j=this.length,h,p,o,l;for(m=0;m<j;m++){if(n===undefined){for(o in this[m].dataset){if(this[m].dataset.hasOwnProperty(o)){delete this[m].dataset[o]}}}else{if(g(n)==="[object Array]"){p=n.length;for(h=0;h<p;h++){delete this[m].dataset[n[h]]}}else{l=n.split(" ");p=l.length;for(h=0;h<p;h++){delete this[m].dataset[l[h]]}}}}return this},html:function(n){var m,h=this.length,l=null,j=typeof n;if(n===undefined){l=this[0].innerHTML||""}else{for(m=0;m<h;m++){this[m].innerHTML=j==="function"?n.apply(this[m],[m,this[m].innerHTML]):n}}return l!==null?l:this},empty:function(){var j,h=this.length;for(j=0;j<h;j++){while(this[j].lastChild){this[j].removeChild(this[j].lastChild)}}return this},val:function(m){var j=null,l,h=this.length,n=typeof m;if(m===undefined){j=this[0].value||""}else{for(l=0;l<h;l++){this[l].value=n==="function"?m.apply(this[l],[l,this[l].value]):m}}return j!==null?j:this},append:function(m){var n=g(m).substring(0,12)==="[object HTML"?true:false,h,l,j=this.length;for(l=0;l<j;l++){h=n===true?m.cloneNode(true):$.el("span",{html:String(m)});this[l].appendChild(h)}return this},prepend:function(m){var n=g(m).substring(0,12)==="[object HTML"?true:false,h,l,j=this.length;for(l=0;l<j;l++){h=n===true?m.cloneNode(true):$.el("span",{html:String(m)});this[l].insertBefore(h,this[l].firstChild)}return this},before:function(m){var n=g(m).substring(0,12)==="[object HTML"?true:false,h,l,j=this.length;for(l=0;l<j;l++){h=n===true?m.cloneNode(true):$.el("span",{html:String(m)});this[l].parentNode.insertBefore(h,this[l])}return this},after:function(m){var n=g(m).substring(0,12)==="[object HTML"?true:false,h,l,j=this.length;for(l=0;l<j;l++){h=n===true?m.cloneNode(true):$.el("span",{html:String(m)});this[l].parentNode.insertBefore(h,this[l])}return this},remove:function(){var j,h=this.length;for(j=0;j<h;j++){this[j].parentNode.removeChild(this[j])}return this},hide:function(){var j,h=this.length;for(j=0;j<h;j++){this[j].style.display="none"}return this},show:function(l){l=l||"";var j,h=this.length;for(j=0;j<h;j++){this[j].style.display=l;if(this[j].getAttribute("style")===""){this[j].removeAttribute("style")}}return this},toggle:function(l){l=l||"";var j,h=this.length;for(j=0;j<h;j++){this[j].style.display=this[j].style.display==="none"?l:"none"}return this},click:function(i,h){return this.on("click",i,h)},css:function(v,t){var o,l=this.length,s,r,h,p=null,m={},q,n,u=g(v),j=typeof t;if(t===undefined&&u!=="[object Object]"){q=window.getComputedStyle(this[0]);if(u==="[object Array]"){r=v.length;for(s=0;s<r;s++){n=q.getPropertyValue(v[s]);if(n!==null){m[v[s]]=n}}p=m}else{n=q.getPropertyValue(v);if(n!==null){p=n}else{p=""}}}else{for(o=0;o<l;o++){if(u==="[object Object]"){for(h in v){if(v.hasOwnProperty(h)){this[o].style.removeProperty(h,v[h]);this[o].style.setProperty(h,v[h])}}}else{q=window.getComputedStyle(this[o]);n=q.getPropertyValue(v)||"";this[o].style.removeProperty(v);this[o].style.setProperty(v,j==="function"?t.apply(this[o],[o,n]):t)}if(this[o].getAttribute("style")===""){this[o].removeAttribute("style")}}}return p!==null?p:this}};$.log=function(){if(d!==undefined){console.log(arguments)}};$.each=function(n,m,l){if(n!==undefined){var j,h,o;l=l||g(n);if(l==="[object Object]"){for(o in n){if(n.hasOwnProperty(o)){m(o,n[o])}}}else{if(l==="[object Array]"||l==="[object NodeList]"){h=n.length;for(j=0;j<h;j++){m(j,n[j])}}}}};$.el=function(h,j){var i=document.createElement(h);$.each(j,function(m,l){if(m==="html"){i.innerHTML=l}else{i.setAttribute(m,l)}},"[object Object]");return i};$.trim=function(h){return h.trim()};$.getType=function(h){return g(h)};$.isEmptyObject=function(h){return c(h)};$.uniqId=function(){var h=String.fromCharCode(65+Math.floor(Math.random()*26));return h+"-"+new Date().valueOf()}}());
var MyDollar,$;(function(){var f,b,e,c,a,d;f=function(g){return Object.prototype.toString.call(g)};b=function(g){return g.filter(function(i,j,h){return h.indexOf(i)===j})};e=function(g,h){return g.filter(function(j){return j!==h})};c=function(g){return Object.keys(g).length===0};a={};MyDollar=$=function(g){return new d(g)};d=function(g){var l=f(g),j,m,h;if(l==="[object HTMLDocument]"){g="body"}j=document.querySelectorAll(g);h=j.length;for(m=0;m<h;m++){this[m]=j[m]}this.length=j.length;this.nodeType=f(j[0]);return this};MyDollar.fn=d.prototype={ready:function(g){if(this.nodeType==="[object HTMLBodyElement]"){document.addEventListener("DOMContentLoaded",g,false)}return this},on:function(m,l,h){var j,g=this.length;for(j=0;j<g;j++){if(h===undefined){this[j].addEventListener(m,l)}else{this[j].removeEventListener(m,a[h+"-"+j]);delete a[h+"-"+j];a[h+"-"+j]=l;this[j].addEventListener(m,a[h+"-"+j])}}return this},off:function(l,h){var j,g=this.length;if(h!==undefined){for(j=0;j<g;j++){this[j].removeEventListener(l,a[h+"-"+j]);delete a[h+"-"+j]}}return this},attr:function(m,n){var l,g=this.length,o,j=null,h=f(m);if(n===undefined&&h!=="[object Object]"){j=this[0].getAttribute(m)||""}else{for(l=0;l<g;l++){if(h==="[object Object]"){for(o in m){if(m.hasOwnProperty(o)){this[l].setAttribute(o,m[o])}}}else{this[l].setAttribute(m,n)}}}return j!==null?j:this},removeAttr:function(m){var l,h=this.length,g,n,j=f(m);for(l=0;l<h;l++){if(j==="[object Array]"){n=m.length;for(g=0;g<n;g++){this[l].removeAttribute(m[g])}}else{this[l].removeAttribute(m)}}return this},hasClass:function(m){var l,h=this.length,g,o,n,j=false;for(l=0;l<h;l++){n=this[l].getAttribute("class");if(n===null){break}else{n=n.split(" ");o=n.length;for(g=0;g<o;g++){if(n[g]===m){j=true;break}}}if(j===true){break}}return j},addClass:function(u){var p,l=this.length,t,q,h,g,r,s=[],j="",o=[];for(p=0;p<l;p++){j=this[p].getAttribute("class")||"";s=j.split(" ");q=s.length;for(t=0;t<q;t++){r=u.split(" ");g=r.length;for(h=0;h<g;h++){o.push(r[h])}}o=b(j.split(" ").concat(o));this[0].setAttribute("class",$.trim(o.join(" ")))}return this},removeClass:function(q){var p,l=this.length,j,r,o,h=[],g="";for(p=0;p<l;p++){if(q===undefined){this[p].removeAttribute("class")}else{g=this[p].getAttribute("class")||"";h=g.split(" ");o=q.split(" ");r=o.length;for(j=0;j<r;j++){h=e(h,o[j])}if(h.length>0){this[0].setAttribute("class",$.trim(h.join(" ")))}else{this[p].removeAttribute("class")}}}return this},data:function(m,n){var l,g=this.length,o,j=null,h=f(m);if(m===undefined){j=this[0].dataset}else{if(n===undefined&&h!=="[object Object]"){j=this[0].dataset[m]||""}else{for(l=0;l<g;l++){if(h==="[object Object]"){for(o in m){if(m.hasOwnProperty(o)){this[l].dataset[o]=m[o]}}}else{this[l].dataset[m]=n}}}}return j!==null?j:this},removeData:function(m){var l,h=this.length,g,o,n,j;for(l=0;l<h;l++){if(m===undefined){for(n in this[l].dataset){if(this[l].dataset.hasOwnProperty(n)){delete this[l].dataset[n]}}}else{if(f(m)==="[object Array]"){o=m.length;for(g=0;g<o;g++){delete this[l].dataset[m[g]]}}else{j=m.split(" ");o=j.length;for(g=0;g<o;g++){delete this[l].dataset[j[g]]}}}}return this},html:function(m){var l,g=this.length,j=null,h=typeof m;if(m===undefined){j=this[0].innerHTML||""}else{if(h==="function"){for(l=0;l<g;l++){this[l].innerHTML=m(l,this[l].innerHTML)}}else{if(h==="string"){for(l=0;l<g;l++){this[l].innerHTML=m}}}}return j!==null?j:this},empty:function(){var h,g=this.length;for(h=0;h<g;h++){while(this[h].lastChild){this[h].removeChild(this[h].lastChild)}}return this},val:function(l){var h=null,j,g=this.length;if(l===undefined){h=this[0].value||""}else{for(j=0;j<g;j++){this[j].value=l}}return h!==null?h:this},append:function(l){var m=f(l).substring(0,12)==="[object HTML"?true:false,g,j,h=this.length;for(j=0;j<h;j++){g=m===true?l.cloneNode(true):$.el("span",{html:String(l)});this[j].appendChild(g)}return this},prepend:function(l){var m=f(l).substring(0,12)==="[object HTML"?true:false,g,j,h=this.length;for(j=0;j<h;j++){g=m===true?l.cloneNode(true):$.el("span",{html:String(l)});this[j].insertBefore(g,this[j].firstChild)}return this},before:function(l){var m=f(l).substring(0,12)==="[object HTML"?true:false,g,j,h=this.length;for(j=0;j<h;j++){g=m===true?l.cloneNode(true):$.el("span",{html:String(l)});this[j].parentNode.insertBefore(g,this[j])}return this},after:function(l){var m=f(l).substring(0,12)==="[object HTML"?true:false,g,j,h=this.length;for(j=0;j<h;j++){g=m===true?l.cloneNode(true):$.el("span",{html:String(l)});this[j].parentNode.insertBefore(g,this[j])}return this},remove:function(g){var j,h;if(g===undefined){h=this.length;for(j=0;j<h;j++){this[j].parentNode.removeChild(this[j])}}else{g=$(g);h=g.length;for(j=0;j<h;j++){g[j].parentNode.removeChild(g[j])}}return this},hide:function(){var h,g=this.length;for(h=0;h<g;h++){this[h].style.display="none"}return this},show:function(j){j=j||"";var h,g=this.length;for(h=0;h<g;h++){this[h].style.display=j;if(this[h].getAttribute("style")===""){this[h].removeAttribute("style")}}return this},toggle:function(){var h,g=this.length;for(h=0;h<g;h++){this[h].style.display=this[h].style.display==="none"?"":"none"}return this},click:function(h,g){return this.on("click",h,g)},css:function(t,r){var m,h=this.length,q,p,g,n=null,j={},o,l,s=f(t);if(r===undefined&&s!=="[object Object]"){o=window.getComputedStyle(this[0]);if(s==="[object Array]"){p=t.length;for(q=0;q<p;q++){l=o.getPropertyValue(t[q]);if(l!==null){j[t[q]]=l}}n=j}else{l=o.getPropertyValue(t);if(l!==null){n=l}else{n=""}}}else{for(m=0;m<h;m++){if(s==="[object Object]"){for(g in t){if(t.hasOwnProperty(g)){this[0].style.removeProperty(g,t[g]);this[0].style.setProperty(g,t[g])}}}else{this[0].style.removeProperty(t);this[0].style.setProperty(t,r)}if(this[0].getAttribute("style")===""){this[0].removeAttribute("style")}}}return n!==null?n:this}};$.log=function(){console.log(arguments)};$.each=function(m,l,j){if(m!==undefined){var h,g,n;j=j||f(m);if(j==="[object Object]"){for(n in m){if(m.hasOwnProperty(n)){l(n,m[n])}}}else{if(j==="[object Array]"||j==="[object NodeList]"){g=m.length;for(h=0;h<g;h++){l(h,m[h])}}}}};$.el=function(g,i){var h=document.createElement(g);$.each(i,function(l,j){if(l==="html"){h.innerHTML=j}else{h.setAttribute(l,j)}},"[object Object]");return h};$.trim=function(g){return g.trim()};$.getType=function(g){return f(g)};$.isEmptyObject=function(g){return c(g)}}());
/*
The MIT License (MIT)

Copyright (c) 2015 OneNoteDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.OneNoteApi=t()}}(function(){return function t(e,r,n){function o(i,s){if(!r[i]){if(!e[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(a)return a(i,!0);var p=new Error("Cannot find module '"+i+"'");throw p.code="MODULE_NOT_FOUND",p}var c=r[i]={exports:{}};e[i][0].call(c.exports,function(t){var r=e[i][1][t];return o(r?r:t)},c,c.exports,t,e,r,n)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(t,e,r){"use strict";var n=function(){function t(){this.operations=[],this.boundaryName="batch_"+Math.floor(1e3*Math.random())}return t.prototype.addOperation=function(t){this.operations.push(t)},t.prototype.getOperation=function(t){return this.operations[t]},t.prototype.getNumOperations=function(){return this.operations.length},t.prototype.getRequestBody=function(){var t=this,e="";return this.operations.forEach(function(r){var n="";n+="--"+t.boundaryName+"\r\n",n+="Content-Type: application/http\r\n",n+="Content-Transfer-Encoding: binary\r\n",n+="\r\n",n+=r.httpMethod+" "+r.uri+" HTTP/1.1\r\n",n+="Content-Type: "+r.contentType+"\r\n",n+="\r\n",n+=(r.content?r.content:"")+"\r\n",n+="\r\n",e+=n}),e+="--"+this.boundaryName+"--\r\n"},t.prototype.getContentType=function(){return'multipart/mixed; boundary="'+this.boundaryName+'"'},t}();r.BatchRequest=n},{}],2:[function(t,e,r){"use strict";!function(t){t[t.Html=0]="Html",t[t.Image=1]="Image",t[t.EnhancedUrl=2]="EnhancedUrl",t[t.Url=3]="Url",t[t.Onml=4]="Onml"}(r.ContentType||(r.ContentType={}));r.ContentType},{}],3:[function(t,e,r){"use strict";!function(t){t[t.NETWORK_ERROR=0]="NETWORK_ERROR",t[t.UNEXPECTED_RESPONSE_STATUS=1]="UNEXPECTED_RESPONSE_STATUS",t[t.REQUEST_TIMED_OUT=2]="REQUEST_TIMED_OUT",t[t.UNABLE_TO_PARSE_RESPONSE=3]="UNABLE_TO_PARSE_RESPONSE"}(r.RequestErrorType||(r.RequestErrorType={}));var n=r.RequestErrorType,o=function(){function t(){}return t.createRequestErrorObject=function(e,r){if(void 0!==e&&null!==e)return t.createRequestErrorObjectInternal(e.status,e.readyState,e.response,e.getAllResponseHeaders(),e.timeout,r)},t.createRequestErrorObjectInternal=function(e,r,o,a,i,s){var u=t.formatRequestErrorTypeAsString(s);s===n.NETWORK_ERROR&&(u+=t.getAdditionalNetworkErrorInfo(r)),s===n.REQUEST_TIMED_OUT&&(e=408);var p={error:u,statusCode:e,responseHeaders:t.convertResponseHeadersToJsonInternal(a),response:o};return i>0&&!(e>=200&&e<300)&&(p.timeout=i),p},t.convertResponseHeadersToJson=function(e){if(void 0!==e&&null!==e){var r=e.getAllResponseHeaders();return t.convertResponseHeadersToJsonInternal(r)}},t.convertResponseHeadersToJsonInternal=function(t){for(var e,r=/([^:]+):\s?(.*)/g,n={};e=r.exec(t);){e.index===r.lastIndex&&r.lastIndex++;var o=e[1].trim(),a=e[2].trim();n[o]=a}return n},t.getAdditionalNetworkErrorInfo=function(t){return": "+JSON.stringify({readyState:t})},t.formatRequestErrorTypeAsString=function(t){var e=n[t];return e.charAt(0).toUpperCase()+e.replace(/_/g," ").toLowerCase().slice(1)},t}();r.ErrorUtils=o},{}],4:[function(t,e,r){"use strict";var n=function(){function t(){}return t.sectionExistsInNotebooks=function(e,r){if(!e||!r)return!1;for(var n=0;n<e.length;n++)if(t.sectionExistsInParent(e[n],r))return!0;return!1},t.sectionExistsInParent=function(e,r){if(!e||!r)return!1;if(e.sections)for(var n=0;n<e.sections.length;n++){var o=e.sections[n];if(o&&o.id===r)return!0}if(e.sectionGroups)for(var n=0;n<e.sectionGroups.length;n++)if(t.sectionExistsInParent(e.sectionGroups[n],r))return!0;return!1},t.getPathFromNotebooksToSection=function(e,r){if(e&&r)for(var n=0;n<e.length;n++){var o=e[n],a=t.getPathFromParentToSection(o,r);if(a)return a}},t.getPathFromParentToSection=function(e,r){if(e&&r){if(e.sections)for(var n=0;n<e.sections.length;n++){var o=e.sections[n];if(r(o))return[e,o]}if(e.sectionGroups)for(var n=0;n<e.sectionGroups.length;n++){var a=e.sectionGroups[n],i=t.getPathFromParentToSection(a,r);if(i)return i.unshift(e),i}}},t.getDepthOfNotebooks=function(e){return e&&0!==e.length?e.map(function(e){return t.getDepthOfParent(e)}).reduce(function(t,e){return Math.max(t,e)}):0},t.getDepthOfParent=function(e){if(!e)return 0;var r=e.sections&&e.sections.length>0,n=r?1:0;if(e.sectionGroups)for(var o=0;o<e.sectionGroups.length;o++)n=Math.max(t.getDepthOfParent(e.sectionGroups[o]),n);return n+1},t}();r.NotebookUtils=n},{}],5:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=t("./oneNoteApiBase"),a=function(t){function e(e,r,n){void 0===r&&(r=3e4),void 0===n&&(n={}),t.call(this,e,r,n)}return n(e,t),e.prototype.createNotebook=function(t){var e=JSON.stringify({name:t});return this.requestPromise(this.getNotebooksUrl(),e)},e.prototype.createPage=function(t,e){var r=e?"/sections/"+e:"",n=r+"/pages",o=t.getTypedFormData();return this.requestPromise(n,o.asBlob(),o.getContentType())},e.prototype.sendBatchRequest=function(t){return this.enableBetaApi(),this.requestBasePromise("/$batch",t.getRequestBody(),t.getContentType(),"POST").then(this.disableBetaApi.bind(this))},e.prototype.getPage=function(t){var e="/pages/"+t;return this.requestPromise(e)},e.prototype.getPageContent=function(t){var e="/pages/"+t+"/content";return this.requestPromise(e)},e.prototype.getPages=function(t){var e="/pages";return t.top>0&&t.top===Math.floor(t.top)&&(e+="?top="+t.top),t.sectionId&&(e="/sections/"+t.sectionId+e),this.requestPromise(e)},e.prototype.updatePage=function(t,e){var r="/pages/"+t,n=r+"/content";return this.requestPromise(n,JSON.stringify(e),"application/json","PATCH")},e.prototype.createSection=function(t,e){var r={name:e},n=JSON.stringify(r);return this.requestPromise("/notebooks/"+t+"/sections/",n)},e.prototype.getNotebooks=function(t){return void 0===t&&(t=!0),this.requestPromise(this.getNotebooksUrl(null,t))},e.prototype.getNotebooksWithExpandedSections=function(t,e){return void 0===t&&(t=2),void 0===e&&(e=!0),this.requestPromise(this.getNotebooksUrl(t,e))},e.prototype.getNotebookByName=function(t){return this.requestPromise("/notebooks?filter=name%20eq%20%27"+encodeURI(t)+"%27&orderby=createdTime")},e.prototype.pagesSearch=function(t){return this.requestPromise(this.getSearchUrl(t))},e.prototype.getExpands=function(t){if(t<=0)return"";var e="$expand=sections,sectionGroups";return 1===t?e:e+"("+this.getExpands(t-1)+")"},e.prototype.getNotebooksUrl=function(t,e){void 0===t&&(t=0),void 0===e&&(e=!0);var r=e?"$filter=userRole%20ne%20Microsoft.OneNote.Api.UserRole'Reader'":"";return"/notebooks?"+r+(t?"&"+this.getExpands(t):"")},e.prototype.getSearchUrl=function(t){return"/pages?search="+t},e.prototype.enableBetaApi=function(){this.useBetaApi=!0},e.prototype.disableBetaApi=function(){this.useBetaApi=!1},e}(o.OneNoteApiBase);r.OneNoteApi=a;var i=t("./contentType");r.ContentType=i.ContentType;var s=t("./oneNotePage");r.OneNotePage=s.OneNotePage;var u=t("./batchRequest");r.BatchRequest=u.BatchRequest;var p=t("./errorUtils");r.ErrorUtils=p.ErrorUtils,r.RequestErrorType=p.RequestErrorType;var c=t("./notebookUtils");r.NotebookUtils=c.NotebookUtils},{"./batchRequest":1,"./contentType":2,"./errorUtils":3,"./notebookUtils":4,"./oneNoteApiBase":6,"./oneNotePage":7}],6:[function(t,e,r){"use strict";var n=t("./errorUtils"),o=t("content-type"),a=function(){function t(t,e,r){void 0===r&&(r={}),this.useBetaApi=!1,this.token=t,this.timeout=e,this.headers=r}return t.prototype.requestBasePromise=function(t,e,r,n){var o=this.generateFullBaseUrl(t);return null===r&&(r="application/json"),this.makeRequest(o,e,r,n)},t.prototype.requestPromise=function(t,e,r,n){var o=this,a=this.generateFullUrl(t);return null===r&&(r="application/json"),new Promise(function(t,i){o.makeRequest(a,e,r,n).then(function(e){t(e)},function(t){i(t)})})},t.prototype.generateFullBaseUrl=function(t){var e=this.useBetaApi?"https://www.onenote.com/api/beta":"https://www.onenote.com/api/v1.0";return e+t},t.prototype.generateFullUrl=function(t){var e=this.useBetaApi?"https://www.onenote.com/api/beta/me/notes":"https://www.onenote.com/api/v1.0/me/notes";return e+t},t.prototype.makeRequest=function(e,r,a,i){var s=this;return new Promise(function(u,p){var c,f=new XMLHttpRequest;c=i?i:r?"POST":"GET",f.open(c,e),f.timeout=s.timeout,f.onload=function(){if(200===f.status||201===f.status||204===f.status)try{var t={type:""};try{t=o.parse(f.getResponseHeader("Content-Type"))}catch(e){}var r=f.response;switch(t.type){case"application/json":r=JSON.parse(f.response?f.response:"{}");break;case"text/html":default:r=f.response}u({parsedResponse:r,request:f})}catch(a){p(n.ErrorUtils.createRequestErrorObject(f,n.RequestErrorType.UNABLE_TO_PARSE_RESPONSE))}else p(n.ErrorUtils.createRequestErrorObject(f,n.RequestErrorType.UNEXPECTED_RESPONSE_STATUS))},f.onerror=function(){p(n.ErrorUtils.createRequestErrorObject(f,n.RequestErrorType.NETWORK_ERROR))},f.ontimeout=function(){p(n.ErrorUtils.createRequestErrorObject(f,n.RequestErrorType.REQUEST_TIMED_OUT))},a&&f.setRequestHeader("Content-Type",a),f.setRequestHeader("Authorization","Bearer "+s.token),t.addHeadersToRequest(f,s.headers),f.send(r)})},t.addHeadersToRequest=function(t,e){if(e)for(var r in e)e.hasOwnProperty(r)&&t.setRequestHeader(r,e[r])},t}();r.OneNoteApiBase=a},{"./errorUtils":3,"content-type":9}],7:[function(t,e,r){"use strict";var n=t("./typedFormData"),o=function(){function t(t,e,r,n){void 0===t&&(t=""),void 0===e&&(e=""),void 0===r&&(r="en-us"),void 0===n&&(n=void 0),this.dataParts=[],this.title=t,this.presentationBody=e,this.locale=r,this.pageMetadata=n}return t.prototype.getEntireOnml=function(){return'<html xmlns="http://www.w3.org/1999/xhtml" lang='+this.locale+">"+this.getHeadAsHtml()+"<body>"+this.presentationBody+"</body></html>"},t.prototype.getHeadAsHtml=function(){var t=this.getPageMetadataAsHtml(),e=this.formUtcOffsetString(new Date);return"<head><title>"+this.escapeHtmlEntities(this.title)+'</title><meta name="created" content="'+e+' ">'+t+"</head>"},t.prototype.getPageMetadataAsHtml=function(){var t="";if(this.pageMetadata)for(var e in this.pageMetadata)t+='<meta name="'+e+'" content="'+this.escapeHtmlEntities(this.pageMetadata[e])+'" />';return t},t.prototype.formUtcOffsetString=function(t){var e=t.getTimezoneOffset(),r=e>=0?"-":"+";e=Math.abs(e);var n=Math.floor(e/60)+"",o=Math.round(e%60)+"";return parseInt(n,10)<10&&(n="0"+n),parseInt(o,10)<10&&(o="0"+o),r+n+":"+o},t.prototype.generateMimePartName=function(t){return t+Math.floor(1e4*Math.random()).toString()},t.prototype.escapeHtmlEntities=function(t){var e=document.createElement("div");return e.innerText=t,e.innerHTML},t.prototype.getTypedFormData=function(){var t=new n.TypedFormData;t.append("Presentation",this.getEntireOnml(),"application/xhtml+xml");for(var e=0;e<this.dataParts.length;e++){var r=this.dataParts[e];t.append(r.name,r.content,r.type)}return t},t.prototype.addOnml=function(t){this.presentationBody+=t},t.prototype.addHtml=function(t){var e=this.generateMimePartName("Html");return this.dataParts.push({content:t,name:e,type:"text/HTML"}),this.addOnml('<img data-render-src="name:'+e+'"/>'),e},t.prototype.addImage=function(t){this.addOnml('<img src="'+t+'"/>')},t.prototype.addObjectUrlAsImage=function(t){this.addOnml('<img data-render-src="'+t+'"/>')},t.prototype.addAttachment=function(t,e){var r=this.generateMimePartName("Attachment");return this.dataParts.push({content:t,name:r,type:"application/pdf"}),this.addOnml('<object data-attachment="'+e+'" data="name:'+r+'" type="application/pdf" />'),r},t.prototype.addUrl=function(t){this.addOnml('<div data-render-src="'+t+'" data-render-method="extract" data-render-fallback="none"></div>')},t.prototype.addCitation=function(t,e,r){this.addOnml(t.replace("{0}",'<a href="'+(r?r:e)+'">'+e+"</a>"))},t}();r.OneNotePage=o},{"./typedFormData":8}],8:[function(t,e,r){"use strict";var n=function(){function t(){this.contentTypeMultipart="multipart/form-data; boundary=",this.dataParts=[],this.boundaryName="OneNoteTypedDataBoundary"+Math.floor(1e3*Math.random())}return t.prototype.getContentType=function(){return this.contentTypeMultipart+this.boundaryName},t.prototype.append=function(t,e,r){this.dataParts.push({content:e,name:t,type:r})},t.prototype.asBlob=function(){for(var t="--"+this.boundaryName,e=[t],r=0;r<this.dataParts.length;r++){var n=this.dataParts[r],o="\r\nContent-Type: "+n.type+'\r\nContent-Disposition: form-data; name="'+n.name+'"\r\n\r\n';e.push(o),e.push(n.content),e.push("\r\n"+t)}return e.push("--\r\n"),new Blob(e)},t}();r.TypedFormData=n},{}],9:[function(t,e,r){/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
"use strict";function n(t){if(!t||"object"!=typeof t)throw new TypeError("argument obj is required");var e=t.parameters,r=t.type;if(!r||!h.test(r))throw new TypeError("invalid type");var n=r;if(e&&"object"==typeof e)for(var o,a=Object.keys(e).sort(),s=0;s<a.length;s++){if(o=a[s],!c.test(o))throw new TypeError("invalid parameter name");n+="; "+o+"="+i(e[o])}return n}function o(t){if(!t)throw new TypeError("argument string is required");if("object"==typeof t&&(t=a(t),"string"!=typeof t))throw new TypeError("content-type header is missing from object");if("string"!=typeof t)throw new TypeError("argument string is required to be a string");var e=t.indexOf(";"),r=e!==-1?t.substr(0,e).trim():t.trim();if(!h.test(r))throw new TypeError("invalid media type");var n,o,i,p=new s(r.toLowerCase());for(u.lastIndex=e;o=u.exec(t);){if(o.index!==e)throw new TypeError("invalid parameter format");e+=o[0].length,n=o[1].toLowerCase(),i=o[2],'"'===i[0]&&(i=i.substr(1,i.length-2).replace(f,"$1")),p.parameters[n]=i}if(e!==-1&&e!==t.length)throw new TypeError("invalid parameter format");return p}function a(t){return"function"==typeof t.getHeader?t.getHeader("content-type"):"object"==typeof t.headers?t.headers&&t.headers["content-type"]:void 0}function i(t){var e=String(t);if(c.test(e))return e;if(e.length>0&&!p.test(e))throw new TypeError("invalid parameter value");return'"'+e.replace(d,"\\$1")+'"'}function s(t){this.parameters=Object.create(null),this.type=t}var u=/; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g,p=/^[\u000b\u0020-\u007e\u0080-\u00ff]+$/,c=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/,f=/\\([\u000b\u0020-\u00ff])/g,d=/([\\"])/g,h=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/;r.format=n,r.parse=o},{}]},{},[5])(5)});
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var BrowserUtils;
(function (BrowserUtils) {
    function appendHiddenIframeToDocument(url) {
        var iframe = document.createElement("iframe");
        iframe.hidden = true;
        iframe.style.display = "none";
        iframe.src = url;
        document.body.appendChild(iframe);
    }
    BrowserUtils.appendHiddenIframeToDocument = appendHiddenIframeToDocument;
    /**
     * Checks if the browser is unsupported by the Web Clipper, i.e., IE 9 and below.
     *
     * @return true if the the browser is supported by the Web Clipper; false otherwise
     */
    function browserNotSupported() {
        // Does not exist on IE8 and below
        if (!window.addEventListener) {
            return true;
        }
        // IE9
        if (navigator.appVersion.indexOf("MSIE 9") >= 0) {
            return true;
        }
        return false;
    }
    BrowserUtils.browserNotSupported = browserNotSupported;
    /**
     * Assuming the caller is from IE, returns the browser version
     */
    function ieVersion() {
        var ua = window.navigator.userAgent;
        var msieIndex = ua.indexOf("MSIE ");
        if (msieIndex >= 0) {
            // IE 10 or older
            return "IE" + ua.substring(msieIndex + 5, ua.indexOf(".", msieIndex));
        }
        if (ua.indexOf("Trident/") >= 0) {
            // IE 11
            var rvIndex = ua.indexOf("rv:");
            return "IE" + ua.substring(rvIndex + 3, ua.indexOf(".", rvIndex));
        }
        if (ua.indexOf("Edge/") >= 0) {
            // Edge (IE 12+) => return version number
            return "Edge";
        }
        return undefined;
    }
    BrowserUtils.ieVersion = ieVersion;
    function openPopupWindow(url, popupWidth, popupHeight) {
        if (popupWidth === void 0) { popupWidth = 1000; }
        if (popupHeight === void 0) { popupHeight = 700; }
        var leftPosition = (screen.width) ? (screen.width - popupWidth) / 2 : 0;
        var topPosition = (screen.height) ? (screen.height - popupHeight) / 2 : 0;
        var settings = "height=" + popupHeight +
            ",width=" + popupWidth +
            ",top=" + topPosition +
            ",left=" + leftPosition +
            ",scrollbars=yes,resizable=yes,location=no,menubar=no,status=yes,titlebar=no,toolbar=no";
        return window.open(url, "_blank", settings);
    }
    BrowserUtils.openPopupWindow = openPopupWindow;
})(BrowserUtils = exports.BrowserUtils || (exports.BrowserUtils = {}));

},{}],2:[function(require,module,exports){
"use strict";
var ClientType;
(function (ClientType) {
    ClientType[ClientType["Bookmarklet"] = 0] = "Bookmarklet";
    ClientType[ClientType["ChromeExtension"] = 1] = "ChromeExtension";
    ClientType[ClientType["EdgeExtension"] = 2] = "EdgeExtension";
    ClientType[ClientType["FirefoxExtension"] = 3] = "FirefoxExtension";
    ClientType[ClientType["SafariExtension"] = 4] = "SafariExtension";
})(ClientType = exports.ClientType || (exports.ClientType = {}));

},{}],3:[function(require,module,exports){
"use strict";
var invokeSource_1 = require("../extensions/invokeSource");
var TooltipType;
(function (TooltipType) {
    TooltipType[TooltipType["ChangeLog"] = 0] = "ChangeLog";
    TooltipType[TooltipType["Pdf"] = 1] = "Pdf";
    TooltipType[TooltipType["Product"] = 2] = "Product";
    TooltipType[TooltipType["Recipe"] = 3] = "Recipe";
    TooltipType[TooltipType["Video"] = 4] = "Video";
    TooltipType[TooltipType["WhatsNew"] = 5] = "WhatsNew";
})(TooltipType = exports.TooltipType || (exports.TooltipType = {}));
var TooltipTypeUtils;
(function (TooltipTypeUtils) {
    function toInvokeSource(tooltipType) {
        switch (tooltipType) {
            case TooltipType.Pdf:
                return invokeSource_1.InvokeSource.PdfTooltip;
            case TooltipType.Product:
                return invokeSource_1.InvokeSource.ProductTooltip;
            case TooltipType.Recipe:
                return invokeSource_1.InvokeSource.RecipeTooltip;
            case TooltipType.Video:
                return invokeSource_1.InvokeSource.VideoTooltip;
            case TooltipType.WhatsNew:
                return invokeSource_1.InvokeSource.WhatsNewTooltip;
            default:
                throw Error("Invalid TooltipType passed in TooltipType.toInvokeSource");
        }
    }
    TooltipTypeUtils.toInvokeSource = toInvokeSource;
})(TooltipTypeUtils = exports.TooltipTypeUtils || (exports.TooltipTypeUtils = {}));

},{"../extensions/invokeSource":28}],4:[function(require,module,exports){
"use strict";
var clientType_1 = require("./clientType");
var constants_1 = require("./constants");
var urlUtils_1 = require("./urlUtils");
var ClipperUrls;
(function (ClipperUrls) {
    function generateFeedbackUrl(clipperState, usid, logCategory) {
        var generatedFeedbackUrl = urlUtils_1.UrlUtils.addUrlQueryValue(constants_1.Constants.Urls.clipperFeedbackUrl, "LogCategory", logCategory);
        generatedFeedbackUrl = urlUtils_1.UrlUtils.addUrlQueryValue(generatedFeedbackUrl, "originalUrl", clipperState.pageInfo.rawUrl);
        generatedFeedbackUrl = urlUtils_1.UrlUtils.addUrlQueryValue(generatedFeedbackUrl, "clipperId", clipperState.clientInfo.clipperId);
        generatedFeedbackUrl = urlUtils_1.UrlUtils.addUrlQueryValue(generatedFeedbackUrl, "usid", usid);
        generatedFeedbackUrl = urlUtils_1.UrlUtils.addUrlQueryValue(generatedFeedbackUrl, "type", clientType_1.ClientType[clipperState.clientInfo.clipperType]);
        generatedFeedbackUrl = urlUtils_1.UrlUtils.addUrlQueryValue(generatedFeedbackUrl, "version", clipperState.clientInfo.clipperVersion);
        return generatedFeedbackUrl;
    }
    ClipperUrls.generateFeedbackUrl = generateFeedbackUrl;
    function generateSignInUrl(clipperId, sessionId, authType) {
        return addAuthenticationQueryValues(constants_1.Constants.Urls.Authentication.signInUrl, clipperId, sessionId, authType);
    }
    ClipperUrls.generateSignInUrl = generateSignInUrl;
    function generateSignOutUrl(clipperId, sessionId, authType) {
        return addAuthenticationQueryValues(constants_1.Constants.Urls.Authentication.signOutUrl, clipperId, sessionId, authType);
    }
    ClipperUrls.generateSignOutUrl = generateSignOutUrl;
    function addAuthenticationQueryValues(originalUrl, clipperId, sessionId, authType) {
        var authenticationUrl = urlUtils_1.UrlUtils.addUrlQueryValue(originalUrl, constants_1.Constants.Urls.QueryParams.authType, authType);
        authenticationUrl = urlUtils_1.UrlUtils.addUrlQueryValue(authenticationUrl, constants_1.Constants.Urls.QueryParams.clipperId, clipperId);
        authenticationUrl = urlUtils_1.UrlUtils.addUrlQueryValue(authenticationUrl, constants_1.Constants.Urls.QueryParams.userSessionId, sessionId);
        return authenticationUrl;
    }
})(ClipperUrls = exports.ClipperUrls || (exports.ClipperUrls = {}));

},{"./clientType":2,"./constants":10,"./urlUtils":71}],5:[function(require,module,exports){
"use strict";
/**
 * Communication interface for handling message passing between two scripts (separate windows, extensions, etc...)
 */
var Communicator = (function () {
    function Communicator(messageHandler, channel) {
        this.otherSideKeys = {};
        this.queuedCalls = {};
        // We do not want to override the callback if we call a remote function more than once, so each
        // time we register a callback, we need to add this and increment it accordingly.
        this.callbackIdPostfix = 0;
        this.functionMap = {};
        this.svFunctions = {};
        this.trackedSmartValues = {};
        this.channel = channel;
        this.messageHandler = messageHandler;
        this.messageHandler.onMessageReceived = this.parseMessage.bind(this);
        this.sendInitializationMessage();
    }
    Communicator.prototype.getMessageHandler = function () {
        return this.messageHandler;
    };
    /*
     * Event handler for when the other side has responded
     */
    Communicator.prototype.onInitialized = function () {
    };
    /**
     * Does any cleanup work needed
     */
    Communicator.prototype.tearDown = function () {
        // Unsubscribe to SVs
        for (var svKey in this.trackedSmartValues) {
            if (this.trackedSmartValues.hasOwnProperty(svKey)) {
                if (this.svFunctions[svKey]) {
                    for (var i = 0; i < this.svFunctions[svKey].length; i++) {
                        this.trackedSmartValues[svKey].unsubscribe(this.svFunctions[svKey][i]);
                    }
                }
            }
        }
        this.messageHandler.tearDown();
    };
    /**
     * Sets the error handler for when trying to communicate throws an error
     */
    Communicator.prototype.setErrorHandler = function (errorHandler) {
        this.communicatorErrorHandler = errorHandler;
    };
    /**
     * Parses the message and determines what action to take
     */
    Communicator.prototype.parseMessage = function (dataString) {
        var dataPackage;
        try {
            dataPackage = JSON.parse(dataString);
        }
        catch (error) {
            // Ignore messages that aren't in the expected format
            return;
        }
        // If it came from myself, ignore it :)
        if (!dataPackage) {
            return;
        }
        // If we specified a channel, then check it, if we didn't, then we ignore anything with one
        if ((this.channel && (!dataPackage.channel || dataPackage.channel !== this.channel)) ||
            (!this.channel && dataPackage.channel)) {
            return;
        }
        try {
            this.handleDataPackage(dataPackage);
        }
        catch (e) {
            if (this.communicatorErrorHandler) {
                this.communicatorErrorHandler(e);
            }
            else {
                throw e;
            }
        }
    };
    /**
     * Determines the correct way to handle the given data package.
     */
    Communicator.prototype.handleDataPackage = function (dataPackage) {
        var _this = this;
        if (dataPackage.functionKey === Communicator.initializationKey) {
            // The other side is coming online; acknowledge, and tell it about our existing functions
            this.sendAcknowledgementMessage();
            for (var functionName in this.functionMap) {
                if (this.functionMap.hasOwnProperty(functionName)) {
                    this.postMessage({ data: functionName, functionKey: Communicator.registrationKey });
                }
            }
            // Both sides are online now (we were first)
            this.onInitialized();
        }
        else if (dataPackage.functionKey === Communicator.acknowledgeKey) {
            // Both sides are online now (we were second)
            this.onInitialized();
        }
        else if (dataPackage.functionKey === Communicator.registrationKey) {
            // The other side is registering a function with us.
            var newKey = dataPackage.data.toString();
            if (!this.otherSideKeys[newKey]) {
                this.otherSideKeys[newKey] = true;
            }
            if (this.isSmartValueSubscription(newKey)) {
                // Make sure we immediately pass the latest value we have
                var smartValueName = newKey.substr(Communicator.setValuePrefix.length);
                var smartValue = this.trackedSmartValues[smartValueName];
                if (smartValue) {
                    this.updateRemoteSmartValue(smartValueName, smartValue.get());
                }
            }
            else if (this.queuedCalls[newKey]) {
                // Pass any calls to that function that we had saved up
                var calls = this.queuedCalls[newKey];
                for (var i = 0; i < calls.length; i++) {
                    this.postMessage(calls[i]);
                }
                delete this.queuedCalls[newKey];
            }
        }
        else {
            // Handle a normal function call from the other side
            var func = this.functionMap[dataPackage.functionKey];
            if (func) {
                var promiseResult = func(dataPackage.data);
                if (promiseResult && promiseResult.then && dataPackage.callbackKey) {
                    promiseResult.then(function (result) {
                        _this.callRemoteFunction(dataPackage.callbackKey, { param: result });
                    }, function (error) {
                        _this.callRemoteFunction(dataPackage.callbackKey, { param: error });
                    });
                }
            }
        }
    };
    /**
     * Registers a function name that can be called from the remote
     */
    Communicator.prototype.registerFunction = function (name, func) {
        if (!name) {
            throw new Error("param 'name' is invalid");
        }
        this.functionMap[name] = func;
        this.postMessage({ data: name, functionKey: Communicator.registrationKey });
    };
    /**
     * Triggers the call of a remote function that was registered with the given name
     */
    Communicator.prototype.callRemoteFunction = function (name, options) {
        if (!name) {
            throw new Error("param 'name' is invalid");
        }
        var paramData = options ? options.param : undefined;
        var callbackKey = undefined;
        if (options && options.callback) {
            callbackKey = name + Communicator.callbackPostfix + "-" + this.callbackIdPostfix++;
            this.registerFunction(callbackKey, options.callback);
        }
        var dataPackage = { data: paramData, functionKey: name };
        if (callbackKey) {
            dataPackage.callbackKey = callbackKey;
        }
        if (this.otherSideKeys[name]) {
            this.postMessage(dataPackage);
        }
        else if (!this.isSmartValueSubscription(name)) {
            // If it is a regular function call, queue it up to send when the other side comes online. SmartValues will happen automatically
            this.queuedCalls[name] = this.queuedCalls[name] || [];
            this.queuedCalls[name].push(dataPackage);
        }
    };
    /**
     * Subscribes to all changes for the SmartValue from the remote's version
     */
    Communicator.prototype.subscribeAcrossCommunicator = function (sv, name, subscribeCallback) {
        if (subscribeCallback) {
            sv.subscribe(subscribeCallback, { callOnSubscribe: false });
        }
        this.registerFunction(Communicator.setValuePrefix + name, function (val) {
            sv.set(val);
        });
    };
    /**
     * Broadcast all changes for the SmartValue to the remote's version
     */
    Communicator.prototype.broadcastAcrossCommunicator = function (sv, name) {
        var _this = this;
        var callback = function (val) {
            _this.updateRemoteSmartValue(name, val);
        };
        if (!this.svFunctions[name]) {
            this.svFunctions[name] = [];
        }
        this.svFunctions[name].push(callback);
        this.trackedSmartValues[name] = sv;
        sv.subscribe(callback);
    };
    Communicator.prototype.updateRemoteSmartValue = function (smartValueName, value) {
        this.callRemoteFunction(Communicator.setValuePrefix + smartValueName, { param: value });
    };
    /**
     * Sends a message to the other side to let them know we are connected for the firstTime
     */
    Communicator.prototype.sendInitializationMessage = function () {
        this.postMessage({ functionKey: Communicator.initializationKey });
    };
    /**
     * Sends a message to the other side to let them know we saw their initialization message
     */
    Communicator.prototype.sendAcknowledgementMessage = function () {
        this.postMessage({ functionKey: Communicator.acknowledgeKey });
    };
    Communicator.prototype.isSmartValueSubscription = function (functionKey) {
        return functionKey.substr(0, Communicator.setValuePrefix.length) === Communicator.setValuePrefix;
    };
    /**
     * Update the dataPackage with the channel, and send it as a JSON string to the MessageHandler
     */
    Communicator.prototype.postMessage = function (dataPackage) {
        // If we specified a channel, then we always send that with the message
        if (this.channel) {
            dataPackage.channel = this.channel;
        }
        try {
            this.messageHandler.sendMessage(JSON.stringify(dataPackage));
        }
        catch (e) {
            if (this.communicatorErrorHandler) {
                this.communicatorErrorHandler(e);
            }
            else {
                throw e;
            }
        }
    };
    return Communicator;
}());
Communicator.initializationKey = "INITIALIZATION-K3Y";
Communicator.acknowledgeKey = "ACKNOWLEDGE-K3Y";
Communicator.registrationKey = "REGISTER-FUNCTION-K3Y";
Communicator.setValuePrefix = "SETVALUE-";
Communicator.callbackPostfix = "-CALLBACK";
exports.Communicator = Communicator;

},{}],6:[function(require,module,exports){
"use strict";
var communicator_1 = require("./communicator");
/**
 * Links two communicators together and after initialization, passes all communication from either to the other
 * The general logic to do this is as follows:
 *     Initialize with handler1
 *     After an initial response from handler1, start queueing messages from handler1, and start initializing with handler2
 *     After an initial response from handler2, flush any queued messages, and pass-through the rest of the communications from either
 *  Note: The channel specified should be the same as the channel the other sides are using
 */
var CommunicatorPassthrough = (function () {
    function CommunicatorPassthrough(messageHandler1, messageHandler2, channel, errorHandler) {
        var comm1 = new communicator_1.Communicator(messageHandler1, channel);
        comm1.setErrorHandler(errorHandler);
        comm1.onInitialized = function () {
            // Queue up any messages passed until we can initialize with the other side
            var queuedMessages = [];
            comm1.handleDataPackage = function (dataPackage) {
                queuedMessages.push(dataPackage);
            };
            var comm2 = new communicator_1.Communicator(messageHandler2, channel);
            comm2.setErrorHandler(errorHandler);
            comm2.onInitialized = function () {
                comm1.onInitialized = undefined;
                comm2.onInitialized = undefined;
                // flush any queued up messages
                for (var _i = 0, queuedMessages_1 = queuedMessages; _i < queuedMessages_1.length; _i++) {
                    var dataPackage = queuedMessages_1[_i];
                    comm2.postMessage(dataPackage);
                }
                // Have each side simply pass packages to the other side untouched
                comm1.handleDataPackage = function (dataPackage) {
                    comm2.postMessage(dataPackage);
                };
                comm2.handleDataPackage = function (dataPackage) {
                    comm1.postMessage(dataPackage);
                };
            };
        };
    }
    return CommunicatorPassthrough;
}());
exports.CommunicatorPassthrough = CommunicatorPassthrough;

},{"./communicator":5}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var messageHandler_1 = require("./messageHandler");
// Communication manager class for handling message passing between windows
var IFrameMessageHandler = (function (_super) {
    __extends(IFrameMessageHandler, _super);
    function IFrameMessageHandler(getOtherWindow) {
        var _this = _super.call(this) || this;
        _this.getOtherWindow = getOtherWindow;
        _this.initMessageHandler();
        window.addEventListener("message", _this.messageHandler);
        return _this;
    }
    IFrameMessageHandler.prototype.initMessageHandler = function () {
        var _this = this;
        this.messageHandler = function (event) {
            _this.onMessageReceived(event.data);
            // Since the message was correctly handled, we don't want any pre-established handlers getting called
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            else {
                event.cancelBubble = true;
            }
        };
    };
    IFrameMessageHandler.prototype.sendMessage = function (dataString) {
        var otherWindow = this.getOtherWindow();
        otherWindow.postMessage(dataString, "*");
    };
    IFrameMessageHandler.prototype.tearDown = function () {
        window.removeEventListener("message", this.messageHandler);
    };
    return IFrameMessageHandler;
}(messageHandler_1.MessageHandler));
exports.IFrameMessageHandler = IFrameMessageHandler;

},{"./messageHandler":8}],8:[function(require,module,exports){
"use strict";
var MessageHandler = (function () {
    function MessageHandler() {
    }
    /*
     * Event handler that the Communicator uses to know when this MessageHandler received a message
     */
    MessageHandler.prototype.onMessageReceived = function (data) {
        // This method is overwritten by the parent Communicator
        // Should be called when this MessageHandler receives a message
    };
    return MessageHandler;
}());
exports.MessageHandler = MessageHandler;

},{}],9:[function(require,module,exports){
"use strict";
var SmartValue = (function () {
    function SmartValue(t) {
        this.subscriptions = [];
        this.t = t;
    }
    SmartValue.prototype.subscribe = function (func, options) {
        if (options === void 0) { options = {}; }
        // Setup the defaults if they weren't specified
        if (options.times === undefined) {
            options.times = Infinity;
        }
        if (options.callOnSubscribe === undefined) {
            options.callOnSubscribe = true;
        }
        if (options.callOnSubscribe) {
            func(this.t);
        }
        if (options.times > 0) {
            this.subscriptions.push({ func: func, times: options.times });
        }
    };
    SmartValue.prototype.unsubscribe = function (func) {
        for (var i = 0; i < this.subscriptions.length; i++) {
            if (func === this.subscriptions[i].func) {
                this.subscriptions.splice(i, 1);
                return;
            }
        }
    };
    SmartValue.prototype.set = function (t) {
        if (this.t !== t) {
            this.t = t;
            this.notifySubscribers();
        }
        return this;
    };
    SmartValue.prototype.get = function () {
        return this.t;
    };
    SmartValue.prototype.forceUpdate = function () {
        this.notifySubscribers();
    };
    SmartValue.prototype.equals = function (t) {
        return this.t === t;
    };
    SmartValue.prototype.toString = function () {
        return !this.t ? "undefined" : this.t.toString();
    };
    SmartValue.prototype.notifySubscribers = function () {
        var numSubscribers = this.subscriptions.length;
        for (var i = 0; i < numSubscribers; i++) {
            this.subscriptions[i].times--;
            this.subscriptions[i].func(this.t);
            var noMoreExecutions = this.subscriptions[i] && this.subscriptions[i].times === 0;
            if (noMoreExecutions) {
                this.subscriptions.splice(i, 1);
            }
            // We check for undefined as the callback could have called unsubscribe
            if (!this.subscriptions[i] || noMoreExecutions) {
                numSubscribers--;
                i--;
            }
        }
    };
    // Subscribe to multiple SVs.
    // Example:
    // var appleColor: SmartValue<string>;
    // var appleCount: SmartValue<number>;
    // Subscribe( [appleColor, appleCount], function(color, count) { /*Do something*/});
    SmartValue.subscribe = function (values, func) {
        for (var i = 0; i < values.length; i++) {
            values[i].subscribe(function () {
                var currValues = [];
                for (var j = 0; j < values.length; j++) {
                    currValues.push(values[j].get());
                }
                // ReSharper disable once SuspiciousThisUsage
                func.apply(this, currValues);
            });
        }
    };
    return SmartValue;
}());
exports.SmartValue = SmartValue;

},{}],10:[function(require,module,exports){
"use strict";
var Constants;
(function (Constants) {
    var Classes;
    (function (Classes) {
        // animators
        Classes.heightAnimator = "height-animator";
        Classes.panelAnimator = "panel-animator";
        Classes.clearfix = "clearfix";
        // changeLogPanel
        Classes.change = "change";
        Classes.changes = "changes";
        Classes.changeBody = "change-body";
        Classes.changeDescription = "change-description";
        Classes.changeImage = "change-image";
        Classes.changeTitle = "change-title";
        // checkbox
        Classes.checkboxCheck = "checkboxCheck";
        // textArea input control
        Classes.textAreaInput = "textAreaInput";
        Classes.textAreaInputMirror = "textAreaInputMirror";
        // popover
        Classes.popover = "popover";
        Classes.popoverArrow = "popover-arrow";
        // previewViewer
        Classes.deleteHighlightButton = "delete-highlight";
        Classes.highlightable = "highlightable";
        Classes.highlighted = "highlighted";
        Classes.regionSelection = "region-selection";
        Classes.regionSelectionImage = "region-selection-image";
        Classes.regionSelectionRemoveButton = "region-selection-remove-button";
        // pdfPreviewViewer
        Classes.attachmentOverlay = "attachment-overlay";
        Classes.centeredInCanvas = "centered-in-canvas";
        Classes.overlay = "overlay";
        Classes.overlayHidden = "overlay-hidden";
        Classes.overlayNumber = "overlay-number";
        Classes.pdfPreviewImage = "pdf-preview-image";
        Classes.pdfPreviewImageCanvas = "pdf-preview-image-canvas";
        Classes.unselected = "unselected";
        Classes.localPdfPanelTitle = "local-pdf-panel-title";
        Classes.localPdfPanelSubtitle = "local-pdf-panel-subtitle";
        // radioButton
        Classes.radioIndicatorFill = "radio-indicator-fill";
        // spriteAnimation
        Classes.spinner = "spinner";
        // Accessibility 
        Classes.srOnly = "sr-only";
        // tooltip
        Classes.tooltip = "tooltip";
        // rotatingMessageSpriteAnimation
        Classes.centeredInPreview = "centered-in-preview";
    })(Classes = Constants.Classes || (Constants.Classes = {}));
    var Cookies;
    (function (Cookies) {
        Cookies.clipperInfo = "ClipperInfo";
    })(Cookies = Constants.Cookies || (Constants.Cookies = {}));
    var Extension;
    (function (Extension) {
        var NotificationIds;
        (function (NotificationIds) {
            NotificationIds.conflictingExtension = "conflictingExtension";
        })(NotificationIds = Extension.NotificationIds || (Extension.NotificationIds = {}));
    })(Extension = Constants.Extension || (Constants.Extension = {}));
    var Ids;
    (function (Ids) {
        // annotationInput
        Ids.annotationContainer = "annotationContainer";
        Ids.annotationField = "annotationField";
        Ids.annotationFieldMirror = "annotationFieldMirror";
        Ids.annotationPlaceholder = "annotationPlaceholder";
        // bookmarkPreview
        Ids.bookmarkThumbnail = "bookmarkThumbnail";
        Ids.bookmarkPreviewContentContainer = "bookmarkPreviewContentContainer";
        Ids.bookmarkPreviewInnerContainer = "bookmarkPreviewInnerContainer";
        // clippingPanel
        Ids.clipperApiProgressContainer = "clipperApiProgressContainer";
        // clippingPanel
        Ids.clipProgressDelayedMessage = "clipProgressDelayedMessage";
        Ids.clipProgressIndicatorMessage = "clipProgressIndicatorMessage";
        // dialogPanel
        Ids.dialogBackButton = "dialogBackButton";
        Ids.dialogButtonContainer = "dialogButtonContainer";
        Ids.dialogDebugMessageContainer = "dialogDebugMessageContainer";
        Ids.dialogMessageContainer = "dialogMessageContainer";
        Ids.dialogContentContainer = "dialogContentContainer";
        Ids.dialogMessage = "dialogMessage";
        Ids.dialogSignOutButton = "dialogSignoutButton";
        Ids.dialogTryAgainButton = "dialogTryAgainButton";
        // editorPreviewComponentBase
        Ids.highlightablePreviewBody = "highlightablePreviewBody";
        // failurePanel
        Ids.apiErrorMessage = "apiErrorMessage";
        Ids.backToHomeButton = "backToHomeButton";
        Ids.clipperFailureContainer = "clipperFailureContainer";
        Ids.refreshPageButton = "refreshPageButton";
        Ids.tryAgainButton = "tryAgainButton";
        // footer
        Ids.clipperFooterContainer = "clipperFooterContainer";
        Ids.currentUserControl = "currentUserControl";
        Ids.currentUserDetails = "currentUserDetails";
        Ids.currentUserEmail = "currentUserEmail";
        Ids.currentUserId = "currentUserId";
        Ids.currentUserName = "currentUserName";
        Ids.feedbackButton = "feedbackButton";
        Ids.feedbackImage = "feedbackImage";
        Ids.signOutButton = "signOutButton";
        Ids.userDropdownArrow = "userDropdownArrow";
        Ids.userSettingsContainer = "userSettingsContainer";
        Ids.feedbackLabel = "feedbackLabel";
        Ids.footerButtonsContainer = "footerButtonsContainer";
        // loadingPanel
        Ids.clipperLoadingContainer = "clipperLoadingContainer";
        // mainController
        Ids.closeButton = "closeButton";
        Ids.closeButtonContainer = "closeButtonContainer";
        Ids.mainController = "mainController";
        // OneNotePicker
        Ids.saveToLocationContainer = "saveToLocationContainer";
        // optionsPanel
        Ids.clipButton = "clipButton";
        Ids.clipButtonContainer = "clipButtonContainer";
        Ids.optionLabel = "optionLabel";
        // previewViewerPdfHeader
        Ids.radioAllPagesLabel = "radioAllPagesLabel";
        Ids.radioPageRangeLabel = "radioPageRangeLabel";
        Ids.rangeInput = "rangeInput";
        // previewViewer
        Ids.previewBody = "previewBody";
        Ids.previewContentContainer = "previewContentContainer";
        Ids.previewHeader = "previewHeader";
        Ids.previewHeaderContainer = "previewHeaderContainer";
        Ids.previewHeaderInput = "previewHeaderInput";
        Ids.previewHeaderInputMirror = "previewHeaderInputMirror";
        Ids.previewTitleContainer = "previewTitleContainer";
        Ids.previewSubtitleContainer = "previewSubtitleContainer";
        Ids.previewInnerContainer = "previewInnerContainer";
        Ids.previewOptionsContainer = "previewOptionsContainer";
        Ids.previewInnerWrapper = "previewInnerWrapper";
        Ids.previewOuterContainer = "previewOuterContainer";
        Ids.previewUrlContainer = "previewUrlContainer";
        Ids.previewNotesContainer = "previewNotesContainer";
        // previewViewerFullPageHeader
        Ids.fullPageControl = "fullPageControl";
        Ids.fullPageHeaderTitle = "fullPageHeaderTitle";
        // previewViewerPdfHeader
        Ids.localPdfFileTitle = "localPdfFileTitle";
        Ids.pdfControl = "pdfControl";
        Ids.pdfHeaderTitle = "pdfHeaderTitle";
        Ids.pageRangeControl = "pageRangeControl";
        // pdfClipOptions
        Ids.checkboxToDistributePages = "checkboxToDistributePages";
        Ids.pdfIsTooLargeToAttachIndicator = "pdfIsTooLargeToAttachIndicator";
        Ids.checkboxToAttachPdf = "checkboxToAttachPdf";
        Ids.moreClipOptions = "moreClipOptions";
        // previewViewerRegionHeader
        Ids.addAnotherRegionButton = "addAnotherRegionButton";
        Ids.addRegionControl = "addRegionControl";
        // previewViewerRegionTitleOnlyHeader
        Ids.regionControl = "regionControl";
        Ids.regionHeaderTitle = "regionHeaderTitle";
        // previewViewerAugmentationHeader
        Ids.decrementFontSize = "decrementFontSize";
        Ids.fontSizeControl = "fontSizeControl";
        Ids.highlightButton = "highlightButton";
        Ids.highlightControl = "highlightControl";
        Ids.incrementFontSize = "incrementFontSize";
        Ids.serifControl = "serifControl";
        Ids.sansSerif = "sansSerif";
        Ids.serif = "serif";
        // previewViewerBookmarkHeader
        Ids.bookmarkControl = "bookmarkControl";
        Ids.bookmarkHeaderTitle = "bookmarkHeaderTitle";
        // ratingsPrompt
        Ids.ratingsButtonFeedbackNo = "ratingsButtonFeedbackNo";
        Ids.ratingsButtonFeedbackYes = "ratingsButtonFeedbackYes";
        Ids.ratingsButtonInitNo = "ratingsButtonInitNo";
        Ids.ratingsButtonInitYes = "ratingsButtonInitYes";
        Ids.ratingsButtonRateNo = "ratingsButtonRateNo";
        Ids.ratingsButtonRateYes = "ratingsButtonRateYes";
        Ids.ratingsPromptContainer = "ratingsPromptContainer";
        // regionSelectingPanel
        Ids.regionInstructionsContainer = "regionInstructionsContainer";
        Ids.regionClipCancelButton = "regionClipCancelButton";
        // regionSelector
        Ids.innerFrame = "innerFrame";
        Ids.outerFrame = "outerFrame";
        Ids.regionSelectorContainer = "regionSelectorContainer";
        // rotatingMessageSpriteAnimation
        Ids.spinnerText = "spinnerText";
        // sectionPicker
        Ids.locationPickerContainer = "locationPickerContainer";
        // signInPanel
        Ids.signInButtonMsa = "signInButtonMsa";
        Ids.signInButtonOrgId = "signInButtonOrgId";
        Ids.signInContainer = "signInContainer";
        Ids.signInErrorCookieInformation = "signInErrorCookieInformation";
        Ids.signInErrorDebugInformation = "signInErrorDebugInformation";
        Ids.signInErrorDebugInformationDescription = "signInErrorDebugInformationDescription";
        Ids.signInErrorDebugInformationContainer = "signInErrorDebugInformationContainer";
        Ids.signInErrorDebugInformationList = "signInErrorDebugInformationList";
        Ids.signInErrorDescription = "signInErrorDescription";
        Ids.signInErrorDescriptionContainer = "signInErrorDescriptionContainer";
        Ids.signInErrorMoreInformation = "signInErrorMoreInformation";
        Ids.signInLogo = "signInLogo";
        Ids.signInMessageLabelContainer = "signInMessageLabelContainer";
        Ids.signInText = "signInText";
        Ids.signInToggleErrorDropdownArrow = "signInToggleErrorDropdownArrow";
        Ids.signInToggleErrorInformationText = "signInToggleErrorInformationText";
        // successPanel
        Ids.clipperSuccessContainer = "clipperSuccessContainer";
        Ids.launchOneNoteButton = "launchOneNoteButton";
        // tooltipRenderer
        Ids.pageNavAnimatedTooltip = "pageNavAnimatedTooltip";
        // unsupportedBrowser
        Ids.unsupportedBrowserContainer = "unsupportedBrowserContainer";
        Ids.unsupportedBrowserPanel = "unsupportedBrowserPanel";
        // whatsNewPanel
        Ids.changeLogSubPanel = "changeLogSubPanel";
        Ids.checkOutWhatsNewButton = "checkOutWhatsNewButton";
        Ids.proceedToWebClipperButton = "proceedToWebClipperButton";
        Ids.whatsNewTitleSubPanel = "whatsNewTitleSubPanel";
        Ids.clipperRootScript = "oneNoteCaptureRootScript";
        Ids.clipperUiFrame = "oneNoteWebClipper";
        Ids.clipperPageNavFrame = "oneNoteWebClipperPageNav";
        Ids.clipperExtFrame = "oneNoteWebClipperExtension";
        // tooltips
        Ids.brandingContainer = "brandingContainer";
    })(Ids = Constants.Ids || (Constants.Ids = {}));
    var HeaderValues;
    (function (HeaderValues) {
        HeaderValues.accept = "Accept";
        HeaderValues.appIdKey = "MS-Int-AppId";
        HeaderValues.correlationId = "X-CorrelationId";
        HeaderValues.noAuthKey = "X-NoAuth";
        HeaderValues.userSessionIdKey = "X-UserSessionId";
    })(HeaderValues = Constants.HeaderValues || (Constants.HeaderValues = {}));
    var CommunicationChannels;
    (function (CommunicationChannels) {
        // Debug Logging
        CommunicationChannels.debugLoggingInjectedAndExtension = "DEBUGLOGGINGINJECTED_AND_EXTENSION";
        // Web Clipper
        CommunicationChannels.extensionAndUi = "EXTENSION_AND_UI";
        CommunicationChannels.injectedAndUi = "INJECTED_AND_UI";
        CommunicationChannels.injectedAndExtension = "INJECTED_AND_EXTENSION";
        // What's New
        CommunicationChannels.extensionAndPageNavUi = "EXTENSION_AND_PAGENAVUI";
        CommunicationChannels.pageNavInjectedAndPageNavUi = "PAGENAVINJECTED_AND_PAGENAVUI";
        CommunicationChannels.pageNavInjectedAndExtension = "PAGENAVINJECTED_AND_EXTENSION";
    })(CommunicationChannels = Constants.CommunicationChannels || (Constants.CommunicationChannels = {}));
    var FunctionKeys;
    (function (FunctionKeys) {
        FunctionKeys.clipperStrings = "CLIPPER_STRINGS";
        FunctionKeys.clipperStringsFrontLoaded = "CLIPPER_STRINGS_FRONT_LOADED";
        FunctionKeys.closePageNavTooltip = "CLOSE_PAGE_NAV_TOOLTIP";
        FunctionKeys.createHiddenIFrame = "CREATE_HIDDEN_IFRAME";
        FunctionKeys.ensureFreshUserBeforeClip = "ENSURE_FRESH_USER_BEFORE_CLIP";
        FunctionKeys.escHandler = "ESC_HANDLER";
        FunctionKeys.getInitialUser = "GET_INITIAL_USER";
        FunctionKeys.getPageNavTooltipProps = "GET_PAGE_NAV_TOOLTIP_PROPS";
        FunctionKeys.getStorageValue = "GET_STORAGE_VALUE";
        FunctionKeys.getMultipleStorageValues = "GET_MULTIPLE_STORAGE_VALUES";
        FunctionKeys.getTooltipToRenderInPageNav = "GET_TOOLTIP_TO_RENDER_IN_PAGE_NAV";
        FunctionKeys.hideUi = "HIDE_UI";
        FunctionKeys.invokeClipper = "INVOKE_CLIPPER";
        FunctionKeys.invokeClipperFromPageNav = "INVOKE_CLIPPER_FROM_PAGE_NAV";
        FunctionKeys.invokeDebugLogging = "INVOKE_DEBUG_LOGGING";
        FunctionKeys.invokePageNav = "INVOKE_PAGE_NAV";
        FunctionKeys.extensionNotAllowedToAccessLocalFiles = "EXTENSION_NOT_ALLOWED_TO_ACCESS_LOCAL_FILES";
        FunctionKeys.noOpTracker = "NO_OP_TRACKER";
        FunctionKeys.onSpaNavigate = "ON_SPA_NAVIGATE";
        FunctionKeys.refreshPage = "REFRESH_PAGE";
        FunctionKeys.showRefreshClipperMessage = "SHOW_REFRESH_CLIPPER_MESSAGE";
        FunctionKeys.setInjectOptions = "SET_INJECT_OPTIONS";
        FunctionKeys.setInvokeOptions = "SET_INVOKE_OPTIONS";
        FunctionKeys.setStorageValue = "SET_STORAGE_VALUE";
        FunctionKeys.signInUser = "SIGN_IN_USER";
        FunctionKeys.signOutUser = "SIGN_OUT_USER";
        FunctionKeys.tabToLowestIndexedElement = "TAB_TO_LOWEST_INDEXED_ELEMENT";
        FunctionKeys.takeTabScreenshot = "TAKE_TAB_SCREENSHOT";
        FunctionKeys.telemetry = "TELEMETRY";
        FunctionKeys.toggleClipper = "TOGGLE_CLIPPER";
        FunctionKeys.unloadHandler = "UNLOAD_HANDLER";
        FunctionKeys.updateFrameHeight = "UPDATE_FRAME_HEIGHT";
        FunctionKeys.updatePageInfoIfUrlChanged = "UPDATE_PAGE_INFO_IF_URL_CHANGED";
    })(FunctionKeys = Constants.FunctionKeys || (Constants.FunctionKeys = {}));
    var KeyCodes;
    (function (KeyCodes) {
        // event.which is deprecated -.-
        KeyCodes.tab = 9;
        KeyCodes.enter = 13;
        KeyCodes.esc = 27;
        KeyCodes.c = 67;
        KeyCodes.down = 40;
        KeyCodes.up = 38;
        KeyCodes.left = 37;
        KeyCodes.right = 39;
        KeyCodes.space = 32;
        KeyCodes.home = 36;
        KeyCodes.end = 35;
    })(KeyCodes = Constants.KeyCodes || (Constants.KeyCodes = {}));
    var StringKeyCodes;
    (function (StringKeyCodes) {
        StringKeyCodes.c = "KeyC";
    })(StringKeyCodes = Constants.StringKeyCodes || (Constants.StringKeyCodes = {}));
    var SmartValueKeys;
    (function (SmartValueKeys) {
        SmartValueKeys.clientInfo = "CLIENT_INFO";
        SmartValueKeys.isFullScreen = "IS_FULL_SCREEN";
        SmartValueKeys.pageInfo = "PAGE_INFO";
        SmartValueKeys.sessionId = "SESSION_ID";
        SmartValueKeys.user = "USER";
    })(SmartValueKeys = Constants.SmartValueKeys || (Constants.SmartValueKeys = {}));
    var Styles;
    (function (Styles) {
        Styles.sectionPickerContainerHeight = 280;
        Styles.clipperUiWidth = 322;
        Styles.clipperUiTopRightOffset = 20;
        Styles.clipperUiDropShadowBuffer = 7;
        Styles.clipperUiInnerPadding = 30;
        var Colors;
        (function (Colors) {
            Colors.oneNoteHighlightColor = "#fefe56";
        })(Colors = Styles.Colors || (Styles.Colors = {}));
    })(Styles = Constants.Styles || (Constants.Styles = {}));
    var Urls;
    (function (Urls) {
        Urls.serviceDomain = "https://www.onenote.com";
        Urls.augmentationApiUrl = Urls.serviceDomain + "/onaugmentation/clipperextract/v1.0/";
        Urls.changelogUrl = Urls.serviceDomain + "/whatsnext/webclipper";
        Urls.clipperFeedbackUrl = Urls.serviceDomain + "/feedback";
        Urls.clipperInstallPageUrl = Urls.serviceDomain + "/clipper/installed";
        Urls.fullPageScreenshotUrl = Urls.serviceDomain + "/onaugmentation/clipperDomEnhancer/v1.0/";
        Urls.localizedStringsUrlBase = Urls.serviceDomain + "/strings?ids=WebClipper.";
        Urls.msaDomain = "https://login.live.com";
        Urls.orgIdDomain = "https://login.microsoftonline.com";
        var Authentication;
        (function (Authentication) {
            Authentication.authRedirectUrl = Urls.serviceDomain + "/webclipper/auth";
            Authentication.signInUrl = Urls.serviceDomain + "/webclipper/signin";
            Authentication.signOutUrl = Urls.serviceDomain + "/webclipper/signout";
            Authentication.userInformationUrl = Urls.serviceDomain + "/webclipper/userinfo";
        })(Authentication = Urls.Authentication || (Urls.Authentication = {}));
        var QueryParams;
        (function (QueryParams) {
            QueryParams.authType = "authType";
            QueryParams.category = "category";
            QueryParams.changelogLocale = "omkt";
            QueryParams.channel = "channel";
            QueryParams.clientType = "clientType";
            QueryParams.clipperId = "clipperId";
            QueryParams.clipperVersion = "clipperVersion";
            QueryParams.correlationId = "correlationId";
            QueryParams.error = "error";
            QueryParams.errorDescription = "error_?description";
            QueryParams.event = "event";
            QueryParams.eventName = "eventName";
            QueryParams.failureId = "failureId";
            QueryParams.failureInfo = "failureInfo";
            QueryParams.failureType = "failureType";
            QueryParams.inlineInstall = "inlineInstall";
            QueryParams.label = "label";
            QueryParams.noOpType = "noOpType";
            QueryParams.stackTrace = "stackTrace";
            QueryParams.timeoutInMs = "timeoutInMs";
            QueryParams.url = "url";
            QueryParams.userSessionId = "userSessionId";
            QueryParams.wdFromClipper = "wdfromclipper"; // This naming convention is standard in OneNote Online
        })(QueryParams = Urls.QueryParams || (Urls.QueryParams = {}));
    })(Urls = Constants.Urls || (Constants.Urls = {}));
    var LogCategories;
    (function (LogCategories) {
        LogCategories.oneNoteClipperUsage = "OneNoteClipperUsage";
    })(LogCategories = Constants.LogCategories || (Constants.LogCategories = {}));
    var Settings;
    (function (Settings) {
        Settings.fontSizeStep = 2;
        Settings.maxClipSuccessForRatingsPrompt = 12;
        Settings.maximumJSTimeValue = 1000 * 60 * 60 * 24 * 100000000; // 100M days in milliseconds, http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
        Settings.maximumFontSize = 72;
        Settings.maximumNumberOfTimesToShowTooltips = 3;
        Settings.maximumMimeSizeLimit = 24900000;
        Settings.minClipSuccessForRatingsPrompt = 4;
        Settings.minimumFontSize = 8;
        Settings.minTimeBetweenBadRatings = 1000 * 60 * 60 * 24 * 7 * 10; // 10 weeks
        Settings.noOpTrackerTimeoutDuration = 20 * 1000; // 20 seconds
        Settings.numRetriesPerPatchRequest = 3;
        Settings.pdfCheckCreatePageInterval = 2000; // 2 seconds
        Settings.pdfClippingMessageDelay = 5000; // 5 seconds
        Settings.pdfExtraPageLoadEachSide = 1;
        Settings.pdfInitialPageLoadCount = 3;
        Settings.timeBetweenDifferentTooltips = 1000 * 60 * 60 * 24 * 7 * 1; // 1 week
        Settings.timeBetweenSameTooltip = 1000 * 60 * 60 * 24 * 7 * 3; // 3 weeks
        Settings.timeBetweenTooltips = 1000 * 60 * 60 * 24 * 7 * 3; // 21 days
        Settings.timeUntilPdfPageNumbersFadeOutAfterScroll = 1000; // 1 second
    })(Settings = Constants.Settings || (Constants.Settings = {}));
    var CustomHtmlAttributes;
    (function (CustomHtmlAttributes) {
        CustomHtmlAttributes.setNameForArrowKeyNav = "setnameforarrowkeynav";
    })(CustomHtmlAttributes = Constants.CustomHtmlAttributes || (Constants.CustomHtmlAttributes = {}));
    var AriaSet;
    (function (AriaSet) {
        AriaSet.modeButtonSet = "ariaModeButtonSet";
        AriaSet.pdfPageSelection = "pdfPageSelection";
        AriaSet.serifGroupSet = "serifGroupSet";
    })(AriaSet = Constants.AriaSet || (Constants.AriaSet = {}));
})(Constants = exports.Constants || (exports.Constants = {}));

},{}],11:[function(require,module,exports){
"use strict";
var objectUtils_1 = require("./objectUtils");
var CookieUtils = (function () {
    function CookieUtils() {
    }
    CookieUtils.readCookie = function (cookieName, doc) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(doc)) {
            doc = document;
        }
        var cookieKVPairs = document.cookie.split(";").map(function (kvPair) { return kvPair.split("="); });
        for (var _i = 0, cookieKVPairs_1 = cookieKVPairs; _i < cookieKVPairs_1.length; _i++) {
            var cookie = cookieKVPairs_1[_i];
            if (cookie[0].trim() === cookieName) {
                return cookie[1].trim();
            }
        }
    };
    return CookieUtils;
}());
exports.CookieUtils = CookieUtils;

},{"./objectUtils":60}],12:[function(require,module,exports){
"use strict";
var khanAcademyVideoExtractor_1 = require("./khanAcademyVideoExtractor");
var videoUtils_1 = require("./videoUtils");
var vimeoVideoExtractor_1 = require("./vimeoVideoExtractor");
var YoutubeVideoExtractor_1 = require("./YoutubeVideoExtractor");
/**
 * Factory class to return a domain specific video extractor given a Domain
 * The video extractor examines pageInfo and returns data about the videos on the page
 * to be used in the preview and posting to OneNote
 */
var VideoExtractorFactory;
(function (VideoExtractorFactory) {
    function createVideoExtractor(domain) {
        // shorter typename
        var domains = videoUtils_1.SupportedVideoDomains;
        switch (domain) {
            case domains.KhanAcademy:
                return new khanAcademyVideoExtractor_1.KhanAcademyVideoExtractor();
            case domains.Vimeo:
                return new vimeoVideoExtractor_1.VimeoVideoExtractor();
            case domains.YouTube:
                return new YoutubeVideoExtractor_1.YoutubeVideoExtractor();
            default:
                return;
        }
    }
    VideoExtractorFactory.createVideoExtractor = createVideoExtractor;
})(VideoExtractorFactory = exports.VideoExtractorFactory || (exports.VideoExtractorFactory = {}));

},{"./YoutubeVideoExtractor":13,"./khanAcademyVideoExtractor":15,"./videoUtils":17,"./vimeoVideoExtractor":18}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var domUtils_1 = require("./domUtils");
var videoExtractor_1 = require("./videoExtractor");
var urlUtils_1 = require("../urlUtils");
var YoutubeVideoExtractor = (function (_super) {
    __extends(YoutubeVideoExtractor, _super);
    function YoutubeVideoExtractor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.youTubeWatchVideoBaseUrl = "https://www.youtube.com/watch";
        _this.youTubeVideoIdQueryKey = "v";
        _this.dataOriginalSrcAttribute = "data-original-src";
        return _this;
    }
    YoutubeVideoExtractor.prototype.createEmbeddedVideosFromHtml = function (html) {
        if (!html) {
            return [];
        }
        var divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        var allIframes = divContainer.getElementsByTagName("iframe");
        var videoEmbeds = [];
        for (var i = 0; i < allIframes.length; i++) {
            if (this.isYoutubeUrl(allIframes[i].src)) {
                var videoEmbed = this.createEmbeddedVideoFromUrl(allIframes[i].src);
                if (videoEmbed) {
                    videoEmbeds.push(videoEmbed);
                }
            }
        }
        return videoEmbeds;
    };
    YoutubeVideoExtractor.prototype.isYoutubeUrl = function (url) {
        return /[^\w]youtube\.com\/watch(\?v=(\w+)|.*\&v=(\w+))/.test(url) || /[^\w]youtube\.com\/embed\/(\w+)/.test(url);
    };
    YoutubeVideoExtractor.prototype.createEmbeddedVideoFromUrl = function (url) {
        if (!url) {
            return undefined;
        }
        if (urlUtils_1.UrlUtils.getPathname(url).indexOf("/watch") === 0) {
            return this.createEmbeddedVideoFromId(urlUtils_1.UrlUtils.getQueryValue(url, this.youTubeVideoIdQueryKey));
        }
        if (urlUtils_1.UrlUtils.getPathname(url).indexOf("/embed") === 0) {
            var youTubeIdMatch = url.match(/youtube\.com\/embed\/([^?|\/?]+)/);
            return this.createEmbeddedVideoFromId(youTubeIdMatch[1]);
        }
        return undefined;
    };
    YoutubeVideoExtractor.prototype.createEmbeddedVideoFromId = function (id) {
        if (!id) {
            return undefined;
        }
        var videoEmbed = domUtils_1.DomUtils.createEmbedVideoIframe();
        var src = "https://www.youtube.com/embed/" + id;
        videoEmbed.src = src;
        var dataOriginalSrc = urlUtils_1.UrlUtils.addUrlQueryValue(this.youTubeWatchVideoBaseUrl, this.youTubeVideoIdQueryKey, id);
        videoEmbed.setAttribute(this.dataOriginalSrcAttribute, dataOriginalSrc);
        return videoEmbed;
    };
    return YoutubeVideoExtractor;
}(videoExtractor_1.VideoExtractor));
exports.YoutubeVideoExtractor = YoutubeVideoExtractor;

},{"../urlUtils":71,"./domUtils":14,"./videoExtractor":16}],14:[function(require,module,exports){
"use strict";
var constants_1 = require("../constants");
var objectUtils_1 = require("../objectUtils");
var videoUtils_1 = require("./videoUtils");
var VideoExtractorFactory_1 = require("./VideoExtractorFactory");
/**
 * Dom specific Helper utility methods
 */
var DomUtils = (function () {
    function DomUtils() {
    }
    /**
     * Given an HTML Document in string form, return an HTML Document in string form
     * with the attributes and the content between the HTML tags scrubbed, while preserving
     * document structure
     */
    DomUtils.cleanHtml = function (contentInHtml) {
        var allAttributes = [];
        for (var key in DomUtils.attributesAllowedByOnml) {
            if (DomUtils.attributesAllowedByOnml.hasOwnProperty(key)) {
                allAttributes = allAttributes.concat(DomUtils.attributesAllowedByOnml[key]);
            }
        }
        var tags = DomUtils.htmlTags.concat(DomUtils.markupTags).concat(DomUtils.tableTags);
        var sanitizedHtml = sanitizeHtml(contentInHtml, {
            allowedTags: tags,
            allowedAttributes: DomUtils.attributesAllowedByOnml,
            allowedSchemes: sanitizeHtml.defaults.allowedSchemes.concat(["data"]),
            allowedClasses: {
                "*": ["MainArticleContainer"]
            }
        });
        return sanitizedHtml;
    };
    /**
     * Many extensions inject their own stylings into the page, and generally that isn't a problem. But,
     * occasionally the styling includes a specific font, which can be very, very large. This method
     * removes any base64 encoded binaries defined in any <style> tags.
     */
    DomUtils.removeStylesWithBase64EncodedBinaries = function (doc) {
        DomUtils.domReplacer(doc, "style", function (node) {
            return node.innerHTML.indexOf("data:application") !== -1 ? undefined : node;
        });
    };
    DomUtils.removeElementsNotSupportedInOnml = function (doc) {
        // For elements that cannot be converted into something equivalent in ONML, we remove them ...
        DomUtils.domReplacer(doc, DomUtils.tagsNotSupportedInOnml.join());
        var tagsToTurnIntoDiv = [DomUtils.tags.main, DomUtils.tags.article, DomUtils.tags.figure, DomUtils.tags.header, DomUtils.tags.center];
        // ... and for everything else, we replace them with an equivalent, preserving the inner HTML
        DomUtils.domReplacer(doc, tagsToTurnIntoDiv.join(), function (node) {
            var div = document.createElement("div");
            div.innerHTML = DomUtils.cleanHtml(node.innerHTML);
            return div;
        });
    };
    DomUtils.domReplacer = function (doc, querySelector, getReplacement) {
        if (getReplacement === void 0) { getReplacement = function () { return undefined; }; }
        var nodes = doc.querySelectorAll(querySelector);
        for (var i = 0; i < nodes.length; i++) {
            var oldNode = nodes[i];
            try {
                var newNode = getReplacement(oldNode, i);
                if (!newNode) {
                    oldNode.parentNode.removeChild(oldNode);
                }
                else if (oldNode !== newNode) {
                    oldNode.parentNode.replaceChild(newNode, oldNode);
                }
            }
            catch (e) {
            }
        }
    };
    DomUtils.domReplacerAsync = function (doc, querySelector, getReplacement) {
        if (getReplacement === void 0) { getReplacement = function () { return Promise.resolve(undefined); }; }
        return new Promise(function (resolve) {
            var nodes = doc.querySelectorAll(querySelector);
            var doneCount = 0;
            if (nodes.length === 0) {
                resolve();
            }
            var _loop_1 = function (i) {
                var oldNode = nodes[i];
                getReplacement(oldNode, i).then(function (newNode) {
                    if (!newNode) {
                        oldNode.parentNode.removeChild(oldNode);
                    }
                    else if (oldNode !== newNode) {
                        oldNode.parentNode.replaceChild(newNode, oldNode);
                    }
                }, function () {
                    // There are some cases (like dirty canvases) where running replace will throw an error.
                    // We catch it, thus leaving the original.
                }).then(function () {
                    if (++doneCount === nodes.length) {
                        resolve();
                    }
                });
            };
            for (var i = 0; i < nodes.length; i++) {
                _loop_1(i);
            }
        });
    };
    /**
     * Gets the content type of the page based on the embed tags on the page
     * returns ClipTypes.EnhancedUrl if there's an embed tag of type application/pdf
     * else returns ClipTypes.Html
     */
    DomUtils.getPageContentType = function (doc) {
        var anchor = doc.createElement("a");
        anchor.href = doc.URL;
        if (/\.pdf$/i.test(anchor.pathname)) {
            return OneNoteApi.ContentType.EnhancedUrl;
        }
        // Check if there's a PDF embed element. We cast the element to any because the type
        // property is not recognized in Typescript despite being part of the HTML5 standard.
        // Additionally, Edge does not seem to respect this standard as of 10/13/16.
        var embedElement = doc.querySelector("embed");
        if (embedElement && /application\/pdf/i.test(embedElement.type)) {
            return OneNoteApi.ContentType.EnhancedUrl;
        }
        // Check if this was a PDF rendered with PDF.js. With PDF.js, the PDFJS object will be
        // added to the window object.
        if (window && window.PDFJS) {
            return OneNoteApi.ContentType.EnhancedUrl;
        }
        return OneNoteApi.ContentType.Html;
    };
    /**
     * Return the best CanonicalUrl for the document
     * Some sites mistakenly declare multiple canonical urls. Pick the shortest one.
     * (Most canonical urls involve stripping away directory index, fragments, query
     * variables etc. hence we pick the shortest one as it is likely to be correct.)
     */
    DomUtils.fetchCanonicalUrl = function (doc) {
        var canonicalLinkDeclarations = doc.querySelectorAll("link[rel=canonical]");
        if (canonicalLinkDeclarations.length === 0) {
            return doc.URL;
        }
        else {
            var shortestHref = canonicalLinkDeclarations[0].href;
            var currentHref = void 0;
            for (var i = 1; i < canonicalLinkDeclarations.length; i++) {
                currentHref = canonicalLinkDeclarations.item(i).href;
                if (currentHref.length < shortestHref.length) {
                    shortestHref = currentHref;
                }
            }
            return shortestHref;
        }
    };
    /**
     * Get a clone of the specified DOM, with our own UI and other unwanted tags removed, and as much CSS and canvas
     * inlining as possible given the API's upload size limitation. This does not affect the document passed into the
     * function.
     *
     * @returns The cleaned DOM
     */
    DomUtils.getCleanDomOfCurrentPage = function (originalDoc) {
        var doc = DomUtils.cloneDocument(originalDoc);
        DomUtils.convertCanvasElementsToImages(doc, originalDoc);
        DomUtils.addBaseTagIfNecessary(doc, originalDoc.location);
        DomUtils.addImageSizeInformationToDom(doc);
        DomUtils.removeUnwantedItems(doc);
        var domString = DomUtils.getDomString(doc);
        return domString;
    };
    DomUtils.removeUnwantedItems = function (doc) {
        DomUtils.removeStylesWithBase64EncodedBinaries(doc);
        DomUtils.removeClipperElements(doc);
        DomUtils.removeUnwantedElements(doc);
        DomUtils.removeUnwantedAttributes(doc);
        DomUtils.removeUnsupportedHrefs(doc);
    };
    /**
     * Adds any additional styling to the preview elements
     */
    DomUtils.addPreviewContainerStyling = function (previewElement) {
        // What this does is add a little extra padding after each of the paragraphs in an article. This
        // makes what we are saving into OneNote match what we see in the preview (which is how browsers
        // render the paragraph elements).
        previewElement.setAttribute("style", "margin-bottom: 16px");
    };
    /**
     * Add embedded videos to the article preview where supported
     */
    DomUtils.addEmbeddedVideosWhereSupported = function (previewElement, pageContent, pageUrl) {
        var supportedDomain = videoUtils_1.VideoUtils.videoDomainIfSupported(pageUrl);
        if (!supportedDomain) {
            return Promise.resolve();
        }
        var iframes = [];
        try {
            // Construct the appropriate videoExtractor based on the Domain we are on
            var domain = videoUtils_1.SupportedVideoDomains[supportedDomain];
            var extractor = VideoExtractorFactory_1.VideoExtractorFactory.createVideoExtractor(domain);
            // If we are on a Domain that has a valid VideoExtractor, get the embedded videos
            // to render them later
            if (extractor) {
                iframes = iframes.concat(extractor.createEmbeddedVideosFromPage(pageUrl, pageContent));
            }
        }
        catch (e) {
            // if we end up here, we're unexpectedly broken
            // (e.g, vimeo schema updated, we say we're supporting a domain we don't actually, etc)
            return Promise.reject({ error: JSON.stringify({ doc: previewElement.outerHTML, pageContent: pageContent, message: e.message }) });
        }
        return Promise.resolve(DomUtils.addVideosToElement(previewElement, iframes));
    };
    /**
     * Create base iframe with reasonable style properties for video embed in OneNote.
     */
    DomUtils.createEmbedVideoIframe = function () {
        var iframe = document.createElement("iframe");
        // these values must be set inline, else the embed in OneNote won't respect them
        // width and height set to preserve a 16:9 aspect ratio
        iframe.width = "600";
        iframe.height = "338";
        iframe.frameBorder = "0";
        iframe.allowFullscreen = false;
        return iframe;
    };
    /**
     * Add an array of iframes to the top of the article previewer.
     * Ordering of iframes in the array will be respected.
     */
    DomUtils.addVideosToElement = function (previewElement, iframeNodes) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(previewElement) || objectUtils_1.ObjectUtils.isNullOrUndefined(iframeNodes) || iframeNodes.length === 0) {
            return;
        }
        var videoSrcUrls = [];
        var lastInsertedNode;
        for (var _i = 0, iframeNodes_1 = iframeNodes; _i < iframeNodes_1.length; _i++) {
            var node = iframeNodes_1[_i];
            if (objectUtils_1.ObjectUtils.isNullOrUndefined(node.src) || objectUtils_1.ObjectUtils.isNullOrUndefined(node.getAttribute(DomUtils.dataOriginalSrcAttribute))) {
                // iframe constructed without a src or data-original-src attribute (somehow)
                // invalid construction, but we want record of it happening
                videoSrcUrls.push({ srcAttribute: "", dataOriginalSrcAttribute: "" });
                continue;
            }
            lastInsertedNode = DomUtils.insertIFrame(previewElement, node, lastInsertedNode);
            lastInsertedNode = DomUtils.insertSpacer(previewElement, lastInsertedNode.nextSibling);
            videoSrcUrls.push({ srcAttribute: node.src, dataOriginalSrcAttribute: node.getAttribute(DomUtils.dataOriginalSrcAttribute) });
        }
        return videoSrcUrls;
    };
    /**
     * Given an html element, insert a node at the top of it.
     * If lastInsertedNode provided, insert the node within the html element
     * but immediately after lastInsertedNode instead.
     */
    DomUtils.insertIFrame = function (container, newNode, lastInsertedNode) {
        var referenceNode;
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(lastInsertedNode)) {
            referenceNode = container.children[0]; // initial referenceNode
        }
        else {
            referenceNode = lastInsertedNode.nextSibling;
        }
        return container.insertBefore(newNode, referenceNode);
    };
    /**
     * Given an html element and a reference node, insert a <br /> node
     * within the html element, before the reference node
     */
    DomUtils.insertSpacer = function (container, referenceNode) {
        var spacerNode = document.createElement("br");
        return container.insertBefore(spacerNode, referenceNode);
    };
    /**
     * Clones the document into a new document object
     */
    DomUtils.cloneDocument = function (originalDoc) {
        return originalDoc.cloneNode(true);
    };
    /**
     * If the head doesn't contains a 'base' tag, then add one in case relative paths are used.
     * If the location is not specified, the current document's location will be used.
     */
    DomUtils.addBaseTagIfNecessary = function (doc, location) {
        // Sometimes there is no head in the DOM e.g., pdfs in incognito mode
        if (!doc.head) {
            var headElement = doc.createElement(DomUtils.tags.head);
            var htmlElement = doc.getElementsByTagName(DomUtils.tags.html)[0];
            htmlElement.insertBefore(headElement, htmlElement.children[0]);
        }
        if (!location) {
            location = document.location;
        }
        var bases = doc.head.getElementsByTagName(DomUtils.tags.base);
        if (bases.length === 0) {
            var baseUrl = location.href.split("#")[0].split("?")[0];
            baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf("/") + 1);
            var baseTag = doc.createElement(DomUtils.tags.base);
            baseTag.href = baseUrl;
            doc.head.insertBefore(baseTag, doc.head.firstChild);
        }
    };
    /**
     * Remove blank images from the DOM. A blank image is defined as an image where all
     * the pixels are either purely white or fully transparent.
     */
    DomUtils.removeBlankImages = function (doc) {
        return DomUtils.domReplacerAsync(doc, DomUtils.tags.img, function (node) {
            return new Promise(function (resolve) {
                var img = node;
                // Just passing in the image node won't work as it won't render properly
                // and the algorithm will think every pixel is (0,0,0,0)
                var theImg = new Image();
                // In Firefox, a SecurityError is thrown if the image is not CORS-enabled
                theImg.crossOrigin = "anonymous";
                theImg.onload = function () {
                    resolve(DomUtils.imageIsBlank(theImg) ? undefined : node);
                };
                // onload can return a non-200 in some weird cases, so we have to specify this
                theImg.onerror = function () {
                    // Be forgiving, and assume the image is non-blank
                    resolve(node);
                };
                // The request is kicked off as soon as the src is set, so it needs to happen last
                theImg.src = img.src || img.getAttribute("src");
            });
        });
    };
    /**
     * Return true if every pixel in the image is either purely white or fully transparent;
     * false otherwise. Assumes that the image is loaded already.
     */
    DomUtils.imageIsBlank = function (img) {
        if (img.width === 0 || img.height === 0) {
            return false;
        }
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
        // Each pixel is a 4 index block representing RGBA
        try {
            var area = context.getImageData(0, 0, canvas.width, canvas.height);
            var pixelArray = area.data;
            for (var i = 0; i < pixelArray.length; i += 4) {
                // If pixel is fully transparent
                if (pixelArray[i + 3] === 0) {
                    continue;
                }
                // If pixel is purely white
                if (pixelArray[i] === 255 && pixelArray[i + 1] === 255 && pixelArray[i + 2] === 255) {
                    continue;
                }
                return false;
            }
            return true;
        }
        catch (e) {
            // A SecurityError is sometimes thrown in Firefox on 'tainted' images
            // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
            return false;
        }
    };
    /**
     * Remove Clipper elements from the DOM entirely
     */
    DomUtils.removeClipperElements = function (doc) {
        var _this = this;
        DomUtils.domReplacer(doc, [
            "#" + constants_1.Constants.Ids.clipperRootScript,
            "#" + constants_1.Constants.Ids.clipperUiFrame,
            "#" + constants_1.Constants.Ids.clipperExtFrame
        ].join());
        // Remove iframes that point to local files
        DomUtils.domReplacer(doc, DomUtils.tags.iframe, function (node) {
            var iframe = node;
            var src = iframe.src;
            if (_this.isLocalReferenceUrl(src)) {
                return undefined;
            }
            return iframe;
        });
    };
    /**
     * Remove any references to URLs that won't work on another box (i.e. our servers)
     */
    DomUtils.removeUnsupportedHrefs = function (doc) {
        var _this = this;
        DomUtils.domReplacer(doc, DomUtils.tags.link, function (node) {
            var linkElement = node;
            var href = linkElement.href;
            if (_this.isLocalReferenceUrl(href)) {
                return undefined;
            }
            return linkElement;
        });
    };
    /**
     * Remove unwanted elements from the DOM entirely
     */
    DomUtils.removeUnwantedElements = function (doc) {
        DomUtils.domReplacer(doc, [DomUtils.tags.script, DomUtils.tags.noscript].join());
    };
    /**
     * Remove unwanted attributes from the DOM's elements
     */
    DomUtils.removeUnwantedAttributes = function (doc) {
        var images = doc.getElementsByTagName("IMG");
        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            image.srcset = undefined;
            image.removeAttribute("srcset");
        }
    };
    /**
     * Converts all images and links in a document to using absolute urls. To be
     * called in the same context as the website.
     */
    DomUtils.convertRelativeUrlsToAbsolute = function (doc) {
        DomUtils.domReplacer(doc, DomUtils.tags.img, function (node, index) {
            var nodeAsImage = node;
            // We don't use nodeAsImage.src as it returns undefined for relative urls
            var possiblyRelativeSrcAttr = nodeAsImage.attributes.src;
            if (possiblyRelativeSrcAttr && possiblyRelativeSrcAttr.value) {
                nodeAsImage.src = DomUtils.toAbsoluteUrl(possiblyRelativeSrcAttr.value, location.origin);
                return nodeAsImage;
            }
            // This image has no src attribute. Assume it's rubbish!
            return undefined;
        });
        DomUtils.domReplacer(doc, DomUtils.tags.a, function (node, index) {
            var nodeAsAnchor = node;
            var possiblyRelativeSrcAttr = nodeAsAnchor.attributes.href;
            if (possiblyRelativeSrcAttr && possiblyRelativeSrcAttr.value) {
                nodeAsAnchor.href = DomUtils.toAbsoluteUrl(possiblyRelativeSrcAttr.value, location.origin);
                return nodeAsAnchor;
            }
            // Despite the href not being present, it's best to keep the element
            return node;
        });
    };
    DomUtils.toAbsoluteUrl = function (url, base) {
        if (!url || !base) {
            throw new Error("parameters must be non-empty, but was: " + url + ", " + base);
        }
        // Urls starting with "//" inherit the protocol from the rendering page, and the Clipper has a
        // protocol of chrome-extension, which is incorrect. We should manually add the protocol here
        if (/^\/\/[^\/]/.test(url)) {
            url = location.protocol + url;
        }
        var uri = new URI(url);
        if (uri.is("relative")) {
            return uri.absoluteTo(base).valueOf();
        }
        return url;
    };
    /**
     * Replace canvas elements into images
     * TODO: Deal with the situation of not running over max bytes
     */
    DomUtils.convertCanvasElementsToImages = function (doc, originalDoc) {
        // We need to get the canvas's data from the original DOM since the cloned DOM doesn't have it
        var originalCanvasElements = originalDoc.querySelectorAll(DomUtils.tags.canvas);
        DomUtils.domReplacer(doc, DomUtils.tags.canvas, function (node, index) {
            var originalCanvas = originalCanvasElements[index];
            if (!originalCanvas) {
                return undefined;
            }
            var image = doc.createElement(DomUtils.tags.img);
            image.src = originalCanvas.toDataURL();
            image.style.cssText = window.getComputedStyle(originalCanvas).cssText;
            return image;
        });
    };
    /**
     * Given a DOM, it will add image height and width information to all image tags
     */
    DomUtils.addImageSizeInformationToDom = function (doc) {
        var imgs = doc.getElementsByTagName("img");
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (!img.hasAttribute("data-height")) {
                var height = img.height;
                img.setAttribute("data-height", height.toString());
            }
            if (!img.hasAttribute("data-width")) {
                var width = img.width;
                img.setAttribute("data-width", width.toString());
            }
        }
    };
    /**
     * Convert an image src url into a base 64 data url, if possible.
     * Enables us to embed image data directly into a document.
     * Uses idea by: https://davidwalsh.name/convert-image-data-uri-javascript
     * Uses cached image idea by: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
     */
    DomUtils.getImageDataUrl = function (imageSrcUrl) {
        return new Promise(function (resolve, reject) {
            if (objectUtils_1.ObjectUtils.isNullOrUndefined(imageSrcUrl) || imageSrcUrl === "") {
                reject({ error: "image source is undefined or empty" });
            }
            var image = new Image();
            // see https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for why this is needed
            image.crossOrigin = "anonymous";
            image.onload = function () {
                var canvas = document.createElement(DomUtils.tags.canvas);
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext("2d").drawImage(image, 0, 0);
                try {
                    var dataUrl = canvas.toDataURL("image/png");
                    dataUrl = DomUtils.adjustImageQualityIfNecessary(canvas, dataUrl);
                    resolve(dataUrl);
                }
                catch (e) {
                    // There are some cases (like dirty canvases) where running toDataURL will throw an error.
                    // We catch it and return the original image source url.
                    resolve(imageSrcUrl);
                }
            };
            image.onerror = function (ev) {
                var erroredImg = ev.currentTarget;
                var erroredImgSrc;
                if (!objectUtils_1.ObjectUtils.isNullOrUndefined(erroredImg)) {
                    erroredImgSrc = erroredImg.src;
                }
                reject({ error: "onerror occurred fetching " + erroredImgSrc });
            };
            image.src = imageSrcUrl;
            // make sure the load event fires for cached images too
            if (image.complete || image.complete === undefined) {
                image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                image.src = imageSrcUrl;
            }
        });
    };
    /**
     * If a high-quality image is too big for the request, then switch to JPEG and step down
     */
    DomUtils.adjustImageQualityIfNecessary = function (canvas, dataUrl, quality, qualityStep) {
        if (quality === void 0) { quality = 1; }
        if (qualityStep === void 0) { qualityStep = 0.1; }
        var stepDownCount = 0;
        while (quality > 0 && dataUrl.length > DomUtils.maxBytesForMediaTypes) {
            dataUrl = canvas.toDataURL("image/jpeg", quality);
            quality -= qualityStep;
            stepDownCount++;
        }
        return dataUrl;
    };
    /**
     * Returns a string representing the entire document
     */
    DomUtils.getDomString = function (doc) {
        return DomUtils.getDoctype(doc) + doc.documentElement.outerHTML;
    };
    /**
     * Returns the document represented by the dom string.
     * If title is provided, the title attribute will be populated in the head element.
     */
    DomUtils.getDocumentFromDomString = function (domString, title) {
        var doc = document.implementation.createHTMLDocument(title);
        doc.documentElement.innerHTML = domString;
        return doc;
    };
    /**
     * Return the DOCTYPE defined in the file
     */
    DomUtils.getDoctype = function (doc) {
        var doctype = doc.doctype;
        if (!doctype) {
            // Quirks mode
            return "";
        }
        return "<!DOCTYPE "
            + doctype.name
            + (doctype.publicId ? " PUBLIC \"" + doctype.publicId + "\"" : "")
            + (!doctype.publicId && doctype.systemId ? " SYSTEM" : "")
            + (doctype.systemId ? " \"" + doctype.systemId + "\"" : "")
            + ">";
    };
    DomUtils.getByteSize = function (s) {
        if (unescape) {
            return unescape(encodeURIComponent(s)).length;
        }
        else {
            return DomUtils.getByteArray(s).length;
        }
    };
    DomUtils.truncateStringToByteSize = function (s, maxByteLength) {
        var bytes = DomUtils.getByteArray(s);
        if (bytes.length <= maxByteLength) {
            return s;
        }
        bytes = bytes.slice(0, maxByteLength);
        var encoded = bytes.join("");
        while (encoded.length) {
            try {
                encoded = encoded.slice(0, -1);
                return decodeURIComponent(encoded);
            }
            catch (e) {
                // If the encoded string ends in a non-complete multibyte char, decode will throw an error
                return "";
            }
        }
    };
    DomUtils.getByteArray = function (s) {
        return encodeURIComponent(s).match(/%..|./g) || [];
    };
    /**
     * Gets the locale of the document
     */
    DomUtils.getLocale = function (doc) {
        // window.navigator.userLanguage is defined for IE, and window.navigator.language is defined for other browsers
        var docLocale = doc.getElementsByTagName("html")[0].getAttribute("lang");
        return docLocale ? docLocale : window.navigator.language || window.navigator.userLanguage;
    };
    /**
     * Gets the name of the file from the Url. Right now we mainly
     * support getting the name from PDF.
     */
    DomUtils.getFileNameFromUrl = function (doc) {
        var urlAnchor = doc.createElement("a");
        urlAnchor.href = doc.URL;
        if (urlAnchor.pathname.match(new RegExp(".pdf$", "gi"))) {
            var filename = urlAnchor.pathname.match(/[^/]+$/g);
            if (filename) {
                return decodeURIComponent(filename.pop());
            }
        }
        return doc.title;
    };
    /**
     * Find all non-whitespace text nodes under the provided root node
     * Uses idea by: http://stackoverflow.com/a/10730777
     */
    DomUtils.textNodesNoWhitespaceUnder = function (root) {
        var a = [];
        var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                // Logic to determine whether to accept, reject or skip node
                // In this case, only accept nodes that have content
                // other than whitespace
                if (!/^\s*$/.test(node.data)) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        }, false);
        var n = walk.nextNode();
        while (n) {
            a.push(n);
            n = walk.nextNode();
        }
        return a;
    };
    DomUtils.removeEventListenerAttributes = function (doc) {
        // See: https://en.wikipedia.org/wiki/DOM_events
        var attributesToRemove = [
            "onclick",
            "ondblclick",
            "onmousedown",
            "onmouseup",
            "onmouseover",
            "onmousemove",
            "onmouseout",
            "ondragstart",
            "ondrag",
            "ondragenter",
            "ondragleave",
            "ondragover",
            "ondrop",
            "ondragend",
            "onkeydown",
            "onkeypress",
            "onkeyup",
            "onload",
            "onunload",
            "onabort",
            "onerror",
            "onresize",
            "onscroll",
            "onselect",
            "onchange",
            "onsubmit",
            "onreset",
            "onfocus",
            "onblur"
        ];
        for (var i = 0; i < attributesToRemove.length; i++) {
            var elements = doc.querySelectorAll("[" + attributesToRemove[i] + "]");
            for (var j = 0; j < elements.length; j++) {
                elements[j].removeAttribute(attributesToRemove[i]);
            }
        }
    };
    /*
     * Mimics augmentation API cleaning and ensuring that only ONML-compliant
     * elements remain
     */
    DomUtils.toOnml = function (doc) {
        DomUtils.removeElementsNotSupportedInOnml(doc);
        DomUtils.removeDisallowedIframes(doc);
        DomUtils.removeUnwantedItems(doc);
        DomUtils.convertRelativeUrlsToAbsolute(doc);
        DomUtils.removeAllStylesAndClasses(doc);
        DomUtils.removeEventListenerAttributes(doc);
        return DomUtils.removeBlankImages(doc);
    };
    DomUtils.removeDisallowedIframes = function (doc) {
        // We also detect if the iframe is a video, and we ensure that we have
        // the correct attribute set so that ONApi recognizes it
        DomUtils.domReplacer(doc, DomUtils.tags.iframe, function (node) {
            var src = node.src;
            var supportedDomain = videoUtils_1.VideoUtils.videoDomainIfSupported(src);
            if (!supportedDomain) {
                return undefined;
            }
            var domain = videoUtils_1.SupportedVideoDomains[supportedDomain];
            var extractor = VideoExtractorFactory_1.VideoExtractorFactory.createVideoExtractor(domain);
            return extractor.createEmbeddedVideoFromUrl(src);
        });
    };
    DomUtils.removeAllStylesAndClasses = function (doc) {
        DomUtils.domReplacer(doc, "*", function (oldNode, index) {
            oldNode.removeAttribute("style");
            oldNode.removeAttribute("class");
            return oldNode;
        });
    };
    DomUtils.isScrolledIntoPartialView = function (el) {
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;
        var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
    };
    DomUtils.getScrollPercent = function (elem, asDecimalValue) {
        if (asDecimalValue === void 0) { asDecimalValue = false; }
        if (!elem) {
            return 0;
        }
        var scrollValue = (elem.scrollTop * 1.0) / (elem.scrollHeight - elem.clientHeight);
        if (asDecimalValue) {
            return scrollValue;
        }
        return scrollValue * 100;
    };
    DomUtils.isLocalReferenceUrl = function (url) {
        return !(url.indexOf("https://") === 0 || url.indexOf("http://") === 0);
    };
    return DomUtils;
}());
DomUtils.tags = {
    a: "a",
    b: "b",
    applet: "applet",
    article: "article",
    audio: "audio",
    base: "base",
    body: "body",
    br: "br",
    button: "button",
    canvas: "canvas",
    center: "center",
    cite: "cite",
    code: "code",
    del: "del",
    div: "div",
    em: "em",
    embed: "embed",
    figure: "figure",
    font: "font",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    head: "head",
    header: "header",
    hr: "hr",
    html: "html",
    i: "i",
    iframe: "iframe",
    img: "img",
    input: "input",
    li: "li",
    link: "link",
    main: "main",
    map: "map",
    menu: "menu",
    menuitem: "menuitem",
    meta: "meta",
    meter: "meter",
    noscript: "noscript",
    object: "object",
    ol: "ol",
    p: "p",
    pre: "pre",
    progress: "progress",
    script: "script",
    span: "span",
    source: "source",
    strike: "strike",
    strong: "strong",
    style: "style",
    sub: "sub",
    sup: "sup",
    svg: "svg",
    table: "table",
    td: "td",
    title: "title",
    tr: "tr",
    u: "u",
    ul: "ul",
    video: "video"
};
// See the OneNote Dev Center API Reference for a list of supported attributes and tags
// https://dev.onenote.com/docs#/introduction/html-tag-support-for-pages
DomUtils.attributesAllowedByOnml = {
    "a": ["href", "name", "target"],
    "img": ["src"],
    "*": ["src", "background-color", "color", "font-family", "font-size", "data*", "alt", "height", "width", "style", "id", "type"]
};
DomUtils.tableTags = [
    DomUtils.tags.table,
    DomUtils.tags.td,
    DomUtils.tags.tr
];
DomUtils.markupTags = [
    DomUtils.tags.b,
    DomUtils.tags.em,
    DomUtils.tags.strong,
    DomUtils.tags.i,
    DomUtils.tags.u,
    DomUtils.tags.strike,
    DomUtils.tags.del,
    DomUtils.tags.sup,
    DomUtils.tags.sub,
    DomUtils.tags.cite,
    DomUtils.tags.font,
    DomUtils.tags.pre,
    DomUtils.tags.code
];
DomUtils.htmlTags = [
    DomUtils.tags.html,
    DomUtils.tags.head,
    DomUtils.tags.title,
    DomUtils.tags.meta,
    DomUtils.tags.body,
    DomUtils.tags.div,
    DomUtils.tags.span,
    DomUtils.tags.article,
    DomUtils.tags.figure,
    DomUtils.tags.header,
    DomUtils.tags.main,
    DomUtils.tags.center,
    DomUtils.tags.iframe,
    DomUtils.tags.a,
    DomUtils.tags.p,
    DomUtils.tags.br,
    DomUtils.tags.h1,
    DomUtils.tags.h2,
    DomUtils.tags.h3,
    DomUtils.tags.h4,
    DomUtils.tags.h5,
    DomUtils.tags.h6,
    DomUtils.tags.ul,
    DomUtils.tags.ol,
    DomUtils.tags.li,
    DomUtils.tags.img,
    DomUtils.tags.object,
    DomUtils.tags.video
];
// TODO: write a module test to make sure these tagsNotSupportedInOnml and the tags above have no intersection
DomUtils.tagsNotSupportedInOnml = [
    DomUtils.tags.applet,
    DomUtils.tags.audio,
    DomUtils.tags.button,
    DomUtils.tags.canvas,
    DomUtils.tags.embed,
    DomUtils.tags.hr,
    DomUtils.tags.input,
    DomUtils.tags.link,
    DomUtils.tags.map,
    DomUtils.tags.menu,
    DomUtils.tags.menuitem,
    DomUtils.tags.meter,
    DomUtils.tags.noscript,
    DomUtils.tags.progress,
    DomUtils.tags.script,
    DomUtils.tags.source,
    DomUtils.tags.style,
    DomUtils.tags.svg,
    DomUtils.tags.video
];
DomUtils.dataOriginalSrcAttribute = "data-original-src";
DomUtils.maxBytesForMediaTypes = 2097152 - 500; // Settings.Instance.Apis_MediaTypesHandledInMemoryMaxRequestLength - 500 byte buffer for the request padding.
exports.DomUtils = DomUtils;

},{"../constants":10,"../objectUtils":60,"./VideoExtractorFactory":12,"./videoUtils":17}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var videoExtractor_1 = require("./videoExtractor");
var videoUtils_1 = require("./videoUtils");
var youtubeVideoExtractor_1 = require("./youtubeVideoExtractor");
var KhanAcademyVideoExtractor = (function (_super) {
    __extends(KhanAcademyVideoExtractor, _super);
    function KhanAcademyVideoExtractor() {
        var _this = _super.call(this) || this;
        // KhanAcademy hosts their videos on Youtube
        _this.youtubeExtractor = new youtubeVideoExtractor_1.YoutubeVideoExtractor();
        return _this;
    }
    KhanAcademyVideoExtractor.prototype.createEmbeddedVideosFromHtml = function (html) {
        var _this = this;
        if (!html) {
            return [];
        }
        // Matches strings of the form id="video_\S+" OR id='video_\S+'
        // with any amount of whitespace padding in between strings of interest
        var regex1 = /\sid\s*=\s*("\s*video_(\S+)\s*"|'\s*video_(\S+)\s*')/gi;
        // Matches strings of the form data-youtubeid="\S+" OR data-youtubeid='\S+'
        // with any amount of whitespace padding in between strings of interest
        var regex2 = /data-youtubeid\s*=\s*("\s*video_(\S+)\s*"|'\s*video_(\S+)\s*')/gi;
        var ids = videoUtils_1.VideoUtils.matchRegexFromPageContent(html, [regex1, regex2]);
        if (!ids) {
            return [];
        }
        return ids.map(function (id) { return _this.createEmbeddedVideoFromId(id); });
    };
    KhanAcademyVideoExtractor.prototype.createEmbeddedVideoFromUrl = function (url) {
        // KhanAcademy does not host their own videos. We can only derive videos
        // from their page's html.
        return undefined;
    };
    KhanAcademyVideoExtractor.prototype.createEmbeddedVideoFromId = function (id) {
        return this.youtubeExtractor.createEmbeddedVideoFromId(id);
    };
    return KhanAcademyVideoExtractor;
}(videoExtractor_1.VideoExtractor));
exports.KhanAcademyVideoExtractor = KhanAcademyVideoExtractor;

},{"./videoExtractor":16,"./videoUtils":17,"./youtubeVideoExtractor":19}],16:[function(require,module,exports){
"use strict";
var _ = require("lodash");
var VideoExtractor = (function () {
    function VideoExtractor() {
    }
    /**
     * Given a page's url and its body html, return a unique list of
     * OneNoteApi-compliant video embeds. If there's a video associated
     * with the page url, it will be first in the list.
     */
    VideoExtractor.prototype.createEmbeddedVideosFromPage = function (url, html) {
        var allVideoEmbeds = [];
        var videoEmbedFromUrl = this.createEmbeddedVideoFromUrl(url);
        if (videoEmbedFromUrl) {
            allVideoEmbeds.push(videoEmbedFromUrl);
        }
        allVideoEmbeds = allVideoEmbeds.concat(this.createEmbeddedVideosFromHtml(html));
        return _.uniqWith(allVideoEmbeds, function (v1, v2) {
            return v1.src === v2.src;
        });
    };
    return VideoExtractor;
}());
exports.VideoExtractor = VideoExtractor;
;

},{"lodash":79}],17:[function(require,module,exports){
"use strict";
var objectUtils_1 = require("../objectUtils");
var urlUtils_1 = require("../urlUtils");
var SupportedVideoDomains;
(function (SupportedVideoDomains) {
    SupportedVideoDomains[SupportedVideoDomains["YouTube"] = 0] = "YouTube";
    SupportedVideoDomains[SupportedVideoDomains["Vimeo"] = 1] = "Vimeo";
    SupportedVideoDomains[SupportedVideoDomains["KhanAcademy"] = 2] = "KhanAcademy";
})(SupportedVideoDomains = exports.SupportedVideoDomains || (exports.SupportedVideoDomains = {}));
var VideoUtils = (function () {
    function VideoUtils() {
        this.youTubeWatchVideoBaseUrl = "https://www.youtube.com/watch";
        this.youTubeVideoIdQueryKey = "v";
    }
    /**
     * Returns a string from the SupportedVideoDomains enum iff
     * the pageUrl's hostname contains the enum string
     */
    VideoUtils.videoDomainIfSupported = function (pageUrl) {
        if (!pageUrl) {
            return;
        }
        var pageUrlAsLowerCase = pageUrl.toLowerCase();
        if (!urlUtils_1.UrlUtils.onWhitelistedDomain(pageUrlAsLowerCase)) {
            return;
        }
        var hostname = urlUtils_1.UrlUtils.getHostname(pageUrlAsLowerCase).toLowerCase();
        for (var domainEnum in SupportedVideoDomains) {
            var domain = SupportedVideoDomains[domainEnum];
            if (typeof (domain) === "string" && hostname.indexOf(domain.toLowerCase() + ".") > -1) {
                return domain;
            }
        }
        return;
    };
    VideoUtils.matchRegexFromPageContent = function (pageContent, regexes) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(pageContent)) {
            return;
        }
        var match;
        var matches = [];
        regexes.forEach(function (regex) {
            // Calling exec multiple times with the same parameter will continue finding matches until
            // there are no more
            while (match = regex.exec(pageContent)) {
                if (match[2]) {
                    matches.push(match[2]);
                }
                else if (match[3]) {
                    matches.push(match[3]);
                }
            }
        });
        if (matches.length === 0) {
            return;
        }
        // We used to return unique values, but since we now support videos in selections, we moved the
        // uniqueness logic to VideoExtractor::createEmbeddedVideosFromPage
        return matches;
    };
    return VideoUtils;
}());
exports.VideoUtils = VideoUtils;

},{"../objectUtils":60,"../urlUtils":71}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var domUtils_1 = require("./domUtils");
var videoExtractor_1 = require("./videoExtractor");
var videoUtils_1 = require("./videoUtils");
var VimeoVideoExtractor = (function (_super) {
    __extends(VimeoVideoExtractor, _super);
    function VimeoVideoExtractor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataOriginalSrcAttribute = "data-original-src";
        return _this;
    }
    VimeoVideoExtractor.prototype.createEmbeddedVideosFromHtml = function (html) {
        var _this = this;
        if (!html) {
            return [];
        }
        // Looking for all matches in pageContent of the general format: id="clip_###"
        // - where ### could be any number of digits
        // - ignore casing
        // - ignore possible whitespacing variations between characters
        // - accept the use of either double- or single-quotes around clip_###
        var regex1 = /id\s*=\s*("\s*clip_(\d+)\s*"|'\s*clip_(\d+)\s*')/gi;
        // Also account for embedded Vimeo videos
        var regex2 = /player\.vimeo\.com\/video\/((\d+))\d{0}/gi;
        var ids = videoUtils_1.VideoUtils.matchRegexFromPageContent(html, [regex1, regex2]);
        if (!ids) {
            return [];
        }
        return ids.map(function (id) { return _this.createEmbeddedVideoFromId(id); });
    };
    VimeoVideoExtractor.prototype.createEmbeddedVideoFromUrl = function (url) {
        if (!url) {
            return undefined;
        }
        var match = url.match(/^https?:\/\/vimeo\.com\/(\d+)\d{0}/);
        if (match) {
            return this.createEmbeddedVideoFromId(match[1]);
        }
        match = url.match(/^https?:\/\/player.vimeo.com\/video\/(\d+)\d{0}/);
        if (match) {
            return this.createEmbeddedVideoFromId(match[1]);
        }
        return undefined;
    };
    VimeoVideoExtractor.prototype.createEmbeddedVideoFromId = function (id) {
        if (!id) {
            return undefined;
        }
        var videoEmbed = domUtils_1.DomUtils.createEmbedVideoIframe();
        var src = "https://player.vimeo.com/video/" + id;
        videoEmbed.src = src;
        videoEmbed.setAttribute(this.dataOriginalSrcAttribute, src);
        return videoEmbed;
    };
    return VimeoVideoExtractor;
}(videoExtractor_1.VideoExtractor));
exports.VimeoVideoExtractor = VimeoVideoExtractor;

},{"./domUtils":14,"./videoExtractor":16,"./videoUtils":17}],19:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"../urlUtils":71,"./domUtils":14,"./videoExtractor":16,"dup":13}],20:[function(require,module,exports){
"use strict";
var smartValue_1 = require("../communicator/smartValue");
var Log = require("../logging/log");
var HttpWithRetries_1 = require("../http/HttpWithRetries");
var clipperStorageKeys_1 = require("../storage/clipperStorageKeys");
var userInfo_1 = require("../userInfo");
var constants_1 = require("../constants");
var objectUtils_1 = require("../objectUtils");
var stringUtils_1 = require("../stringUtils");
var urlUtils_1 = require("../urlUtils");
var AuthenticationHelper = (function () {
    function AuthenticationHelper(clipperData, logger) {
        this.user = new smartValue_1.SmartValue();
        this.logger = logger;
        this.clipperData = clipperData;
    }
    /**
     * Updates the current user's information.
     */
    AuthenticationHelper.prototype.updateUserInfoData = function (clipperId, updateReason) {
        var _this = this;
        return new Promise(function (resolve) {
            var updateInterval = 0;
            var storedUserInformation = _this.clipperData.getValue(clipperStorageKeys_1.ClipperStorageKeys.userInformation);
            if (storedUserInformation) {
                var currentInfo = void 0;
                try {
                    currentInfo = JSON.parse(storedUserInformation);
                }
                catch (e) {
                    _this.logger.logJsonParseUnexpected(storedUserInformation);
                }
                if (currentInfo && currentInfo.data && objectUtils_1.ObjectUtils.isNumeric(currentInfo.data.accessTokenExpiration)) {
                    // Expiration is in seconds, not milliseconds. Give additional leniency to account for response time.
                    updateInterval = Math.max((currentInfo.data.accessTokenExpiration * 1000) - 180000, 0);
                }
            }
            var getUserInformationFunction = function () {
                return _this.retrieveUserInformation(clipperId, undefined);
            };
            var getInfoEvent = new Log.Event.PromiseEvent(Log.Event.Label.GetExistingUserInformation);
            getInfoEvent.setCustomProperty(Log.PropertyName.Custom.UserInformationStored, !!storedUserInformation);
            _this.clipperData.getFreshValue(clipperStorageKeys_1.ClipperStorageKeys.userInformation, getUserInformationFunction, updateInterval).then(function (response) {
                var isValidUser = _this.isValidUserInformation(response.data);
                getInfoEvent.setCustomProperty(Log.PropertyName.Custom.FreshUserInfoAvailable, isValidUser);
                var writeableCookies = _this.isThirdPartyCookiesEnabled(response.data);
                getInfoEvent.setCustomProperty(Log.PropertyName.Custom.WriteableCookies, writeableCookies);
                getInfoEvent.setCustomProperty(Log.PropertyName.Custom.UserUpdateReason, userInfo_1.UpdateReason[updateReason]);
                if (isValidUser) {
                    _this.user.set({ user: response.data, lastUpdated: response.lastUpdated, updateReason: updateReason, writeableCookies: writeableCookies });
                }
                else {
                    _this.user.set({ updateReason: updateReason, writeableCookies: writeableCookies });
                }
            }, function (error) {
                getInfoEvent.setStatus(Log.Status.Failed);
                getInfoEvent.setFailureInfo(error);
                _this.user.set({ updateReason: updateReason });
            }).then(function () {
                _this.logger.logEvent(getInfoEvent);
                resolve(_this.user.get());
            });
        });
    };
    /**
     * Makes a call to the authentication proxy to retrieve the user's information.
     */
    AuthenticationHelper.prototype.retrieveUserInformation = function (clipperId, cookie) {
        var _this = this;
        if (cookie === void 0) { cookie = undefined; }
        return new Promise(function (resolve, reject) {
            var userInfoUrl = urlUtils_1.UrlUtils.addUrlQueryValue(constants_1.Constants.Urls.Authentication.userInformationUrl, constants_1.Constants.Urls.QueryParams.clipperId, clipperId);
            var retrieveUserInformationEvent = new Log.Event.PromiseEvent(Log.Event.Label.RetrieveUserInformation);
            var correlationId = stringUtils_1.StringUtils.generateGuid();
            retrieveUserInformationEvent.setCustomProperty(Log.PropertyName.Custom.CorrelationId, correlationId);
            var headers = {};
            headers["Content-type"] = "application/x-www-form-urlencoded";
            headers[constants_1.Constants.HeaderValues.correlationId] = correlationId;
            var postData = "";
            if (!objectUtils_1.ObjectUtils.isNullOrUndefined(cookie)) {
                // The data is encoded/decoded automatically, but because the '+' sign can also be interpreted as a space, we want to explicitly encode this one.
                postData = cookie.replace(/\+/g, "%2B");
            }
            HttpWithRetries_1.HttpWithRetries.post(userInfoUrl, postData, headers).then(function (request) {
                var response = request.response;
                resolve({ parsedResponse: response, request: request });
            }, function (error) {
                retrieveUserInformationEvent.setStatus(Log.Status.Failed);
                retrieveUserInformationEvent.setFailureInfo(error);
                reject(error);
            }).then(function () {
                _this.logger.logEvent(retrieveUserInformationEvent);
            });
        });
    };
    /**
     * Determines whether or not the given string is valid JSON and has the required elements.
     */
    AuthenticationHelper.prototype.isValidUserInformation = function (userInfo) {
        if (userInfo && userInfo.accessToken && userInfo.accessTokenExpiration > 0 && userInfo.authType) {
            return true;
        }
        return false;
    };
    /**
     * Determines whether or not the given string is valid JSON and has the flag which lets us know if cookies are enabled.
     */
    AuthenticationHelper.prototype.isThirdPartyCookiesEnabled = function (userInfo) {
        // Note that we are returning true by default to ensure the N-1 scenario.
        return userInfo.cookieInRequest !== undefined ? userInfo.cookieInRequest : true;
    };
    return AuthenticationHelper;
}());
exports.AuthenticationHelper = AuthenticationHelper;

},{"../communicator/smartValue":9,"../constants":10,"../http/HttpWithRetries":37,"../logging/log":45,"../objectUtils":60,"../storage/clipperStorageKeys":68,"../stringUtils":70,"../urlUtils":71,"../userInfo":72}],21:[function(require,module,exports){
"use strict";
var webExtensionPageNavInject_1 = require("../webExtensionBase/webExtensionPageNavInject");
var webExtension_1 = require("../webExtensionBase/webExtension");
var webExtensionMessageHandler_1 = require("../webExtensionBase/webExtensionMessageHandler");
webExtension_1.WebExtension.browser = browser;
webExtensionPageNavInject_1.invoke({
    frameUrl: frameUrl,
    extMessageHandlerThunk: function () { return new webExtensionMessageHandler_1.WebExtensionContentMessageHandler(); }
});

},{"../webExtensionBase/webExtension":32,"../webExtensionBase/webExtensionMessageHandler":33,"../webExtensionBase/webExtensionPageNavInject":34}],22:[function(require,module,exports){
"use strict";
var clientType_1 = require("../clientType");
var constants_1 = require("../constants");
var stringUtils_1 = require("../stringUtils");
var urlUtils_1 = require("../urlUtils");
var tooltipType_1 = require("../clipperUI/tooltipType");
var smartValue_1 = require("../communicator/smartValue");
var HttpWithRetries_1 = require("../http/HttpWithRetries");
var localization_1 = require("../localization/localization");
var localizationHelper_1 = require("../localization/localizationHelper");
var Log = require("../logging/log");
var clipperStorageKeys_1 = require("../storage/clipperStorageKeys");
var changeLog_1 = require("../versioning/changeLog");
var changeLogHelper_1 = require("../versioning/changeLogHelper");
var version_1 = require("../versioning/version");
var authenticationHelper_1 = require("./authenticationHelper");
var tooltipHelper_1 = require("./tooltipHelper");
var workerPassthroughLogger_1 = require("./workerPassthroughLogger");
/**
 * The abstract base class for all of the extensions
 */
var ExtensionBase = (function () {
    function ExtensionBase(clipperType, clipperData) {
        this.setUnhandledExceptionLogging();
        this.workers = [];
        this.logger = new workerPassthroughLogger_1.WorkerPassthroughLogger(this.workers);
        ExtensionBase.extensionId = stringUtils_1.StringUtils.generateGuid();
        this.clipperData = clipperData;
        this.clipperData.setLogger(this.logger);
        this.auth = new authenticationHelper_1.AuthenticationHelper(this.clipperData, this.logger);
        this.tooltip = new tooltipHelper_1.TooltipHelper(this.clipperData);
        var clipperFirstRun = false;
        var clipperId = this.clipperData.getValue(clipperStorageKeys_1.ClipperStorageKeys.clipperId);
        if (!clipperId) {
            // New install
            clipperFirstRun = true;
            clipperId = ExtensionBase.generateClipperId();
            this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.clipperId, clipperId);
            // Ensure fresh installs don't trigger thats What's New experience
            this.updateLastSeenVersionInStorageToCurrent();
        }
        this.clientInfo = new smartValue_1.SmartValue({
            clipperType: clipperType,
            clipperVersion: ExtensionBase.getExtensionVersion(),
            clipperId: clipperId
        });
        if (clipperFirstRun) {
            this.onFirstRun();
        }
        this.initializeUserFlighting();
        this.listenForOpportunityToShowPageNavTooltip();
    }
    ExtensionBase.getExtensionId = function () {
        return ExtensionBase.extensionId;
    };
    ExtensionBase.getExtensionVersion = function () {
        return ExtensionBase.version;
    };
    ExtensionBase.shouldCheckForMajorUpdates = function (lastSeenVersion, currentVersion) {
        return !!currentVersion && (!lastSeenVersion || lastSeenVersion.isLesserThan(currentVersion));
    };
    ;
    ExtensionBase.prototype.addWorker = function (worker) {
        var _this = this;
        worker.setOnUnloading(function () {
            worker.destroy();
            _this.removeWorker(worker);
        });
        this.workers.push(worker);
    };
    ExtensionBase.prototype.getWorkers = function () {
        return this.workers;
    };
    ExtensionBase.prototype.removeWorker = function (worker) {
        var index = this.workers.indexOf(worker);
        if (index > -1) {
            this.workers.splice(index, 1);
        }
    };
    /**
     * Determines if the url is on our domain or not
     */
    ExtensionBase.isOnOneNoteDomain = function (url) {
        return url.indexOf("onenote.com") >= 0 || url.indexOf("onenote-int.com") >= 0;
    };
    ExtensionBase.prototype.fetchAndStoreLocStrings = function () {
        var _this = this;
        // navigator.userLanguage is only available in IE, and Typescript will not recognize this property
        var locale = navigator.language || navigator.userLanguage;
        return localizationHelper_1.LocalizationHelper.makeLocStringsFetchRequest(locale).then(function (responsePackage) {
            try {
                var locStringsDict = JSON.parse(responsePackage.parsedResponse);
                if (locStringsDict) {
                    _this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.locale, locale);
                    _this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.locStrings, responsePackage.parsedResponse);
                    localization_1.Localization.setLocalizedStrings(locStringsDict);
                }
                return Promise.resolve(locStringsDict);
            }
            catch (e) {
                return Promise.reject(undefined);
            }
        });
    };
    /**
     * Returns the URL for more information about the Clipper
     */
    ExtensionBase.prototype.getClipperInstalledPageUrl = function (clipperId, clipperType, isInlineInstall) {
        var installUrl = constants_1.Constants.Urls.clipperInstallPageUrl;
        installUrl = urlUtils_1.UrlUtils.addUrlQueryValue(installUrl, constants_1.Constants.Urls.QueryParams.clientType, clientType_1.ClientType[clipperType]);
        installUrl = urlUtils_1.UrlUtils.addUrlQueryValue(installUrl, constants_1.Constants.Urls.QueryParams.clipperId, clipperId);
        installUrl = urlUtils_1.UrlUtils.addUrlQueryValue(installUrl, constants_1.Constants.Urls.QueryParams.clipperVersion, ExtensionBase.getExtensionVersion());
        installUrl = urlUtils_1.UrlUtils.addUrlQueryValue(installUrl, constants_1.Constants.Urls.QueryParams.inlineInstall, isInlineInstall.toString());
        this.logger.logTrace(Log.Trace.Label.RequestForClipperInstalledPageUrl, Log.Trace.Level.Information, installUrl);
        return installUrl;
    };
    ExtensionBase.prototype.getExistingWorkerForTab = function (tabUniqueId) {
        var workers = this.getWorkers();
        for (var _i = 0, workers_1 = workers; _i < workers_1.length; _i++) {
            var worker = workers_1[_i];
            if (worker.getUniqueId() === tabUniqueId) {
                return worker;
            }
        }
        return undefined;
    };
    /**
     * Gets the last seen version from storage, and returns undefined if there is none in storage
     */
    ExtensionBase.prototype.getLastSeenVersion = function () {
        var lastSeenVersionStr = this.clipperData.getValue(clipperStorageKeys_1.ClipperStorageKeys.lastSeenVersion);
        return lastSeenVersionStr ? new version_1.Version(lastSeenVersionStr) : undefined;
    };
    ExtensionBase.prototype.getNewUpdates = function (lastSeenVersion, currentVersion) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var localeOverride = _this.clipperData.getValue(clipperStorageKeys_1.ClipperStorageKeys.displayLanguageOverride);
            var localeToGet = localeOverride || navigator.language || navigator.userLanguage;
            var changelogUrl = urlUtils_1.UrlUtils.addUrlQueryValue(constants_1.Constants.Urls.changelogUrl, constants_1.Constants.Urls.QueryParams.changelogLocale, localeToGet);
            HttpWithRetries_1.HttpWithRetries.get(changelogUrl).then(function (request) {
                try {
                    var schemas = JSON.parse(request.responseText);
                    var allUpdates = void 0;
                    for (var i = 0; i < schemas.length; i++) {
                        if (schemas[i].schemaVersion === changeLog_1.ChangeLog.schemaVersionSupported) {
                            allUpdates = schemas[i].updates;
                            break;
                        }
                    }
                    if (allUpdates) {
                        var updatesSinceLastVersion = changeLogHelper_1.ChangeLogHelper.getUpdatesBetweenVersions(allUpdates, lastSeenVersion, currentVersion);
                        resolve(updatesSinceLastVersion);
                    }
                    else {
                        throw new Error("No matching schemas were found.");
                    }
                }
                catch (error) {
                    reject(error);
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    ExtensionBase.prototype.getOrCreateWorkerForTab = function (tab, tabToIdMapping) {
        var tabId = tabToIdMapping(tab);
        var worker = this.getExistingWorkerForTab(tabId);
        if (!worker) {
            worker = this.createWorker(tab);
            this.addWorker(worker);
        }
        return worker;
    };
    /**
     * Generates a new clipperId, should only be called on first run
     */
    ExtensionBase.generateClipperId = function () {
        var clipperPrefix = "ON";
        return clipperPrefix + "-" + stringUtils_1.StringUtils.generateGuid();
    };
    /**
     * Initializes the flighting info for the user.
     */
    ExtensionBase.prototype.initializeUserFlighting = function () {
        // We don't have any flights
        this.updateClientInfoWithFlightInformation([]);
    };
    ExtensionBase.prototype.shouldShowTooltip = function (tab, tooltipTypes) {
        var type = this.checkIfTabMatchesATooltipType(tab, tooltipTypes);
        if (!type) {
            return;
        }
        if (!this.tooltip.tooltipDelayIsOver(type, Date.now())) {
            return;
        }
        return type;
    };
    ExtensionBase.prototype.shouldShowVideoTooltip = function (tab) {
        if (this.checkIfTabIsAVideoDomain(tab) && this.tooltip.tooltipDelayIsOver(tooltipType_1.TooltipType.Video, Date.now())) {
            return true;
        }
        return false;
    };
    ExtensionBase.prototype.showTooltip = function (tab, tooltipType) {
        var _this = this;
        var worker = this.getOrCreateWorkerForTab(tab, this.getIdFromTab);
        var tooltipImpressionEvent = new Log.Event.BaseEvent(Log.Event.Label.TooltipImpression);
        tooltipImpressionEvent.setCustomProperty(Log.PropertyName.Custom.TooltipType, tooltipType_1.TooltipType[tooltipType]);
        tooltipImpressionEvent.setCustomProperty(Log.PropertyName.Custom.LastSeenTooltipTime, this.tooltip.getTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.lastSeenTooltipTimeBase, tooltipType));
        tooltipImpressionEvent.setCustomProperty(Log.PropertyName.Custom.NumTimesTooltipHasBeenSeen, this.tooltip.getTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.numTimesTooltipHasBeenSeenBase, tooltipType));
        worker.invokeTooltip(tooltipType).then(function (wasInvoked) {
            if (wasInvoked) {
                _this.tooltip.setTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.lastSeenTooltipTimeBase, tooltipType, Date.now().toString());
                var numSeenStorageKey = clipperStorageKeys_1.ClipperStorageKeys.numTimesTooltipHasBeenSeenBase;
                var numTimesSeen = _this.tooltip.getTooltipInformation(numSeenStorageKey, tooltipType) + 1;
                _this.tooltip.setTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.numTimesTooltipHasBeenSeenBase, tooltipType, numTimesSeen.toString());
            }
            tooltipImpressionEvent.setCustomProperty(Log.PropertyName.Custom.FeatureEnabled, wasInvoked);
            worker.getLogger().logEvent(tooltipImpressionEvent);
        });
    };
    ExtensionBase.prototype.shouldShowWhatsNewTooltip = function (tab, lastSeenVersion, extensionVersion) {
        // We explicitly check for control group as well so we prevent updating lastSeenVersion on everyone before the experiment starts
        return this.checkIfTabIsOnWhitelistedUrl(tab) && ExtensionBase.shouldCheckForMajorUpdates(lastSeenVersion, extensionVersion);
    };
    ExtensionBase.prototype.showWhatsNewTooltip = function (tab, lastSeenVersion, extensionVersion) {
        var _this = this;
        this.getNewUpdates(lastSeenVersion, extensionVersion).then(function (newUpdates) {
            var filteredUpdates = changeLogHelper_1.ChangeLogHelper.filterUpdatesThatDontApplyToBrowser(newUpdates, clientType_1.ClientType[_this.clientInfo.get().clipperType]);
            if (!!filteredUpdates && filteredUpdates.length > 0) {
                var worker_1 = _this.getOrCreateWorkerForTab(tab, _this.getIdFromTab);
                worker_1.invokeWhatsNewTooltip(filteredUpdates).then(function (wasInvoked) {
                    if (wasInvoked) {
                        var whatsNewImpressionEvent = new Log.Event.BaseEvent(Log.Event.Label.WhatsNewImpression);
                        whatsNewImpressionEvent.setCustomProperty(Log.PropertyName.Custom.FeatureEnabled, wasInvoked);
                        worker_1.getLogger().logEvent(whatsNewImpressionEvent);
                        // We don't want to do this if the tooltip was not invoked (e.g., on about:blank) so we can show it at the next opportunity
                        _this.updateLastSeenVersionInStorageToCurrent();
                    }
                });
            }
            else {
                _this.updateLastSeenVersionInStorageToCurrent();
            }
        }, function (error) {
            Log.ErrorUtils.sendFailureLogRequest({
                label: Log.Failure.Label.GetChangeLog,
                properties: {
                    failureType: Log.Failure.Type.Unexpected,
                    failureInfo: { error: error },
                    failureId: "GetChangeLog",
                    stackTrace: error
                },
                clientInfo: _this.clientInfo
            });
        });
    };
    /**
     * Skeleton method that sets a listener that listens for the opportunity to show a tooltip,
     * then invokes it when appropriate.
     */
    ExtensionBase.prototype.listenForOpportunityToShowPageNavTooltip = function () {
        var _this = this;
        this.addPageNavListener(function (tab) {
            // Fallback behavior for if the last seen version in storage is somehow in a corrupted format
            var lastSeenVersion;
            try {
                lastSeenVersion = _this.getLastSeenVersion();
            }
            catch (e) {
                _this.updateLastSeenVersionInStorageToCurrent();
                return;
            }
            var extensionVersion = new version_1.Version(ExtensionBase.getExtensionVersion());
            if (_this.clientInfo.get().clipperType !== clientType_1.ClientType.FirefoxExtension) {
                var tooltips = [tooltipType_1.TooltipType.Pdf, tooltipType_1.TooltipType.Product, tooltipType_1.TooltipType.Recipe];
                // Returns the Type of tooltip to show IF the delay is over and the tab has the correct content type
                var typeToShow = _this.shouldShowTooltip(tab, tooltips);
                if (typeToShow) {
                    _this.showTooltip(tab, typeToShow);
                    return;
                }
                if (_this.shouldShowVideoTooltip(tab)) {
                    _this.showTooltip(tab, tooltipType_1.TooltipType.Video);
                    return;
                }
            }
            // We don't show updates more recent than the local version for now, as it is easy
            // for a changelog to be released before a version is actually out
            if (_this.shouldShowWhatsNewTooltip(tab, lastSeenVersion, extensionVersion)) {
                _this.showWhatsNewTooltip(tab, lastSeenVersion, extensionVersion);
                return;
            }
        });
    };
    ExtensionBase.prototype.setUnhandledExceptionLogging = function () {
        var _this = this;
        var oldOnError = window.onerror;
        window.onerror = function (message, filename, lineno, colno, error) {
            var callStack = error ? Log.Failure.getStackTrace(error) : "[unknown stacktrace]";
            Log.ErrorUtils.sendFailureLogRequest({
                label: Log.Failure.Label.UnhandledExceptionThrown,
                properties: {
                    failureType: Log.Failure.Type.Unexpected,
                    failureInfo: { error: JSON.stringify({ error: error.toString(), message: message, lineno: lineno, colno: colno }) },
                    failureId: "ExtensionBase",
                    stackTrace: callStack
                },
                clientInfo: _this.clientInfo
            });
            if (oldOnError) {
                oldOnError(message, filename, lineno, colno, error);
            }
        };
    };
    /**
     * Updates the ClientInfo with the given flighting info.
     */
    ExtensionBase.prototype.updateClientInfoWithFlightInformation = function (flightingInfo) {
        this.clientInfo.set({
            clipperType: this.clientInfo.get().clipperType,
            clipperVersion: this.clientInfo.get().clipperVersion,
            clipperId: this.clientInfo.get().clipperId,
            flightingInfo: flightingInfo
        });
    };
    ExtensionBase.prototype.updateLastSeenVersionInStorageToCurrent = function () {
        this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.lastSeenVersion, ExtensionBase.getExtensionVersion());
    };
    return ExtensionBase;
}());
ExtensionBase.version = "3.8.0";
exports.ExtensionBase = ExtensionBase;

},{"../clientType":2,"../clipperUI/tooltipType":3,"../communicator/smartValue":9,"../constants":10,"../http/HttpWithRetries":37,"../localization/localization":41,"../localization/localizationHelper":42,"../logging/log":45,"../storage/clipperStorageKeys":68,"../stringUtils":70,"../urlUtils":71,"../versioning/changeLog":73,"../versioning/changeLogHelper":74,"../versioning/version":75,"./authenticationHelper":20,"./tooltipHelper":31,"./workerPassthroughLogger":36}],23:[function(require,module,exports){
"use strict";
var browserUtils_1 = require("../browserUtils");
var clientType_1 = require("../clientType");
var clipperUrls_1 = require("../clipperUrls");
var cookieUtils_1 = require("../cookieUtils");
var constants_1 = require("../constants");
var polyfills_1 = require("../polyfills");
var userInfo_1 = require("../userInfo");
var settings_1 = require("../settings");
var tooltipType_1 = require("../clipperUI/tooltipType");
var communicator_1 = require("../communicator/communicator");
var smartValue_1 = require("../communicator/smartValue");
var clipperCachedHttp_1 = require("../http/clipperCachedHttp");
var localizationHelper_1 = require("../localization/localizationHelper");
var Log = require("../logging/log");
var logHelpers_1 = require("../logging/logHelpers");
var clipperStorageKeys_1 = require("../storage/clipperStorageKeys");
var extensionBase_1 = require("./extensionBase");
var invokeSource_1 = require("./invokeSource");
var invokeOptions_1 = require("./invokeOptions");
/**
 * The abstract base class for all of the extension workers
 */
var ExtensionWorkerBase = (function () {
    function ExtensionWorkerBase(clientInfo, auth, clipperData, uiMessageHandlerThunk, injectMessageHandlerThunk) {
        this.clipperFunnelAlreadyLogged = false;
        polyfills_1.Polyfills.init();
        this.onUnloading = function () { };
        this.uiCommunicator = new communicator_1.Communicator(uiMessageHandlerThunk(), constants_1.Constants.CommunicationChannels.extensionAndUi);
        this.pageNavUiCommunicator = new communicator_1.Communicator(uiMessageHandlerThunk(), constants_1.Constants.CommunicationChannels.extensionAndPageNavUi);
        this.debugLoggingInjectCommunicator = new communicator_1.Communicator(injectMessageHandlerThunk(), constants_1.Constants.CommunicationChannels.debugLoggingInjectedAndExtension);
        this.injectCommunicator = new communicator_1.Communicator(injectMessageHandlerThunk(), constants_1.Constants.CommunicationChannels.injectedAndExtension);
        this.pageNavInjectCommunicator = new communicator_1.Communicator(injectMessageHandlerThunk(), constants_1.Constants.CommunicationChannels.pageNavInjectedAndExtension);
        this.sessionId = new smartValue_1.SmartValue();
        this.logger = LogManager.createExtLogger(this.sessionId, logHelpers_1.LogHelpers.isConsoleOutputEnabled() ? this.debugLoggingInjectCommunicator : undefined);
        this.logger.logSessionStart();
        this.clipperData = clipperData;
        this.clipperData.setLogger(this.logger);
        this.auth = auth;
        this.clientInfo = clientInfo;
        // TODO Remove this function after ~some~ amount of time has passed
        // This is a temporary event shipping with v3.2.0 that is needed to map
        // the "accidental" device ids we were logging (that came from a cookie)
        // to the "real" device ids (ON-xxx) found in local storage that we weren't logging
        this.logDeviceIdMapEvent();
        this.initializeCommunicators();
        this.initializeContextProperties();
    }
    ExtensionWorkerBase.prototype.initializeContextProperties = function () {
        var _this = this;
        var clientInfo = this.clientInfo.get();
        this.logger.setContextProperty(Log.Context.Custom.AppInfoId, settings_1.Settings.getSetting("App_Id"));
        this.logger.setContextProperty(Log.Context.Custom.ExtensionLifecycleId, extensionBase_1.ExtensionBase.getExtensionId());
        this.logger.setContextProperty(Log.Context.Custom.UserInfoId, undefined);
        this.logger.setContextProperty(Log.Context.Custom.AuthType, "None");
        this.logger.setContextProperty(Log.Context.Custom.AppInfoVersion, clientInfo.clipperVersion);
        this.logger.setContextProperty(Log.Context.Custom.DeviceInfoId, clientInfo.clipperId);
        this.logger.setContextProperty(Log.Context.Custom.ClipperType, clientType_1.ClientType[clientInfo.clipperType]);
        // Sometimes the worker is created really early (e.g., pageNav, inline extension), so we need to wait
        // for flighting info to be returned before we set the context property
        if (!clientInfo.flightingInfo) {
            var clientInfoSetCb_1 = (function (newClientInfo) {
                if (newClientInfo.flightingInfo) {
                    _this.clientInfo.unsubscribe(clientInfoSetCb_1);
                    _this.logger.setContextProperty(Log.Context.Custom.FlightInfo, newClientInfo.flightingInfo.join(","));
                }
            }).bind(this);
            this.clientInfo.subscribe(clientInfoSetCb_1, { callOnSubscribe: false });
        }
        else {
            this.logger.setContextProperty(Log.Context.Custom.FlightInfo, clientInfo.flightingInfo.join(","));
        }
    };
    /**
     * Get the unique id associated with this worker's tab. The type is any type that allows us to distinguish
     * between tabs, and is dependent on the browser itself.
     */
    ExtensionWorkerBase.prototype.getUniqueId = function () {
        return this.tabId;
    };
    /**
     * Closes all active frames and notifies the UI to invoke the clipper.
     */
    ExtensionWorkerBase.prototype.closeAllFramesAndInvokeClipper = function (invokeInfo, options) {
        this.pageNavInjectCommunicator.callRemoteFunction(constants_1.Constants.FunctionKeys.closePageNavTooltip);
        this.invokeClipper(invokeInfo, options);
    };
    ExtensionWorkerBase.prototype.getLogger = function () {
        return this.logger;
    };
    /**
     * Skeleton method that notifies the UI to invoke the Clipper. Also performs logging.
     */
    ExtensionWorkerBase.prototype.invokeClipper = function (invokeInfo, options) {
        var _this = this;
        // For safety, we enforce that the object we send is never undefined.
        var invokeOptionsToSend = {
            invokeDataForMode: options ? options.invokeDataForMode : undefined,
            invokeMode: options ? options.invokeMode : invokeOptions_1.InvokeMode.Default
        };
        this.sendInvokeOptionsToInject(invokeOptionsToSend);
        this.isAllowedFileSchemeAccessBrowserSpecific(function (isAllowed) {
            if (!isAllowed) {
                _this.uiCommunicator.callRemoteFunction(constants_1.Constants.FunctionKeys.extensionNotAllowedToAccessLocalFiles);
            }
        });
        this.invokeClipperBrowserSpecific().then(function (wasInvoked) {
            if (wasInvoked && !_this.clipperFunnelAlreadyLogged) {
                _this.logger.logUserFunnel(Log.Funnel.Label.Invoke);
                _this.clipperFunnelAlreadyLogged = true;
            }
            _this.logClipperInvoke(invokeInfo, invokeOptionsToSend);
        });
    };
    /**
     * Notify the UI to invoke the What's New experience. Resolve with true if it was thought to be successfully
     * injected; otherwise resolves with false.
     */
    ExtensionWorkerBase.prototype.invokeWhatsNewTooltip = function (newVersions) {
        var _this = this;
        var invokeWhatsNewEvent = new Log.Event.PromiseEvent(Log.Event.Label.InvokeWhatsNew);
        return this.registerLocalizedStringsForPageNav().then(function (successful) {
            if (successful) {
                _this.registerWhatsNewCommunicatorFunctions(newVersions);
                return _this.invokeWhatsNewTooltipBrowserSpecific(newVersions).then(function (wasInvoked) {
                    if (!wasInvoked) {
                        invokeWhatsNewEvent.setStatus(Log.Status.Failed);
                        invokeWhatsNewEvent.setFailureInfo({ error: "invoking the What's New experience failed" });
                    }
                    _this.logger.logEvent(invokeWhatsNewEvent);
                    return Promise.resolve(wasInvoked);
                });
            }
            else {
                invokeWhatsNewEvent.setStatus(Log.Status.Failed);
                invokeWhatsNewEvent.setFailureInfo({ error: "getLocalizedStringsForBrowser returned undefined/null" });
                _this.logger.logEvent(invokeWhatsNewEvent);
                return Promise.resolve(false);
            }
        });
    };
    ExtensionWorkerBase.prototype.invokeTooltip = function (tooltipType) {
        var _this = this;
        var tooltipInvokeEvent = new Log.Event.PromiseEvent(Log.Event.Label.InvokeTooltip);
        tooltipInvokeEvent.setCustomProperty(Log.PropertyName.Custom.TooltipType, tooltipType_1.TooltipType[tooltipType]);
        return this.registerLocalizedStringsForPageNav().then(function (successful) {
            if (successful) {
                _this.registerTooltipCommunicatorFunctions(tooltipType);
                return _this.invokeTooltipBrowserSpecific(tooltipType).then(function (wasInvoked) {
                    _this.logger.logEvent(tooltipInvokeEvent);
                    return Promise.resolve(wasInvoked);
                });
            }
            else {
                tooltipInvokeEvent.setStatus(Log.Status.Failed);
                tooltipInvokeEvent.setFailureInfo({ error: "getLocalizedStringsForBrowser returned undefined/null" });
                _this.logger.logEvent(tooltipInvokeEvent);
                return Promise.resolve(false);
            }
        });
    };
    /**
     * Sets the hook method that will be called when this worker object goes away.
     */
    ExtensionWorkerBase.prototype.setOnUnloading = function (callback) {
        this.onUnloading = callback;
    };
    /**
     * Clean up anything related to the worker before it stops being used (aka the tab or window was closed)
     */
    ExtensionWorkerBase.prototype.destroy = function () {
        this.logger.logSessionEnd(Log.Session.EndTrigger.Unload);
    };
    /**
     * Returns the current version of localized strings used in the UI.
     */
    ExtensionWorkerBase.prototype.getLocalizedStrings = function (locale, callback) {
        var _this = this;
        this.logger.setContextProperty(Log.Context.Custom.BrowserLanguage, locale);
        var storedLocale = this.clipperData.getValue(clipperStorageKeys_1.ClipperStorageKeys.locale);
        var localeInStorageIsDifferent = !storedLocale || storedLocale !== locale;
        var getLocaleEvent = new Log.Event.BaseEvent(Log.Event.Label.GetLocale);
        getLocaleEvent.setCustomProperty(Log.PropertyName.Custom.StoredLocaleDifferentThanRequested, localeInStorageIsDifferent);
        this.logger.logEvent(getLocaleEvent);
        var fetchStringDataFunction = function () { return localizationHelper_1.LocalizationHelper.makeLocStringsFetchRequest(locale); };
        var updateInterval = localeInStorageIsDifferent ? 0 : clipperCachedHttp_1.ClipperCachedHttp.getDefaultExpiry();
        var getLocalizedStringsEvent = new Log.Event.PromiseEvent(Log.Event.Label.GetLocalizedStrings);
        getLocalizedStringsEvent.setCustomProperty(Log.PropertyName.Custom.ForceRetrieveFreshLocStrings, localeInStorageIsDifferent);
        this.clipperData.getFreshValue(clipperStorageKeys_1.ClipperStorageKeys.locStrings, fetchStringDataFunction, updateInterval).then(function (response) {
            _this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.locale, locale);
            if (callback) {
                callback(response ? response.data : undefined);
            }
        }, function (error) {
            getLocalizedStringsEvent.setStatus(Log.Status.Failed);
            getLocalizedStringsEvent.setFailureInfo(error);
            // Still proceed, as we have backup strings on the client
            if (callback) {
                callback(undefined);
            }
        }).then(function () {
            _this.logger.logEvent(getLocalizedStringsEvent);
        });
    };
    ExtensionWorkerBase.prototype.getLocalizedStringsForBrowser = function (callback) {
        var localeOverride = this.clipperData.getValue(clipperStorageKeys_1.ClipperStorageKeys.displayLanguageOverride);
        // navigator.userLanguage is only available in IE, and Typescript will not recognize this property
        var locale = localeOverride || navigator.language || navigator.userLanguage;
        this.getLocalizedStrings(locale, callback);
    };
    ExtensionWorkerBase.prototype.getUserSessionIdQueryParamValue = function () {
        var usidQueryParamValue = this.logger.getUserSessionId();
        return usidQueryParamValue ? usidQueryParamValue : this.clientInfo.get().clipperId;
    };
    ExtensionWorkerBase.prototype.invokeDebugLoggingIfEnabled = function () {
        if (logHelpers_1.LogHelpers.isConsoleOutputEnabled()) {
            return this.invokeDebugLoggingBrowserSpecific();
        }
        return Promise.resolve(false);
    };
    ExtensionWorkerBase.prototype.launchPopupAndWaitForClose = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var signInWindow = browserUtils_1.BrowserUtils.openPopupWindow(url);
            var errorObject;
            var popupMessageHandler = function (event) {
                if (event.source === signInWindow) {
                    var dataAsJson = void 0;
                    try {
                        dataAsJson = JSON.parse(event.data);
                    }
                    catch (e) {
                        _this.logger.logJsonParseUnexpected(event.data);
                    }
                    if (dataAsJson && (dataAsJson[constants_1.Constants.Urls.QueryParams.error] || dataAsJson[constants_1.Constants.Urls.QueryParams.errorDescription])) {
                        errorObject = {
                            correlationId: dataAsJson[constants_1.Constants.Urls.QueryParams.correlationId],
                            error: dataAsJson[constants_1.Constants.Urls.QueryParams.error],
                            errorDescription: dataAsJson[constants_1.Constants.Urls.QueryParams.errorDescription]
                        };
                    }
                }
            };
            window.addEventListener("message", popupMessageHandler);
            var timer = setInterval(function () {
                if (!signInWindow || signInWindow.closed) {
                    clearInterval(timer);
                    window.removeEventListener("message", popupMessageHandler);
                    // We always resolve with true in the non-error case as we can't reliably detect redirects
                    // on non-IE bookmarklets
                    errorObject ? reject(errorObject) : resolve(true);
                }
            }, 100);
        });
    };
    ExtensionWorkerBase.prototype.logClipperInvoke = function (invokeInfo, options) {
        var invokeClipperEvent = new Log.Event.BaseEvent(Log.Event.Label.InvokeClipper);
        invokeClipperEvent.setCustomProperty(Log.PropertyName.Custom.InvokeSource, invokeSource_1.InvokeSource[invokeInfo.invokeSource]);
        invokeClipperEvent.setCustomProperty(Log.PropertyName.Custom.InvokeMode, invokeOptions_1.InvokeMode[options.invokeMode]);
        this.logger.logEvent(invokeClipperEvent);
    };
    /**
     * Registers the tooltip type that needs to appear in the Page Nav experience, as well as any props it needs
     */
    ExtensionWorkerBase.prototype.registerTooltipToRenderInPageNav = function (tooltipType, tooltipProps) {
        this.pageNavUiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.getTooltipToRenderInPageNav, function () {
            return Promise.resolve(tooltipType);
        });
        this.pageNavUiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.getPageNavTooltipProps, function () {
            return Promise.resolve(tooltipProps);
        });
    };
    /**
     * Register communicator functions specific to the What's New experience
     */
    ExtensionWorkerBase.prototype.registerWhatsNewCommunicatorFunctions = function (newVersions) {
        this.registerTooltipToRenderInPageNav(tooltipType_1.TooltipType.WhatsNew, {
            updates: newVersions
        });
    };
    ExtensionWorkerBase.prototype.registerTooltipCommunicatorFunctions = function (tooltipType) {
        this.registerTooltipToRenderInPageNav(tooltipType);
    };
    ExtensionWorkerBase.prototype.sendInvokeOptionsToInject = function (options) {
        this.injectCommunicator.callRemoteFunction(constants_1.Constants.FunctionKeys.setInvokeOptions, {
            param: options
        });
    };
    ExtensionWorkerBase.prototype.setUpNoOpTrackers = function (url) {
        // No-op tracker for communication with inject
        var injectNoOpTrackerTimeout = Log.ErrorUtils.setNoOpTrackerRequestTimeout({
            label: Log.NoOp.Label.InitializeCommunicator,
            channel: constants_1.Constants.CommunicationChannels.injectedAndExtension,
            clientInfo: this.clientInfo,
            url: url
        }, true);
        this.injectCommunicator.callRemoteFunction(constants_1.Constants.FunctionKeys.noOpTracker, {
            param: new Date().getTime(),
            callback: function () {
                clearTimeout(injectNoOpTrackerTimeout);
            }
        });
        // No-op tracker for communication with the UI
        var uiNoOpTrackerTimeout = Log.ErrorUtils.setNoOpTrackerRequestTimeout({
            label: Log.NoOp.Label.InitializeCommunicator,
            channel: constants_1.Constants.CommunicationChannels.extensionAndUi,
            clientInfo: this.clientInfo,
            url: url
        }, true);
        this.uiCommunicator.callRemoteFunction(constants_1.Constants.FunctionKeys.noOpTracker, {
            param: new Date().getTime(),
            callback: function () {
                clearTimeout(uiNoOpTrackerTimeout);
            }
        });
    };
    /**
     * Signs the user out on in the frontend. TODO: this was implemented as an Edge workaround, and
     * should be removed when they fix their iframes not properly loading in the background.
     */
    ExtensionWorkerBase.prototype.doSignOutActionInFrontEnd = function (authType) {
        var usidQueryParamValue = this.getUserSessionIdQueryParamValue();
        var signOutUrl = clipperUrls_1.ClipperUrls.generateSignOutUrl(this.clientInfo.get().clipperId, usidQueryParamValue, userInfo_1.AuthType[authType]);
        this.uiCommunicator.callRemoteFunction(constants_1.Constants.FunctionKeys.createHiddenIFrame, {
            param: signOutUrl
        });
    };
    ExtensionWorkerBase.prototype.initializeCommunicators = function () {
        this.initializeDebugLoggingCommunicators();
        this.initializeClipperCommunicators();
        this.initializePageNavCommunicators();
    };
    ExtensionWorkerBase.prototype.initializeClipperCommunicators = function () {
        this.initializeClipperUiCommunicator();
        this.initializeClipperInjectCommunicator();
    };
    ExtensionWorkerBase.prototype.initializeClipperUiCommunicator = function () {
        var _this = this;
        this.uiCommunicator.broadcastAcrossCommunicator(this.auth.user, constants_1.Constants.SmartValueKeys.user);
        this.uiCommunicator.broadcastAcrossCommunicator(this.clientInfo, constants_1.Constants.SmartValueKeys.clientInfo);
        this.uiCommunicator.broadcastAcrossCommunicator(this.sessionId, constants_1.Constants.SmartValueKeys.sessionId);
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.clipperStrings, function () {
            return new Promise(function (resolve) {
                _this.getLocalizedStringsForBrowser(function (dataResult) {
                    resolve(dataResult);
                });
            });
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.getStorageValue, function (key) {
            return new Promise(function (resolve) {
                var value = _this.clipperData.getValue(key);
                resolve(value);
            });
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.getMultipleStorageValues, function (keys) {
            return new Promise(function (resolve) {
                var values = {};
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    values[key] = _this.clipperData.getValue(key);
                }
                resolve(values);
            });
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.setStorageValue, function (keyValuePair) {
            _this.clipperData.setValue(keyValuePair.key, keyValuePair.value);
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.getInitialUser, function () {
            return _this.auth.updateUserInfoData(_this.clientInfo.get().clipperId, userInfo_1.UpdateReason.InitialRetrieval);
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.signInUser, function (authType) {
            return _this.doSignInAction(authType).then(function (redirectOccurred) {
                // Recently, a change in sign-in flow broke our redirect detection, so now we give the benefit of the doubt
                // and always attempt to update userInfo regardless
                return _this.auth.updateUserInfoData(_this.clientInfo.get().clipperId, userInfo_1.UpdateReason.SignInAttempt).then(function (updatedUser) {
                    // While redirect detection is somewhat unreliable, it's still sometimes correct. So we try and
                    // detect this case only after we try get the latest userInfo
                    if ((!updatedUser || !updatedUser.user) && !redirectOccurred) {
                        var userInfoToSet = { updateReason: userInfo_1.UpdateReason.SignInCancel };
                        _this.auth.user.set(userInfoToSet);
                        return Promise.resolve(userInfoToSet);
                    }
                    return Promise.resolve(updatedUser);
                });
            })["catch"](function (errorObject) {
                // Set the user info object to undefined as a result of an attempted sign in
                _this.auth.user.set({ updateReason: userInfo_1.UpdateReason.SignInAttempt });
                // Right now we're adding the update reason to the errorObject as well so that it is preserved in the callback.
                // The right thing to do is revise the way we use callbacks in the communicator and instead use Promises so that
                // we are able to return distinct objects.
                errorObject.updateReason = userInfo_1.UpdateReason.SignInAttempt;
                return Promise.reject(errorObject);
            });
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.signOutUser, function (authType) {
            if (_this.clientInfo.get().clipperType === clientType_1.ClientType.EdgeExtension) {
                _this.doSignOutActionInFrontEnd(authType);
            }
            else {
                _this.doSignOutAction(authType);
            }
            _this.auth.user.set({ updateReason: userInfo_1.UpdateReason.SignOutAction });
            _this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.userInformation, undefined);
            _this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.currentSelectedSection, undefined);
            _this.clipperData.setValue(clipperStorageKeys_1.ClipperStorageKeys.cachedNotebooks, undefined);
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.telemetry, function (data) {
            Log.parseAndLogDataPackage(data, _this.logger);
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.ensureFreshUserBeforeClip, function () {
            return _this.auth.updateUserInfoData(_this.clientInfo.get().clipperId, userInfo_1.UpdateReason.TokenRefreshForPendingClip);
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.takeTabScreenshot, function () {
            return _this.takeTabScreenshot();
        });
        this.uiCommunicator.setErrorHandler(function (e) {
            Log.ErrorUtils.handleCommunicatorError(constants_1.Constants.CommunicationChannels.extensionAndUi, e, _this.clientInfo);
        });
    };
    ExtensionWorkerBase.prototype.initializeClipperInjectCommunicator = function () {
        var _this = this;
        this.injectCommunicator.broadcastAcrossCommunicator(this.clientInfo, constants_1.Constants.SmartValueKeys.clientInfo);
        this.injectCommunicator.registerFunction(constants_1.Constants.FunctionKeys.unloadHandler, function () {
            _this.tearDownCommunicators();
            _this.onUnloading();
        });
        this.injectCommunicator.registerFunction(constants_1.Constants.FunctionKeys.setStorageValue, function (keyValuePair) {
            _this.clipperData.setValue(keyValuePair.key, keyValuePair.value);
        });
        this.injectCommunicator.setErrorHandler(function (e) {
            Log.ErrorUtils.handleCommunicatorError(constants_1.Constants.CommunicationChannels.injectedAndExtension, e, _this.clientInfo);
        });
    };
    ExtensionWorkerBase.prototype.initializeDebugLoggingCommunicators = function () {
        var _this = this;
        this.debugLoggingInjectCommunicator.registerFunction(constants_1.Constants.FunctionKeys.unloadHandler, function () {
            _this.tearDownCommunicators();
            _this.onUnloading();
        });
    };
    ExtensionWorkerBase.prototype.initializePageNavCommunicators = function () {
        this.initializePageNavUiCommunicator();
        this.initializePageNavInjectCommunicator();
    };
    ExtensionWorkerBase.prototype.initializePageNavUiCommunicator = function () {
        var _this = this;
        this.pageNavUiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.telemetry, function (data) {
            Log.parseAndLogDataPackage(data, _this.logger);
        });
        this.pageNavUiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.invokeClipperFromPageNav, function (invokeSource) {
            _this.closeAllFramesAndInvokeClipper({ invokeSource: invokeSource }, { invokeMode: invokeOptions_1.InvokeMode.Default });
        });
    };
    ExtensionWorkerBase.prototype.initializePageNavInjectCommunicator = function () {
        var _this = this;
        this.pageNavInjectCommunicator.registerFunction(constants_1.Constants.FunctionKeys.telemetry, function (data) {
            Log.parseAndLogDataPackage(data, _this.logger);
        });
        this.pageNavInjectCommunicator.registerFunction(constants_1.Constants.FunctionKeys.unloadHandler, function () {
            _this.tearDownCommunicators();
            _this.onUnloading();
        });
    };
    /**
     * Fetches fresh localized strings and prepares a remote function for the Page Nav UI to fetch them.
     * Resolves with true if successful; false otherwise.
     */
    ExtensionWorkerBase.prototype.registerLocalizedStringsForPageNav = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getLocalizedStringsForBrowser(function (localizedStrings) {
                if (localizedStrings) {
                    _this.pageNavUiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.clipperStringsFrontLoaded, function () {
                        return Promise.resolve(localizedStrings);
                    });
                }
                resolve(!!localizedStrings);
            });
        });
    };
    ExtensionWorkerBase.prototype.tearDownCommunicators = function () {
        this.uiCommunicator.tearDown();
        this.pageNavUiCommunicator.tearDown();
        this.injectCommunicator.tearDown();
        this.pageNavInjectCommunicator.tearDown();
    };
    // TODO Temporary workaround introduced in v3.2.0
    // Remove after some time...
    ExtensionWorkerBase.prototype.logDeviceIdMapEvent = function () {
        var deviceIdInStorage = this.clientInfo.get().clipperId;
        var deviceIdInCookie = cookieUtils_1.CookieUtils.readCookie("MicrosoftApplicationsTelemetryDeviceId");
        if (deviceIdInCookie !== deviceIdInStorage) {
            var deviceIdMapEvent = new Log.Event.BaseEvent(Log.Event.Label.DeviceIdMap);
            deviceIdMapEvent.setCustomProperty(Log.PropertyName.Custom.DeviceIdInStorage, deviceIdInStorage);
            deviceIdMapEvent.setCustomProperty(Log.PropertyName.Custom.DeviceIdInCookie, deviceIdInCookie);
            this.logger.logEvent(deviceIdMapEvent);
        }
    };
    return ExtensionWorkerBase;
}());
exports.ExtensionWorkerBase = ExtensionWorkerBase;

},{"../browserUtils":1,"../clientType":2,"../clipperUI/tooltipType":3,"../clipperUrls":4,"../communicator/communicator":5,"../communicator/smartValue":9,"../constants":10,"../cookieUtils":11,"../http/clipperCachedHttp":39,"../localization/localizationHelper":42,"../logging/log":45,"../logging/logHelpers":46,"../polyfills":62,"../settings":64,"../storage/clipperStorageKeys":68,"../userInfo":72,"./extensionBase":22,"./invokeOptions":27,"./invokeSource":28}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var iframeMessageHandler_1 = require("../communicator/iframeMessageHandler");
var injectBase_1 = require("./injectBase");
var FrameInjectBase = (function (_super) {
    __extends(FrameInjectBase, _super);
    function FrameInjectBase(options) {
        var _this = _super.call(this, options) || this;
        try {
            _this.initFrameInDom();
            _this.initializeUiCommunicator();
            _this.initializePassthroughCommunicator(_this.getExtMessageHandlerThunk());
            _this.checkForNoOps();
        }
        catch (e) {
            _this.handleConstructorError(e);
            throw e;
        }
        return _this;
    }
    FrameInjectBase.prototype.getFrame = function () {
        return this.frame;
    };
    FrameInjectBase.prototype.closeFrame = function () {
        if (this.frame) {
            this.frame.parentNode.removeChild(this.frame);
            this.frame = undefined;
        }
    };
    /**
     * Generates the extension message handler thunk for the inline extension
     */
    FrameInjectBase.prototype.generateInlineExtThunk = function () {
        var _this = this;
        if (!this.frame) {
            this.initFrameInDom();
        }
        return function () { return new iframeMessageHandler_1.IFrameMessageHandler(function () { return _this.frame.contentWindow; }); };
    };
    /**
     * Instantiates the frame object, styles/sets attributes accordingly, then adds it to the DOM
     */
    FrameInjectBase.prototype.initFrameInDom = function () {
        // The frame will already be initialized in the case of the bookmarklet as it gets generated in order
        // to set up the ext communicator
        if (!this.frame) {
            this.createFrame();
            // Attach ourselves below the body where it is safer against the page and programmatic styling
            document.documentElement.appendChild(this.frame);
        }
    };
    return FrameInjectBase;
}(injectBase_1.InjectBase));
exports.FrameInjectBase = FrameInjectBase;

},{"../communicator/iframeMessageHandler":7,"./injectBase":25}],25:[function(require,module,exports){
"use strict";
var polyfills_1 = require("../polyfills");
var InjectBase = (function () {
    function InjectBase(options) {
        try {
            polyfills_1.Polyfills.init();
            this.options = options;
            this.init();
            this.initializeExtCommunicator(this.getExtMessageHandlerThunk());
            this.initializeEventListeners();
        }
        catch (e) {
            this.handleConstructorError(e);
            throw e;
        }
    }
    InjectBase.prototype.getExtMessageHandlerThunk = function () {
        // If not specified, assume this is an inline environment
        return this.options.extMessageHandlerThunk ?
            this.options.extMessageHandlerThunk :
            this.generateInlineExtThunk();
    };
    return InjectBase;
}());
exports.InjectBase = InjectBase;

},{"../polyfills":62}],26:[function(require,module,exports){
"use strict";
var localization_1 = require("../localization/localization");
var InjectHelper = (function () {
    function InjectHelper() {
    }
    InjectHelper.alertUserOfUnclippablePage = function () {
        alert(localization_1.Localization.getLocalizedString("WebClipper.Error.CannotClipPage"));
    };
    InjectHelper.isKnownUninjectablePage = function (url) {
        if (!url) {
            return false;
        }
        for (var i = 0; i < InjectHelper.isKnownUninjectablePage.length; i++) {
            if (InjectHelper.uninjectableUrlRegexes[i].test(url)) {
                return true;
            }
        }
        return false;
    };
    return InjectHelper;
}());
InjectHelper.uninjectableUrlRegexes = [
    /^about:/
];
exports.InjectHelper = InjectHelper;

},{"../localization/localization":41}],27:[function(require,module,exports){
"use strict";
var InvokeMode;
(function (InvokeMode) {
    InvokeMode[InvokeMode["ContextImage"] = 0] = "ContextImage";
    InvokeMode[InvokeMode["ContextTextSelection"] = 1] = "ContextTextSelection";
    InvokeMode[InvokeMode["Default"] = 2] = "Default";
})(InvokeMode = exports.InvokeMode || (exports.InvokeMode = {}));

},{}],28:[function(require,module,exports){
"use strict";
var InvokeSource;
(function (InvokeSource) {
    InvokeSource[InvokeSource["Bookmarklet"] = 0] = "Bookmarklet";
    InvokeSource[InvokeSource["ContextMenu"] = 1] = "ContextMenu";
    InvokeSource[InvokeSource["ExtensionButton"] = 2] = "ExtensionButton";
    InvokeSource[InvokeSource["WhatsNewTooltip"] = 3] = "WhatsNewTooltip";
    InvokeSource[InvokeSource["PdfTooltip"] = 4] = "PdfTooltip";
    InvokeSource[InvokeSource["ProductTooltip"] = 5] = "ProductTooltip";
    InvokeSource[InvokeSource["RecipeTooltip"] = 6] = "RecipeTooltip";
    InvokeSource[InvokeSource["VideoTooltip"] = 7] = "VideoTooltip";
})(InvokeSource = exports.InvokeSource || (exports.InvokeSource = {}));

},{}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("../constants");
var urlUtils_1 = require("../urlUtils");
var domUtils_1 = require("../domParsers/domUtils");
var communicator_1 = require("../communicator/communicator");
var communicatorPassthrough_1 = require("../communicator/communicatorPassthrough");
var iframeMessageHandler_1 = require("../communicator/iframeMessageHandler");
var smartValue_1 = require("../communicator/smartValue");
var Log = require("../logging/log");
var communicatorLoggerPure_1 = require("../logging/communicatorLoggerPure");
var styledFrameFactory_1 = require("./styledFrameFactory");
var frameInjectBase_1 = require("./frameInjectBase");
var PageNavInject = (function (_super) {
    __extends(PageNavInject, _super);
    function PageNavInject(options) {
        var _this = _super.call(this, options) || this;
        _this.logger = new communicatorLoggerPure_1.CommunicatorLoggerPure(_this.extCommunicator);
        _this.setPageInfoContextProperties();
        return _this;
    }
    PageNavInject.main = function (options) {
        // There is no toggling functionality in the What's New experience
        if (!document.getElementById(constants_1.Constants.Ids.clipperPageNavFrame)) {
            // Rather than using a static field (i.e., traditional singleton pattern), we have to attach
            // the singleton to the window object because each time we inject a new inject script, they are
            // sandboxed from each other, so having a static field will not work.
            window.pageNavInjectObject = new PageNavInject(options);
        }
    };
    PageNavInject.prototype.checkForNoOps = function () {
        // Nothing needed
    };
    PageNavInject.prototype.createFrame = function () {
        this.frame = styledFrameFactory_1.StyledFrameFactory.getStyledFrame(styledFrameFactory_1.Frame.PageNav);
        this.frame.id = constants_1.Constants.Ids.clipperPageNavFrame;
        this.frame.src = this.options.frameUrl;
    };
    PageNavInject.prototype.handleConstructorError = function (e) {
        Log.ErrorUtils.sendFailureLogRequest({
            label: Log.Failure.Label.UnhandledExceptionThrown,
            properties: {
                failureType: Log.Failure.Type.Unexpected,
                failureInfo: { error: JSON.stringify({ error: e.toString(), url: window.location.href }) },
                failureId: "PageNavInject",
                stackTrace: Log.Failure.getStackTrace(e)
            }
        });
    };
    PageNavInject.prototype.init = function () {
        this.pageInfo = new smartValue_1.SmartValue();
        // Nothing needed
    };
    PageNavInject.prototype.initializeExtCommunicator = function (extMessageHandlerThunk) {
        var _this = this;
        this.extCommunicator = new communicator_1.Communicator(extMessageHandlerThunk(), constants_1.Constants.CommunicationChannels.pageNavInjectedAndExtension);
        this.extCommunicator.registerFunction(constants_1.Constants.FunctionKeys.closePageNavTooltip, function () {
            _this.closeFrame();
        });
    };
    PageNavInject.prototype.initializeEventListeners = function () {
        var _this = this;
        // Notify the background when we're unloading
        window.onbeforeunload = function (event) {
            _this.extCommunicator.callRemoteFunction(constants_1.Constants.FunctionKeys.unloadHandler);
        };
    };
    PageNavInject.prototype.initializePassthroughCommunicator = function (extMessageHandlerThunk) {
        var _this = this;
        var passthroughCommunicator = new communicatorPassthrough_1.CommunicatorPassthrough(extMessageHandlerThunk(), new iframeMessageHandler_1.IFrameMessageHandler(function () { return _this.frame.contentWindow; }), constants_1.Constants.CommunicationChannels.extensionAndPageNavUi);
    };
    PageNavInject.prototype.initializeUiCommunicator = function () {
        var _this = this;
        this.uiCommunicator = new communicator_1.Communicator(new iframeMessageHandler_1.IFrameMessageHandler(function () { return _this.frame.contentWindow; }), constants_1.Constants.CommunicationChannels.pageNavInjectedAndPageNavUi);
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.closePageNavTooltip, function () {
            _this.closeFrame();
        });
        this.uiCommunicator.registerFunction(constants_1.Constants.FunctionKeys.updateFrameHeight, function (newHeight) {
            _this.frame.style.height = newHeight + constants_1.Constants.Styles.clipperUiTopRightOffset + (constants_1.Constants.Styles.clipperUiDropShadowBuffer * 2) + "px";
        });
    };
    /**
     * Sets context properties relating to page info
     */
    PageNavInject.prototype.setPageInfoContextProperties = function () {
        this.logger.setContextProperty(Log.Context.Custom.ContentType, OneNoteApi.ContentType[domUtils_1.DomUtils.getPageContentType(document)]);
        this.logger.setContextProperty(Log.Context.Custom.InvokeHostname, urlUtils_1.UrlUtils.getHostname(document.URL));
        this.logger.setContextProperty(Log.Context.Custom.PageLanguage, domUtils_1.DomUtils.getLocale(document));
    };
    return PageNavInject;
}(frameInjectBase_1.FrameInjectBase));
exports.PageNavInject = PageNavInject;

},{"../communicator/communicator":5,"../communicator/communicatorPassthrough":6,"../communicator/iframeMessageHandler":7,"../communicator/smartValue":9,"../constants":10,"../domParsers/domUtils":14,"../logging/communicatorLoggerPure":44,"../logging/log":45,"../urlUtils":71,"./frameInjectBase":24,"./styledFrameFactory":30}],30:[function(require,module,exports){
"use strict";
var constants_1 = require("../constants");
var rtl_1 = require("../localization/rtl");
var Frame;
(function (Frame) {
    Frame[Frame["WebClipper"] = 0] = "WebClipper";
    Frame[Frame["PageNav"] = 1] = "PageNav";
})(Frame = exports.Frame || (exports.Frame = {}));
/**
 * Responsible for returning pre-styled iframes. Does not deal with ids or srces.
 */
var StyledFrameFactory = (function () {
    function StyledFrameFactory() {
    }
    StyledFrameFactory.getStyledFrame = function (frame) {
        switch (frame) {
            case Frame.WebClipper:
                return StyledFrameFactory.getStyledWebClipperFrame();
            default:
            case Frame.PageNav:
                return StyledFrameFactory.getStyledPageNavFrame();
        }
    };
    StyledFrameFactory.applyGlobalStyles = function (iframe) {
        if (rtl_1.Rtl.isRtl(navigator.language || navigator.userLanguage)) {
            iframe.style.left = "0px";
            iframe.style.right = "auto";
        }
        else {
            iframe.style.left = "auto";
            iframe.style.right = "0px";
        }
        iframe.style.top = "0px";
        iframe.style.bottom = "auto";
        iframe.style.border = "none";
        iframe.style.display = "block";
        iframe.style.margin = "0px";
        iframe.style.maxHeight = "none";
        iframe.style.maxWidth = "none";
        iframe.style.minHeight = "0px";
        iframe.style.minWidth = "0px";
        iframe.style.overflow = "hidden";
        iframe.style.padding = "0px";
        iframe.style.position = "fixed";
        iframe.style.transition = "initial";
        iframe.style.zIndex = "2147483647";
    };
    StyledFrameFactory.getGloballyStyledFrame = function () {
        var element = document.createElement("iframe");
        StyledFrameFactory.applyGlobalStyles(element);
        return element;
    };
    StyledFrameFactory.getStyledPageNavFrame = function () {
        var element = StyledFrameFactory.getGloballyStyledFrame();
        element.style.width = constants_1.Constants.Styles.clipperUiWidth + constants_1.Constants.Styles.clipperUiTopRightOffset + constants_1.Constants.Styles.clipperUiDropShadowBuffer + "px";
        return element;
    };
    StyledFrameFactory.getStyledWebClipperFrame = function () {
        var element = StyledFrameFactory.getGloballyStyledFrame();
        return element;
    };
    return StyledFrameFactory;
}());
exports.StyledFrameFactory = StyledFrameFactory;

},{"../constants":10,"../localization/rtl":43}],31:[function(require,module,exports){
"use strict";
var constants_1 = require("../constants");
var objectUtils_1 = require("../objectUtils");
var tooltipType_1 = require("../clipperUI/tooltipType");
var clipperStorageKeys_1 = require("../storage/clipperStorageKeys");
var TooltipHelper = (function () {
    function TooltipHelper(storage) {
        this.storage = storage;
        this.validTypes = [tooltipType_1.TooltipType.Pdf, tooltipType_1.TooltipType.Product, tooltipType_1.TooltipType.Recipe, tooltipType_1.TooltipType.Video];
    }
    TooltipHelper.prototype.getTooltipInformation = function (storageKeyBase, tooltipType) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(storageKeyBase) || objectUtils_1.ObjectUtils.isNullOrUndefined(tooltipType)) {
            throw new Error("Invalid argument passed to getTooltipInformation");
        }
        var storageKey = TooltipHelper.getStorageKeyForTooltip(storageKeyBase, tooltipType);
        var tooltipInfoAsString = this.storage.getValue(storageKey);
        var info = parseInt(tooltipInfoAsString, 10 /* radix */);
        return !isNaN(info) ? info : 0;
    };
    TooltipHelper.prototype.setTooltipInformation = function (storageKeyBase, tooltipType, value) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(storageKeyBase) || objectUtils_1.ObjectUtils.isNullOrUndefined(tooltipType)) {
            throw new Error("Invalid argument passed to setTooltipInformation");
        }
        var storageKey = TooltipHelper.getStorageKeyForTooltip(storageKeyBase, tooltipType);
        this.storage.setValue(storageKey, value);
    };
    TooltipHelper.prototype.tooltipDelayIsOver = function (tooltipType, curTime) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(tooltipType) || objectUtils_1.ObjectUtils.isNullOrUndefined(curTime)) {
            throw new Error("Invalid argument passed to tooltipDelayIsOver");
        }
        // If the user has clipped this content type
        var lastClipTime = this.getTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.lastClippedTooltipTimeBase, tooltipType);
        if (lastClipTime !== 0) {
            return false;
        }
        // If the user has seen enough of our tooltips :P 
        var numTimesTooltipHasBeenSeen = this.getTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.numTimesTooltipHasBeenSeenBase, tooltipType);
        if (numTimesTooltipHasBeenSeen >= constants_1.Constants.Settings.maximumNumberOfTimesToShowTooltips) {
            return false;
        }
        // If not enough time has passed since the user saw this specific tooltip, return false
        var lastSeenTooltipTime = this.getTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.lastSeenTooltipTimeBase, tooltipType);
        if (this.tooltipHasBeenSeenInLastTimePeriod(tooltipType, curTime, constants_1.Constants.Settings.timeBetweenSameTooltip)) {
            return false;
        }
        // If not enought time has been since the user saw ANY OTHER tooltip, then return false
        var indexOfThisTooltip = this.validTypes.indexOf(tooltipType);
        var validTypesWithCurrentTypeRemoved = this.validTypes.slice();
        validTypesWithCurrentTypeRemoved.splice(indexOfThisTooltip, 1);
        if (this.hasAnyTooltipBeenSeenInLastTimePeriod(curTime, validTypesWithCurrentTypeRemoved, constants_1.Constants.Settings.timeBetweenDifferentTooltips)) {
            return false;
        }
        return true;
    };
    TooltipHelper.getStorageKeyForTooltip = function (storageKeyBase, tooltipType) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(storageKeyBase) || objectUtils_1.ObjectUtils.isNullOrUndefined(tooltipType)) {
            throw new Error("Invalid argument passed to getStorageKeyForTooltip");
        }
        return storageKeyBase + tooltipType_1.TooltipType[tooltipType];
    };
    /**
     * Returns true if the lastSeenTooltipTime of @tooltipType is within @timePeriod of @curTime
     */
    TooltipHelper.prototype.tooltipHasBeenSeenInLastTimePeriod = function (tooltipType, curTime, timePeriod) {
        var lastSeenTooltipTime = this.getTooltipInformation(clipperStorageKeys_1.ClipperStorageKeys.lastSeenTooltipTimeBase, tooltipType);
        if (lastSeenTooltipTime === 0) {
            return false;
        }
        return (curTime - lastSeenTooltipTime) < timePeriod;
    };
    /**
     * Returns true if any of the @tooltipTypesToCheck have been seen in the last @timePeriod, given the current @time
     */
    TooltipHelper.prototype.hasAnyTooltipBeenSeenInLastTimePeriod = function (curTime, typesToCheck, timePeriod) {
        var _this = this;
        return typesToCheck.some(function (tooltipType) {
            var tooltipWasSeen = _this.tooltipHasBeenSeenInLastTimePeriod(tooltipType, curTime, timePeriod);
            return tooltipWasSeen;
        });
    };
    return TooltipHelper;
}());
exports.TooltipHelper = TooltipHelper;

},{"../clipperUI/tooltipType":3,"../constants":10,"../objectUtils":60,"../storage/clipperStorageKeys":68}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var clientType_1 = require("../../clientType");
var urlUtils_1 = require("../../urlUtils");
var videoUtils_1 = require("../../domParsers/videoUtils");
var localization_1 = require("../../localization/localization");
var clipperData_1 = require("../../storage/clipperData");
var localStorage_1 = require("../../storage/localStorage");
var extensionBase_1 = require("../extensionBase");
var invokeSource_1 = require("../invokeSource");
var invokeOptions_1 = require("../invokeOptions");
var webExtensionWorker_1 = require("./webExtensionWorker");
var WebExtension = (function (_super) {
    __extends(WebExtension, _super);
    function WebExtension(clientType, injectUrls) {
        var _this = _super.call(this, clientType, new clipperData_1.ClipperData(new localStorage_1.LocalStorage())) || this;
        _this.injectUrls = injectUrls;
        _this.registerBrowserButton();
        _this.registerContextMenuItems();
        _this.registerInstallListener();
        _this.registerTabRemoveListener();
        return _this;
    }
    WebExtension.getExtensionVersion = function () {
        return WebExtension.browser.runtime.getManifest().version;
    };
    WebExtension.prototype.addPageNavListener = function (callback) {
        WebExtension.browser.webNavigation.onCompleted.addListener(function (details) {
            // The callback is called on iframes as well, so we ignore those as we are only interested in main frame navigation
            if (details.frameId === 0) {
                WebExtension.browser.tabs.get(details.tabId, function (tab) {
                    if (!WebExtension.browser.runtime.lastError && tab) {
                        callback(tab);
                    }
                });
            }
        });
    };
    WebExtension.prototype.checkIfTabIsOnWhitelistedUrl = function (tab) {
        return !urlUtils_1.UrlUtils.onBlacklistedDomain(tab.url) && urlUtils_1.UrlUtils.onWhitelistedDomain(tab.url);
    };
    WebExtension.prototype.createWorker = function (tab) {
        return new webExtensionWorker_1.WebExtensionWorker(this.injectUrls, tab, this.clientInfo, this.auth);
    };
    WebExtension.prototype.getIdFromTab = function (tab) {
        return tab.id;
    };
    WebExtension.prototype.onFirstRun = function () {
        // Don't do anything since we're using the onInstalled functionality instead, unless it's not available
        // then we use our 'missing-clipperId' heuristic
        if (!this.onInstalledSupported()) {
            this.onInstalled();
        }
    };
    WebExtension.prototype.checkIfTabMatchesATooltipType = function (tab, tooltipTypes) {
        if (urlUtils_1.UrlUtils.onBlacklistedDomain(tab.url)) {
            return undefined;
        }
        return urlUtils_1.UrlUtils.checkIfUrlMatchesAContentType(tab.url, tooltipTypes);
    };
    WebExtension.prototype.checkIfTabIsAVideoDomain = function (tab) {
        var domain = videoUtils_1.VideoUtils.videoDomainIfSupported(tab.url);
        return !!domain;
    };
    WebExtension.prototype.invokeClipperInTab = function (tab, invokeInfo, options) {
        var worker = this.getOrCreateWorkerForTab(tab, this.getIdFromTab);
        worker.closeAllFramesAndInvokeClipper(invokeInfo, options);
    };
    WebExtension.prototype.onInstalled = function () {
        var _this = this;
        // Send users to our installed page (redirect if they're already on our page, else open a new tab)
        WebExtension.browser.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var isInlineInstall = extensionBase_1.ExtensionBase.isOnOneNoteDomain(tabs[0].url);
            var installUrl = _this.getClipperInstalledPageUrl(_this.clientInfo.get().clipperId, _this.clientInfo.get().clipperType, isInlineInstall);
            if (isInlineInstall) {
                WebExtension.browser.tabs.update(tabs[0].id, { url: installUrl });
            }
            else {
                WebExtension.browser.tabs.create({ url: installUrl });
            }
        });
    };
    WebExtension.prototype.registerBrowserButton = function () {
        var _this = this;
        WebExtension.browser.browserAction.onClicked.addListener(function (tab) {
            _this.invokeClipperInTab(tab, { invokeSource: invokeSource_1.InvokeSource.ExtensionButton }, { invokeMode: invokeOptions_1.InvokeMode.Default });
        });
    };
    WebExtension.prototype.registerContextMenuItems = function () {
        var _this = this;
        // Front-load our localization so our context menu is always localized
        this.fetchAndStoreLocStrings().then(function () {
            WebExtension.browser.contextMenus.removeAll(function () {
                var menus = [{
                        title: localization_1.Localization.getLocalizedString("WebClipper.Label.OneNoteWebClipper"),
                        contexts: ["page"],
                        onclick: function (info, tab) {
                            _this.invokeClipperInTab(tab, { invokeSource: invokeSource_1.InvokeSource.ContextMenu }, { invokeMode: invokeOptions_1.InvokeMode.Default });
                        }
                    }, {
                        title: localization_1.Localization.getLocalizedString("WebClipper.Label.ClipSelectionToOneNote"),
                        contexts: ["selection"],
                        onclick: function (info, tab) {
                            var invokeOptions = { invokeMode: invokeOptions_1.InvokeMode.ContextTextSelection };
                            // If the tab index is negative, chances are the user is using some sort of PDF plugin,
                            // and the tab object will be invalid. We need to get the parent tab in this scenario.
                            if (tab.index < 0) {
                                // Since we are in a PDF plugin, Rangy won't work, so we rely on WebExtension API to grab pure text
                                invokeOptions.invokeDataForMode = info.selectionText;
                                WebExtension.browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                    // There will only be one tab that meets this criteria
                                    var parentTab = tabs[0];
                                    _this.invokeClipperInTab(parentTab, { invokeSource: invokeSource_1.InvokeSource.ContextMenu }, invokeOptions);
                                });
                            }
                            else {
                                _this.invokeClipperInTab(tab, { invokeSource: invokeSource_1.InvokeSource.ContextMenu }, invokeOptions);
                            }
                        }
                    }, {
                        title: localization_1.Localization.getLocalizedString("WebClipper.Label.ClipImageToOneNote"),
                        contexts: ["image"],
                        onclick: function (info, tab) {
                            // Even though we know the user right-clicked an image, srcUrl is only present if the src attr exists
                            _this.invokeClipperInTab(tab, { invokeSource: invokeSource_1.InvokeSource.ContextMenu }, info.srcUrl ? {
                                // srcUrl will always be the full url, not relative
                                invokeDataForMode: info.srcUrl, invokeMode: invokeOptions_1.InvokeMode.ContextImage
                            } : undefined);
                        }
                    }];
                var documentUrlPatternList;
                switch (_this.clientInfo.get().clipperType) {
                    case clientType_1.ClientType.ChromeExtension:
                        documentUrlPatternList = [
                            "http://*/*",
                            "https://*/*",
                            "chrome-extension://encfpfilknmenlmjemepncnlbbjlabkc/*",
                            "chrome-extension://oemmndcbldboiebfnladdacbdfmadadm/*",
                            "chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/*" // Chrome PDF Viewer
                        ];
                        break;
                    case clientType_1.ClientType.EdgeExtension:
                        // Note that in Edge, the ms-browser-extension:// URL causes the context menus to break.
                        documentUrlPatternList = [
                            "http://*/*",
                            "https://*/*"
                        ];
                        break;
                    case clientType_1.ClientType.FirefoxExtension:
                        // Note that documentUrlPatterns is not supported in Firefox as of 07/22/16
                        // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Chrome_incompatibilities
                        // If you include documentUrlPatterns in Firefox, the context menu won't be added!
                        break;
                    default:
                        break;
                }
                for (var i = 0; i < menus.length; i++) {
                    if (documentUrlPatternList) {
                        menus[i].documentUrlPatterns = documentUrlPatternList;
                    }
                    WebExtension.browser.contextMenus.create(menus[i]);
                }
            });
        });
    };
    WebExtension.prototype.registerInstallListener = function () {
        var _this = this;
        // onInstalled is undefined as of Firefox 48
        if (this.onInstalledSupported()) {
            WebExtension.browser.runtime.onInstalled.addListener(function (details) {
                if (details.reason === "install") {
                    _this.onInstalled();
                }
            });
        }
    };
    WebExtension.prototype.registerTabRemoveListener = function () {
        var _this = this;
        WebExtension.browser.tabs.onRemoved.addListener(function (tabId) {
            var worker = _this.getExistingWorkerForTab(tabId);
            if (worker) {
                _this.removeWorker(worker);
            }
        });
    };
    WebExtension.prototype.onInstalledSupported = function () {
        return !!WebExtension.browser.runtime.onInstalled;
    };
    return WebExtension;
}(extensionBase_1.ExtensionBase));
exports.WebExtension = WebExtension;

},{"../../clientType":2,"../../domParsers/videoUtils":17,"../../localization/localization":41,"../../storage/clipperData":66,"../../storage/localStorage":69,"../../urlUtils":71,"../extensionBase":22,"../invokeOptions":27,"../invokeSource":28,"./webExtensionWorker":35}],33:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var messageHandler_1 = require("../../communicator/messageHandler");
var webExtension_1 = require("./webExtension");
var WebExtensionBackgroundMessageHandler = (function (_super) {
    __extends(WebExtensionBackgroundMessageHandler, _super);
    function WebExtensionBackgroundMessageHandler(tabId) {
        var _this = _super.call(this) || this;
        _this.tabId = tabId;
        _this.initMessageHandler();
        webExtension_1.WebExtension.browser.runtime.onMessage.addListener(_this.messageHandler);
        return _this;
    }
    WebExtensionBackgroundMessageHandler.prototype.initMessageHandler = function () {
        var _this = this;
        this.messageHandler = function (message, sender) {
            if (sender.tab.id === _this.tabId) {
                _this.onMessageReceived(message);
            }
        };
    };
    WebExtensionBackgroundMessageHandler.prototype.sendMessage = function (data) {
        webExtension_1.WebExtension.browser.tabs.sendMessage(this.tabId, data);
    };
    WebExtensionBackgroundMessageHandler.prototype.tearDown = function () {
        webExtension_1.WebExtension.browser.runtime.onMessage.removeListener(this.messageHandler);
    };
    return WebExtensionBackgroundMessageHandler;
}(messageHandler_1.MessageHandler));
exports.WebExtensionBackgroundMessageHandler = WebExtensionBackgroundMessageHandler;
var WebExtensionContentMessageHandler = (function (_super) {
    __extends(WebExtensionContentMessageHandler, _super);
    function WebExtensionContentMessageHandler() {
        var _this = _super.call(this) || this;
        _this.initMessageHandler();
        webExtension_1.WebExtension.browser.runtime.onMessage.addListener(_this.messageHandler);
        return _this;
    }
    WebExtensionContentMessageHandler.prototype.initMessageHandler = function () {
        var _this = this;
        this.messageHandler = function (message) {
            _this.onMessageReceived(message);
        };
    };
    WebExtensionContentMessageHandler.prototype.sendMessage = function (data) {
        webExtension_1.WebExtension.browser.runtime.sendMessage(data);
    };
    WebExtensionContentMessageHandler.prototype.tearDown = function () {
        webExtension_1.WebExtension.browser.runtime.onMessage.removeListener(this.messageHandler);
    };
    return WebExtensionContentMessageHandler;
}(messageHandler_1.MessageHandler));
exports.WebExtensionContentMessageHandler = WebExtensionContentMessageHandler;

},{"../../communicator/messageHandler":8,"./webExtension":32}],34:[function(require,module,exports){
"use strict";
var pageNavInject_1 = require("../pageNavInject");
function invoke(options) {
    pageNavInject_1.PageNavInject.main(options);
}
exports.invoke = invoke;

},{"../pageNavInject":29}],35:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var userInfo_1 = require("../../userInfo");
var browserUtils_1 = require("../../browserUtils");
var clientType_1 = require("../../clientType");
var clipperUrls_1 = require("../../clipperUrls");
var constants_1 = require("../../constants");
var urlUtils_1 = require("../../urlUtils");
var Log = require("../../logging/log");
var clipperData_1 = require("../../storage/clipperData");
var LocalStorage_1 = require("../../storage/LocalStorage");
var extensionWorkerBase_1 = require("../extensionWorkerBase");
var injectHelper_1 = require("../injectHelper");
var webExtension_1 = require("./webExtension");
var webExtensionMessageHandler_1 = require("./webExtensionMessageHandler");
var WebExtensionWorker = (function (_super) {
    __extends(WebExtensionWorker, _super);
    function WebExtensionWorker(injectUrls, tab, clientInfo, auth) {
        var _this = this;
        var messageHandlerThunk = function () { return new webExtensionMessageHandler_1.WebExtensionBackgroundMessageHandler(tab.id); };
        _this = _super.call(this, clientInfo, auth, new clipperData_1.ClipperData(new LocalStorage_1.LocalStorage()), messageHandlerThunk, messageHandlerThunk) || this;
        _this.injectUrls = injectUrls;
        _this.tab = tab;
        _this.tabId = tab.id;
        _this.noOpTrackerInvoked = false;
        var isPrivateWindow = !!tab.incognito || !!tab.inPrivate;
        _this.logger.setContextProperty(Log.Context.Custom.InPrivateBrowsing, isPrivateWindow.toString());
        _this.invokeDebugLoggingIfEnabled();
        return _this;
    }
    /**
     * Get the url associated with this worker's tab
     */
    WebExtensionWorker.prototype.getUrl = function () {
        return this.tab.url;
    };
    /**
     * Launches the sign in window, rejecting with an error object if something went wrong on the server during
     * authentication. Otherwise, it resolves with true if the redirect endpoint was hit as a result of a successful
     * sign in attempt, and false if it was not hit (e.g., user manually closed the popup)
     */
    WebExtensionWorker.prototype.doSignInAction = function (authType) {
        var usidQueryParamValue = this.getUserSessionIdQueryParamValue();
        var signInUrl = clipperUrls_1.ClipperUrls.generateSignInUrl(this.clientInfo.get().clipperId, usidQueryParamValue, userInfo_1.AuthType[authType]);
        return this.launchWebExtensionPopupAndWaitForClose(signInUrl, constants_1.Constants.Urls.Authentication.authRedirectUrl);
    };
    /**
     * Signs the user out
     */
    WebExtensionWorker.prototype.doSignOutAction = function (authType) {
        var usidQueryParamValue = this.getUserSessionIdQueryParamValue();
        var signOutUrl = clipperUrls_1.ClipperUrls.generateSignOutUrl(this.clientInfo.get().clipperId, usidQueryParamValue, userInfo_1.AuthType[authType]);
        browserUtils_1.BrowserUtils.appendHiddenIframeToDocument(signOutUrl);
    };
    /**
     * Notify the UI to invoke the clipper. Resolve with true if it was thought to be successfully
     * injected; otherwise resolves with false.
     */
    WebExtensionWorker.prototype.invokeClipperBrowserSpecific = function () {
        var _this = this;
        return new Promise(function (resolve) {
            webExtension_1.WebExtension.browser.tabs.executeScript(_this.tab.id, {
                code: 'var frameUrl = "' + webExtension_1.WebExtension.browser.extension.getURL("clipper.html") + '";'
            }, function () {
                if (webExtension_1.WebExtension.browser.runtime.lastError) {
                    Log.ErrorUtils.sendFailureLogRequest({
                        label: Log.Failure.Label.UnclippablePage,
                        properties: {
                            failureType: Log.Failure.Type.Expected,
                            failureInfo: { error: JSON.stringify({ error: webExtension_1.WebExtension.browser.runtime.lastError.message, url: _this.tab.url }) },
                            stackTrace: Log.Failure.getStackTrace()
                        },
                        clientInfo: _this.clientInfo
                    });
                    // In Firefox, alert() is not callable from the background, so it looks like we have to no-op here
                    if (_this.clientInfo.get().clipperType !== clientType_1.ClientType.FirefoxExtension) {
                        injectHelper_1.InjectHelper.alertUserOfUnclippablePage();
                    }
                    resolve(false);
                }
                else {
                    webExtension_1.WebExtension.browser.tabs.executeScript(_this.tab.id, { file: _this.injectUrls.webClipperInjectUrl });
                    if (!_this.noOpTrackerInvoked) {
                        _this.setUpNoOpTrackers(_this.tab.url);
                        _this.noOpTrackerInvoked = true;
                    }
                    resolve(true);
                }
            });
        });
    };
    /**
     * Notify the UI to invoke the frontend script that handles logging to the conosle. Resolve with
     * true if it was thought to be successfully injected; otherwise resolves with false.
     */
    WebExtensionWorker.prototype.invokeDebugLoggingBrowserSpecific = function () {
        var _this = this;
        return new Promise(function (resolve) {
            webExtension_1.WebExtension.browser.tabs.executeScript(_this.tab.id, { file: _this.injectUrls.debugLoggingInjectUrl }, function () {
                if (webExtension_1.WebExtension.browser.runtime.lastError) {
                    // We are probably on a page like about:blank, which is pretty normal
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    WebExtensionWorker.prototype.invokePageNavBrowserSpecific = function () {
        var _this = this;
        return new Promise(function (resolve) {
            webExtension_1.WebExtension.browser.tabs.executeScript(_this.tab.id, {
                code: 'var frameUrl = "' + webExtension_1.WebExtension.browser.extension.getURL("pageNav.html") + '";'
            }, function () {
                // It's safest to not use lastError in the resolve due to special behavior in the Chrome API
                if (webExtension_1.WebExtension.browser.runtime.lastError) {
                    // We are probably on a page like about:blank, which is pretty normal
                    resolve(false);
                }
                else {
                    webExtension_1.WebExtension.browser.tabs.executeScript(_this.tab.id, { file: _this.injectUrls.pageNavInjectUrl });
                    resolve(true);
                }
            });
        });
    };
    /**
     * Notify the UI to invoke the What's New tooltip. Resolve with true if it was thought to be successfully
     * injected; otherwise resolves with false.
     */
    WebExtensionWorker.prototype.invokeWhatsNewTooltipBrowserSpecific = function (newVersions) {
        return this.invokePageNavBrowserSpecific();
    };
    WebExtensionWorker.prototype.invokeTooltipBrowserSpecific = function () {
        return this.invokePageNavBrowserSpecific();
    };
    WebExtensionWorker.prototype.isAllowedFileSchemeAccessBrowserSpecific = function (callback) {
        var _this = this;
        if (!webExtension_1.WebExtension.browser.extension.isAllowedFileSchemeAccess) {
            callback(true);
            return;
        }
        webExtension_1.WebExtension.browser.extension.isAllowedFileSchemeAccess(function (isAllowed) {
            if (!isAllowed && _this.tab.url.indexOf("file:///") === 0) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    };
    /**
     * Gets the visible tab's screenshot as an image url
     */
    WebExtensionWorker.prototype.takeTabScreenshot = function () {
        return new Promise(function (resolve) {
            webExtension_1.WebExtension.browser.tabs.query({ active: true, lastFocusedWindow: true }, function () {
                webExtension_1.WebExtension.browser.tabs.captureVisibleTab({ format: "png" }, function (dataUrl) {
                    resolve(dataUrl);
                });
            });
        });
    };
    WebExtensionWorker.prototype.launchWebExtensionPopupAndWaitForClose = function (url, autoCloseDestinationUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var popupWidth = 1000;
            var popupHeight = 700;
            var leftPosition = (screen && screen.width) ? Math.round((screen.width - popupWidth) / 2) : 0;
            var topPosition = (screen && screen.height) ? Math.round((screen.height - popupHeight) / 2) : 0;
            try {
                /* As of 7/19/2016, Firefox does not yet supported the "focused" key for windows.create in the WebExtensions API */
                /* See bug filed here: https://bugzilla.mozilla.org/show_bug.cgi?id=1213484 */
                var windowOptions = {
                    height: popupHeight,
                    left: leftPosition,
                    top: topPosition,
                    type: "popup",
                    url: url,
                    width: popupWidth
                };
                if (_this.clientInfo.get().clipperType !== clientType_1.ClientType.FirefoxExtension) {
                    windowOptions.focused = true;
                }
                webExtension_1.WebExtension.browser.windows.create(windowOptions, function (newWindow) {
                    var redirectOccurred = false;
                    var errorObject;
                    var correlationId;
                    var redirectListener = function (details) {
                        redirectOccurred = true;
                        // Find and get correlation id
                        if (details.responseHeaders) {
                            for (var i = 0; i < details.responseHeaders.length; i++) {
                                if (details.responseHeaders[i].name === constants_1.Constants.HeaderValues.correlationId) {
                                    correlationId = details.responseHeaders[i].value;
                                    break;
                                }
                            }
                        }
                        var redirectUrl = details.url;
                        var error = urlUtils_1.UrlUtils.getQueryValue(redirectUrl, constants_1.Constants.Urls.QueryParams.error);
                        var errorDescription = urlUtils_1.UrlUtils.getQueryValue(redirectUrl, constants_1.Constants.Urls.QueryParams.errorDescription);
                        if (error || errorDescription) {
                            errorObject = { error: error, errorDescription: errorDescription, correlationId: correlationId };
                        }
                        webExtension_1.WebExtension.browser.webRequest.onCompleted.removeListener(redirectListener);
                        webExtension_1.WebExtension.browser.tabs.remove(details.tabId);
                    };
                    webExtension_1.WebExtension.browser.webRequest.onCompleted.addListener(redirectListener, {
                        windowId: newWindow.id, urls: [autoCloseDestinationUrl + "*"]
                    }, ["responseHeaders"]);
                    var closeListener = function (tabId, tabRemoveInfo) {
                        if (tabRemoveInfo.windowId === newWindow.id) {
                            errorObject ? reject(errorObject) : resolve(redirectOccurred);
                            webExtension_1.WebExtension.browser.tabs.onRemoved.removeListener(closeListener);
                        }
                    };
                    webExtension_1.WebExtension.browser.tabs.onRemoved.addListener(closeListener);
                });
            }
            catch (e) {
                // In the event that there was an exception thrown during the creation of the popup, fallback to using window.open with a monitor
                _this.logger.logFailure(Log.Failure.Label.WebExtensionWindowCreate, Log.Failure.Type.Unexpected, { error: e.message });
                _this.launchPopupAndWaitForClose(url).then(function (redirectOccurred) {
                    // From chrome's background, we currently are unable to reliably determine if the redirect happened
                    resolve(true /* redirectOccurred */);
                }, function (errorObject) {
                    reject(errorObject);
                });
            }
        });
    };
    return WebExtensionWorker;
}(extensionWorkerBase_1.ExtensionWorkerBase));
exports.WebExtensionWorker = WebExtensionWorker;

},{"../../browserUtils":1,"../../clientType":2,"../../clipperUrls":4,"../../constants":10,"../../logging/log":45,"../../storage/LocalStorage":65,"../../storage/clipperData":66,"../../urlUtils":71,"../../userInfo":72,"../extensionWorkerBase":23,"../injectHelper":26,"./webExtension":32,"./webExtensionMessageHandler":33}],36:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var logger_1 = require("../logging/logger");
var WorkerPassthroughLogger = (function (_super) {
    __extends(WorkerPassthroughLogger, _super);
    function WorkerPassthroughLogger(workers) {
        var _this = _super.call(this) || this;
        _this.workers = workers;
        return _this;
    }
    WorkerPassthroughLogger.prototype.logEvent = function (event) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().logEvent(event);
        }
    };
    WorkerPassthroughLogger.prototype.pushToStream = function (label, value) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().pushToStream(label, value);
        }
    };
    WorkerPassthroughLogger.prototype.logFailure = function (label, failureType, failureInfo, id) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().logFailure(label, failureType, failureInfo, id);
        }
    };
    WorkerPassthroughLogger.prototype.logUserFunnel = function (label) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().logUserFunnel(label);
        }
    };
    WorkerPassthroughLogger.prototype.logSessionStart = function () {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().logSessionStart();
        }
    };
    WorkerPassthroughLogger.prototype.logSessionEnd = function (endTrigger) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().logSessionEnd(endTrigger);
        }
    };
    WorkerPassthroughLogger.prototype.logTrace = function (label, level, message) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().logTrace(label, level, message);
        }
    };
    WorkerPassthroughLogger.prototype.logClickEvent = function (clickId) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().logClickEvent(clickId);
        }
    };
    WorkerPassthroughLogger.prototype.setContextProperty = function (key, value) {
        for (var _i = 0, _a = this.workers; _i < _a.length; _i++) {
            var worker = _a[_i];
            worker.getLogger().setContextProperty(key, value);
        }
    };
    return WorkerPassthroughLogger;
}(logger_1.Logger));
exports.WorkerPassthroughLogger = WorkerPassthroughLogger;

},{"../logging/logger":47}],37:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require("./http");
var objectUtils_1 = require("../objectUtils");
var promiseUtils_1 = require("../promiseUtils");
/**
 * Helper class which extends the Http class in order to allow automatic retries.
 */
var HttpWithRetries = (function (_super) {
    __extends(HttpWithRetries, _super);
    function HttpWithRetries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HttpWithRetries.get = function (url, headers, timeout, expectedCodes, retryOptions) {
        var _this = this;
        if (timeout === void 0) { timeout = http_1.Http.defaultTimeout; }
        if (expectedCodes === void 0) { expectedCodes = [200]; }
        var func = function () {
            return _super.createAndSendRequest.call(_this, "GET", url, headers, expectedCodes, timeout);
        };
        return promiseUtils_1.PromiseUtils.execWithRetry(func, retryOptions);
    };
    HttpWithRetries.post = function (url, data, headers, expectedCodes, timeout, retryOptions) {
        var _this = this;
        if (expectedCodes === void 0) { expectedCodes = [200]; }
        if (timeout === void 0) { timeout = http_1.Http.defaultTimeout; }
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(data)) {
            throw new Error("data must be a non-undefined object, but was: " + data);
        }
        var func = function () {
            return _super.createAndSendRequest.call(_this, "POST", url, headers, expectedCodes, timeout, data);
        };
        return promiseUtils_1.PromiseUtils.execWithRetry(func, retryOptions);
    };
    return HttpWithRetries;
}(http_1.Http));
exports.HttpWithRetries = HttpWithRetries;

},{"../objectUtils":60,"../promiseUtils":63,"./http":40}],38:[function(require,module,exports){
"use strict";
/**
 * Allows the creation of HTTP GET requests to retrieve data, as well as caching of the result.
 */
var CachedHttp = (function () {
    function CachedHttp(cache) {
        this.cache = cache;
    }
    /**
     * Given a key, checks the cache for a fresh copy of that value. If the cached value does
     * not exist, or is not fresh, fetches a fresh copy of the data from the specified endpoint.
     */
    CachedHttp.prototype.getFreshValue = function (key, getRemoteValue, updateInterval) {
        if (!key) {
            throw new Error("key must be a non-empty string, but was: " + key);
        }
        else if (!getRemoteValue) {
            throw new Error("getRemoteValue must be non-undefined");
        }
        else if (updateInterval < 0) {
            updateInterval = 0;
        }
        var value = this.cache.getValue(key);
        var keyIsPresent = !!value;
        if (keyIsPresent) {
            var valueAsJson = void 0;
            try {
                valueAsJson = JSON.parse(value);
            }
            catch (e) {
                return Promise.reject({ error: e });
            }
            var valueHasExpired = CachedHttp.valueHasExpired(valueAsJson, updateInterval);
            if (!valueHasExpired) {
                return Promise.resolve(valueAsJson);
            }
        }
        return this.getAndCacheRemoteValue(key, getRemoteValue);
    };
    CachedHttp.prototype.getAndCacheRemoteValue = function (key, getRemoteValue) {
        var _this = this;
        if (!key) {
            throw new Error("key must be a non-empty string, but was: " + key);
        }
        if (!getRemoteValue) {
            throw new Error("getRemoteValue must be non-undefined");
        }
        return getRemoteValue().then(function (responsePackage) {
            var setValue = _this.setTimeStampedValue(key, responsePackage.parsedResponse);
            if (!setValue) {
                // Fresh data from the remote was unavailable
                _this.cache.removeKey(key);
            }
            return Promise.resolve(setValue);
        })["catch"](function (error) {
            // TODO: Don't use OneNoteApi.RequestError
            _this.cache.removeKey(key);
            return Promise.reject(error);
        });
    };
    /**
     * Returns true if the timestamped data is older than the expiry time; false otherwise.
     */
    CachedHttp.valueHasExpired = function (value, expiryTime) {
        var lastUpdated = value && value.lastUpdated ? value.lastUpdated : 0;
        return (Date.now() - lastUpdated >= expiryTime);
    };
    /*
     * Helper function that stores a value together with a timestamp as a json string. If
     * the specified value is null, undefined, or unable to be jsonified, the value is not
     * stored, and undefined is returned.
     */
    CachedHttp.prototype.setTimeStampedValue = function (key, value) {
        if (!key) {
            throw new Error("key must be a non-empty string, but was: " + key);
        }
        if (!value) {
            return undefined;
        }
        var valueAsJson;
        try {
            valueAsJson = JSON.parse(value);
        }
        catch (e) {
            return undefined;
        }
        var timeStampedValue = { data: valueAsJson, lastUpdated: Date.now() };
        this.cache.setValue(key, JSON.stringify(timeStampedValue));
        return timeStampedValue;
    };
    return CachedHttp;
}());
exports.CachedHttp = CachedHttp;

},{}],39:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("../constants");
var Log = require("../logging/log");
var cachedHttp_1 = require("./cachedHttp");
/**
 * Adds Clipper-specific logging functionality to the CachedHttp.
 */
var ClipperCachedHttp = (function (_super) {
    __extends(ClipperCachedHttp, _super);
    function ClipperCachedHttp(cache, logger) {
        var _this = _super.call(this, cache) || this;
        _this.logger = logger;
        return _this;
    }
    ClipperCachedHttp.prototype.setLogger = function (logger) {
        this.logger = logger;
    };
    ClipperCachedHttp.getDefaultExpiry = function () {
        return ClipperCachedHttp.defaultExpiry;
    };
    // Override
    ClipperCachedHttp.prototype.getFreshValue = function (key, getRemoteValue, updateInterval) {
        if (updateInterval === void 0) { updateInterval = ClipperCachedHttp.defaultExpiry; }
        if (!key) {
            this.logger.logFailure(Log.Failure.Label.InvalidArgument, Log.Failure.Type.Unexpected, { error: "getFreshValue key parameter should be passed a non-empty string" }, "" + key);
            return Promise.resolve(undefined);
        }
        else if (!getRemoteValue) {
            this.logger.logFailure(Log.Failure.Label.InvalidArgument, Log.Failure.Type.Unexpected, { error: "getFreshValue getRemoteValue parameter should be passed a non-undefined function" }, "" + getRemoteValue);
            return Promise.resolve(undefined);
        }
        else if (updateInterval < 0) {
            this.logger.logFailure(Log.Failure.Label.InvalidArgument, Log.Failure.Type.Unexpected, { error: "getFreshValue updateInterval parameter should be passed a number >= 0" }, "" + updateInterval);
            updateInterval = 0;
        }
        var loggedGetRemoteValue = this.addLoggingToGetResponseAsync(key, getRemoteValue, updateInterval);
        return _super.prototype.getFreshValue.call(this, key, loggedGetRemoteValue, updateInterval);
    };
    ClipperCachedHttp.prototype.addLoggingToGetResponseAsync = function (key, getResponseAsync, updateInterval) {
        var _this = this;
        return function () {
            // Need to download a fresh copy of the code.
            var fetchNonLocalDataEvent = new Log.Event.PromiseEvent(Log.Event.Label.FetchNonLocalData);
            fetchNonLocalDataEvent.setCustomProperty(Log.PropertyName.Custom.Key, key);
            fetchNonLocalDataEvent.setCustomProperty(Log.PropertyName.Custom.UpdateInterval, updateInterval);
            return new Promise(function (resolve, reject) {
                getResponseAsync().then(function (responsePackage) {
                    if (responsePackage.request) {
                        ClipperCachedHttp.addCorrelationIdToLogEvent(fetchNonLocalDataEvent, responsePackage.request);
                    }
                    resolve(responsePackage);
                }, function (error) {
                    fetchNonLocalDataEvent.setStatus(Log.Status.Failed);
                    fetchNonLocalDataEvent.setFailureInfo(error);
                    reject(error);
                }).then(function () {
                    _this.logger.logEvent(fetchNonLocalDataEvent);
                });
            });
        };
    };
    ClipperCachedHttp.addCorrelationIdToLogEvent = function (logEvent, request) {
        var correlationId = request.getResponseHeader(constants_1.Constants.HeaderValues.correlationId);
        if (correlationId) {
            logEvent.setCustomProperty(Log.PropertyName.Custom.CorrelationId, correlationId);
        }
    };
    return ClipperCachedHttp;
}(cachedHttp_1.CachedHttp));
ClipperCachedHttp.defaultExpiry = 12 * 60 * 60 * 1000; // 12 hours
exports.ClipperCachedHttp = ClipperCachedHttp;

},{"../constants":10,"../logging/log":45,"./cachedHttp":38}],40:[function(require,module,exports){
"use strict";
var objectUtils_1 = require("../objectUtils");
/**
 * Helper class for performing http requests. For each of the http methods, resolve(request) is only
 * called if the status code is an unexpected one, defined by the caller (defaulting to 200 only).
 *
 * TODO: Wean this off OneNoteApi.ErrorUtils once we move the general http logic into its own package.
 */
var Http = (function () {
    function Http() {
    }
    Http.get = function (url, headers, timeout, expectedCodes) {
        if (timeout === void 0) { timeout = Http.defaultTimeout; }
        if (expectedCodes === void 0) { expectedCodes = [200]; }
        return Http.createAndSendRequest("GET", url, headers, expectedCodes, timeout);
    };
    Http.post = function (url, data, headers, expectedCodes, timeout) {
        if (expectedCodes === void 0) { expectedCodes = [200]; }
        if (timeout === void 0) { timeout = Http.defaultTimeout; }
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(data)) {
            throw new Error("data must be a non-undefined object, but was: " + data);
        }
        return Http.createAndSendRequest("POST", url, headers, expectedCodes, timeout, data);
    };
    Http.createAndSendRequest = function (method, url, headers, expectedCodes, timeout, data) {
        if (expectedCodes === void 0) { expectedCodes = [200]; }
        if (timeout === void 0) { timeout = Http.defaultTimeout; }
        if (!url) {
            throw new Error("url must be a non-empty string, but was: " + url);
        }
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(method, url);
            request.onload = function () {
                if (expectedCodes.indexOf(request.status) > -1) {
                    resolve(request);
                }
                else {
                    reject(OneNoteApi.ErrorUtils.createRequestErrorObject(request, OneNoteApi.RequestErrorType.UNEXPECTED_RESPONSE_STATUS));
                }
            };
            request.onerror = function () {
                reject(OneNoteApi.ErrorUtils.createRequestErrorObject(request, OneNoteApi.RequestErrorType.NETWORK_ERROR));
            };
            request.ontimeout = function () {
                reject(OneNoteApi.ErrorUtils.createRequestErrorObject(request, OneNoteApi.RequestErrorType.REQUEST_TIMED_OUT));
            };
            Http.setHeaders(request, headers);
            request.timeout = timeout;
            request.send(data);
        });
    };
    Http.setHeaders = function (request, headers) {
        if (headers) {
            for (var key in headers) {
                request.setRequestHeader(key, headers[key]);
            }
        }
    };
    return Http;
}());
Http.defaultTimeout = 30000;
exports.Http = Http;

},{"../objectUtils":60}],41:[function(require,module,exports){
"use strict";
var Localization;
(function (Localization) {
    var FontFamily;
    (function (FontFamily) {
        FontFamily[FontFamily["Regular"] = 0] = "Regular";
        FontFamily[FontFamily["Bold"] = 1] = "Bold";
        FontFamily[FontFamily["Light"] = 2] = "Light";
        FontFamily[FontFamily["Semibold"] = 3] = "Semibold";
        FontFamily[FontFamily["Semilight"] = 4] = "Semilight";
    })(FontFamily = Localization.FontFamily || (Localization.FontFamily = {}));
    var localizedStrings;
    var formattedFontFamilies = {};
    // The fallback for when we are unable to fetch locstrings from our server
    var backupStrings = require("../../strings.json");
    /*
     * Gets the matching localized string, or the fallback (unlocalized) string if
     * unavailable.
     */
    function getLocalizedString(stringId) {
        if (!stringId) {
            throw new Error("stringId must be a non-empty string, but was: " + stringId);
        }
        if (localizedStrings) {
            var localResult = localizedStrings[stringId];
            if (localResult) {
                return localResult;
            }
        }
        var backupResult = backupStrings[stringId];
        if (backupResult) {
            return backupResult;
        }
        throw new Error("getLocalizedString could not find a localized or fallback string: " + stringId);
    }
    Localization.getLocalizedString = getLocalizedString;
    function setLocalizedStrings(localizedStringsAsJson) {
        localizedStrings = localizedStringsAsJson;
    }
    Localization.setLocalizedStrings = setLocalizedStrings;
    function getFontFamilyAsStyle(family) {
        return "font-family: " + getFontFamily(family) + ";";
    }
    Localization.getFontFamilyAsStyle = getFontFamilyAsStyle;
    function getFontFamily(family) {
        // Check cache first
        if (formattedFontFamilies[family]) {
            return formattedFontFamilies[family];
        }
        var stringId = "WebClipper.FontFamily." + FontFamily[family].toString();
        var fontFamily = getLocalizedString(stringId);
        formattedFontFamilies[family] = formatFontFamily(fontFamily);
        return formattedFontFamilies[family];
    }
    Localization.getFontFamily = getFontFamily;
    /*
     * If we want to set font families through JavaScript, it uses a specific
     * format. This helper function returns the formatted font family input.
     */
    function formatFontFamily(fontFamily) {
        if (!fontFamily) {
            return "";
        }
        var splits = fontFamily.split(",");
        for (var i = 0; i < splits.length; i++) {
            splits[i] = splits[i].trim();
            if (splits[i].length > 0 && splits[i].indexOf(" ") >= 0 && splits[i][0] !== "'" && splits[i][splits.length - 1] !== "'") {
                splits[i] = "'" + splits[i] + "'";
            }
        }
        return splits.join(",");
    }
    Localization.formatFontFamily = formatFontFamily;
})(Localization = exports.Localization || (exports.Localization = {}));

},{"../../strings.json":77}],42:[function(require,module,exports){
"use strict";
var constants_1 = require("../constants");
var urlUtils_1 = require("../urlUtils");
var HttpWithRetries_1 = require("../http/HttpWithRetries");
var LocalizationHelper = (function () {
    function LocalizationHelper() {
    }
    LocalizationHelper.makeLocStringsFetchRequest = function (locale) {
        var url = urlUtils_1.UrlUtils.addUrlQueryValue(constants_1.Constants.Urls.localizedStringsUrlBase, "locale", locale);
        return HttpWithRetries_1.HttpWithRetries.get(url).then(function (request) {
            return Promise.resolve({
                request: request,
                parsedResponse: request.responseText
            });
        });
    };
    return LocalizationHelper;
}());
exports.LocalizationHelper = LocalizationHelper;

},{"../constants":10,"../http/HttpWithRetries":37,"../urlUtils":71}],43:[function(require,module,exports){
"use strict";
var Rtl;
(function (Rtl) {
    var rtlLanguageCodes = ["ar", "fa", "he", "sd", "ug", "ur"];
    /*
     * Given a ISO 639-1 code (with optional ISO 3166 postfix), returns true
     * if and only if our localized string servers support that language, and
     * that language is RTL.
     */
    function isRtl(locale) {
        if (!locale) {
            return false;
        }
        var iso639P1LocaleCode = getIso639P1LocaleCode(locale);
        for (var i = 0; i < rtlLanguageCodes.length; i++) {
            if (iso639P1LocaleCode === rtlLanguageCodes[i]) {
                return true;
            }
        }
        return false;
    }
    Rtl.isRtl = isRtl;
    function getIso639P1LocaleCode(locale) {
        if (!locale) {
            return "";
        }
        return locale.split("-")[0].split("_")[0].toLowerCase();
    }
    Rtl.getIso639P1LocaleCode = getIso639P1LocaleCode;
})(Rtl = exports.Rtl || (exports.Rtl = {}));

},{}],44:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("../constants");
var Log = require("./log");
var logger_1 = require("./logger");
var CommunicatorLoggerPure = (function (_super) {
    __extends(CommunicatorLoggerPure, _super);
    function CommunicatorLoggerPure(communicator) {
        var _this = _super.call(this) || this;
        _this.communicator = communicator;
        return _this;
    }
    CommunicatorLoggerPure.prototype.logEvent = function (event) {
        if (!event.timerWasStopped()) {
            event.stopTimer();
        }
        // We need to send the event category as well so that the other side knows which one it is
        this.sendDataPackage(Log.LogMethods.LogEvent, [event.getEventCategory(), event.getEventData()]);
    };
    CommunicatorLoggerPure.prototype.logFailure = function (label, failureType, failureInfo, id) {
        this.sendDataPackage(Log.LogMethods.LogFailure, arguments);
    };
    CommunicatorLoggerPure.prototype.logUserFunnel = function (label) {
        this.sendDataPackage(Log.LogMethods.LogFunnel, arguments);
    };
    CommunicatorLoggerPure.prototype.logSessionStart = function () {
        this.sendDataPackage(Log.LogMethods.LogSessionStart, arguments);
    };
    CommunicatorLoggerPure.prototype.logSessionEnd = function (endTrigger) {
        this.sendDataPackage(Log.LogMethods.LogSessionEnd, arguments);
    };
    CommunicatorLoggerPure.prototype.logTrace = function (label, level, message) {
        if (message) {
            this.sendDataPackage(Log.LogMethods.LogTrace, [label, level, message]);
        }
        else {
            this.sendDataPackage(Log.LogMethods.LogTrace, [label, level]);
        }
    };
    CommunicatorLoggerPure.prototype.pushToStream = function (label, value) {
        this.sendDataPackage(Log.LogMethods.PushToStream, arguments);
    };
    CommunicatorLoggerPure.prototype.logClickEvent = function (clickId) {
        this.sendDataPackage(Log.LogMethods.LogClickEvent, arguments);
    };
    CommunicatorLoggerPure.prototype.setContextProperty = function (key, value) {
        this.sendDataPackage(Log.LogMethods.SetContextProperty, arguments);
    };
    CommunicatorLoggerPure.prototype.sendDataPackage = function (methodName, args) {
        var data = {
            methodName: methodName,
            methodArgs: Object.keys(args).map(function (key) { return args[key]; })
        };
        this.communicator.callRemoteFunction(constants_1.Constants.FunctionKeys.telemetry, { param: data });
    };
    return CommunicatorLoggerPure;
}(logger_1.Logger));
exports.CommunicatorLoggerPure = CommunicatorLoggerPure;

},{"../constants":10,"./log":45,"./logger":47}],45:[function(require,module,exports){
"use strict";
var event_1 = require("./submodules/event");
var logMethods_1 = require("./submodules/logMethods");
exports.contextPropertyNameRegex = /^[a-zA-Z0-9](([a-zA-Z0-9|_]){0,98}[a-zA-Z0-9])?$/;
exports.enableConsoleLogging = "enable_console_logging";
exports.reportData = "ReportData";
exports.unknownValue = "unknown";
function parseAndLogDataPackage(data, logger) {
    switch (data.methodName) {
        case logMethods_1.LogMethods.LogEvent:
            var eventCategory = data.methodArgs[0];
            var eventData = data.methodArgs[1];
            logger.logEvent.apply(logger, [event_1.Event.createEvent(eventCategory, eventData)]);
            break;
        case logMethods_1.LogMethods.LogFailure:
            logger.logFailure.apply(logger, data.methodArgs);
            break;
        case logMethods_1.LogMethods.PushToStream:
            logger.pushToStream.apply(logger, data.methodArgs);
            break;
        case logMethods_1.LogMethods.LogFunnel:
            logger.logUserFunnel.apply(logger, data.methodArgs);
            break;
        case logMethods_1.LogMethods.LogSessionStart:
            logger.logSessionStart.apply(logger, data.methodArgs);
            break;
        case logMethods_1.LogMethods.LogSessionEnd:
            logger.logSessionEnd.apply(logger, data.methodArgs);
            break;
        case logMethods_1.LogMethods.LogClickEvent:
            logger.logClickEvent.apply(logger, data.methodArgs);
            break;
        case logMethods_1.LogMethods.SetContextProperty:
            logger.setContextProperty.apply(logger, data.methodArgs);
            break;
        case logMethods_1.LogMethods.LogTrace:
        /* falls through */
        default:
            logger.logTrace.apply(logger, data.methodArgs);
            break;
    }
}
exports.parseAndLogDataPackage = parseAndLogDataPackage;
var click_1 = require("./submodules/click");
exports.Click = click_1.Click;
var context_1 = require("./submodules/context");
exports.Context = context_1.Context;
var errorUtils_1 = require("./submodules/errorUtils");
exports.ErrorUtils = errorUtils_1.ErrorUtils;
var event_2 = require("./submodules/event");
exports.Event = event_2.Event;
var failure_1 = require("./submodules/failure");
exports.Failure = failure_1.Failure;
var funnel_1 = require("./submodules/funnel");
exports.Funnel = funnel_1.Funnel;
var logMethods_2 = require("./submodules/logMethods");
exports.LogMethods = logMethods_2.LogMethods;
var noop_1 = require("./submodules/noop");
exports.NoOp = noop_1.NoOp;
var propertyName_1 = require("./submodules/propertyName");
exports.PropertyName = propertyName_1.PropertyName;
var session_1 = require("./submodules/session");
exports.Session = session_1.Session;
var status_1 = require("./submodules/status");
exports.Status = status_1.Status;
var trace_1 = require("./submodules/trace");
exports.Trace = trace_1.Trace;

},{"./submodules/click":48,"./submodules/context":49,"./submodules/errorUtils":50,"./submodules/event":51,"./submodules/failure":52,"./submodules/funnel":53,"./submodules/logMethods":54,"./submodules/noop":55,"./submodules/propertyName":56,"./submodules/session":57,"./submodules/status":58,"./submodules/trace":59}],46:[function(require,module,exports){
"use strict";
var Log = require("./log");
var LogHelpers;
(function (LogHelpers) {
    function createBaseEventAsJson(subCategory, label) {
        var baseEvent = {};
        baseEvent[Log.PropertyName.Reserved.EventType] = Log.reportData;
        baseEvent[Log.PropertyName.Reserved.Label] = label;
        var category = Log.PropertyName.Reserved.WebClipper + "." + subCategory;
        baseEvent[Log.PropertyName.Reserved.Category] = category;
        baseEvent[Log.PropertyName.Reserved.EventName] = category + "." + label;
        return baseEvent;
    }
    LogHelpers.createBaseEventAsJson = createBaseEventAsJson;
    /**
     * Creates and returns an event with category of Click and a label of `clickId`
     * @param clickId
     */
    function createClickEventAsJson(clickId) {
        if (!clickId) {
            throw new Error("Button clicked without an ID! Logged with ID " + JSON.stringify(clickId));
        }
        var clickEvent = LogHelpers.createBaseEventAsJson(Log.Click.category, clickId);
        return clickEvent;
    }
    LogHelpers.createClickEventAsJson = createClickEventAsJson;
    function createLogEventAsJson(event) {
        if (!event.timerWasStopped()) {
            event.stopTimer();
        }
        var eventCategory = event.getEventCategory();
        // Items that should exist on all event categories
        var logEvent = LogHelpers.createBaseEventAsJson(Log.Event.Category[eventCategory], event.getLabel());
        logEvent[Log.PropertyName.Reserved.Duration] = event.getDuration();
        addToLogEvent(logEvent, event.getCustomProperties());
        switch (eventCategory) {
            case Log.Event.Category.BaseEvent:
                break;
            case Log.Event.Category.PromiseEvent:
                addPromiseEventItems(logEvent, event);
                break;
            case Log.Event.Category.StreamEvent:
                addStreamEventItems(logEvent, event);
                break;
            default:
                throw new Error("createLogEvent does not specify a case for event category: " + Log.Event.Category[eventCategory]);
        }
        return logEvent;
    }
    LogHelpers.createLogEventAsJson = createLogEventAsJson;
    function addPromiseEventItems(logEvent, promiseEvent) {
        var status = promiseEvent.getStatus();
        logEvent[Log.PropertyName.Reserved.Status] = status;
        if (status === Log.Status[Log.Status.Failed]) {
            logEvent[Log.PropertyName.Reserved.FailureInfo] = promiseEvent.getFailureInfo();
            logEvent[Log.PropertyName.Reserved.FailureType] = promiseEvent.getFailureType();
        }
    }
    function addStreamEventItems(logEvent, streamEvent) {
        logEvent[Log.PropertyName.Reserved.Stream] = JSON.stringify(streamEvent.getEventData().Stream);
    }
    function createSetContextEventAsJson(key, value) {
        var baseEvent = new Log.Event.BaseEvent(Log.Event.Label.SetContextProperty);
        var event = LogHelpers.createBaseEventAsJson(Log.Event.Category[baseEvent.getEventCategory()], baseEvent.getLabel());
        var keyAsString = Log.Context.toString(key);
        event[Log.PropertyName.Custom[Log.PropertyName.Custom.Key]] = keyAsString;
        event[Log.PropertyName.Custom[Log.PropertyName.Custom.Value]] = value;
        return event;
    }
    LogHelpers.createSetContextEventAsJson = createSetContextEventAsJson;
    function createFailureEventAsJson(label, failureType, failureInfo, id) {
        var failureEvent = LogHelpers.createBaseEventAsJson(Log.Failure.category, Log.Failure.Label[label]);
        failureEvent[Log.PropertyName.Reserved.FailureType] = Log.Failure.Type[failureType];
        if (failureInfo) {
            failureEvent[Log.PropertyName.Reserved.FailureInfo] = Log.ErrorUtils.toString(failureInfo);
        }
        if (id) {
            failureEvent[Log.PropertyName.Reserved.Id] = id;
        }
        failureEvent[Log.PropertyName.Reserved.StackTrace] = Log.Failure.getStackTrace();
        return failureEvent;
    }
    LogHelpers.createFailureEventAsJson = createFailureEventAsJson;
    function createFunnelEventAsJson(label) {
        var funnelEvent = LogHelpers.createBaseEventAsJson(Log.Funnel.category, Log.Funnel.Label[label]);
        return funnelEvent;
    }
    LogHelpers.createFunnelEventAsJson = createFunnelEventAsJson;
    function createSessionStartEventAsJson() {
        var sessionEvent = LogHelpers.createBaseEventAsJson(Log.Session.category, Log.Session.State[Log.Session.State.Started]);
        return sessionEvent;
    }
    LogHelpers.createSessionStartEventAsJson = createSessionStartEventAsJson;
    function createSessionEndEventAsJson(endTrigger) {
        var sessionEvent = LogHelpers.createBaseEventAsJson(Log.Session.category, Log.Session.State[Log.Session.State.Ended]);
        sessionEvent[Log.PropertyName.Reserved.Trigger] = Log.Session.EndTrigger[endTrigger];
        return sessionEvent;
    }
    LogHelpers.createSessionEndEventAsJson = createSessionEndEventAsJson;
    function createTraceEventAsJson(label, level, message) {
        var traceEvent = LogHelpers.createBaseEventAsJson(Log.Trace.category, Log.Trace.Label[label]);
        if (message) {
            traceEvent[Log.PropertyName.Reserved.Message] = message;
        }
        traceEvent[Log.PropertyName.Reserved.Level] = Log.Trace.Level[level];
        switch (level) {
            case Log.Trace.Level.Warning:
                // Add stack trace to warnings
                traceEvent[Log.PropertyName.Reserved.StackTrace] = Log.Failure.getStackTrace();
                break;
            default:
                break;
        }
        return traceEvent;
    }
    LogHelpers.createTraceEventAsJson = createTraceEventAsJson;
    function addToLogEvent(logEvent, properties) {
        if (logEvent[Log.PropertyName.Reserved.Status] === Log.Status[Log.Status.Failed]) {
            logEvent[Log.PropertyName.Reserved.StackTrace] = Log.Failure.getStackTrace();
        }
        if (properties) {
            for (var name_1 in properties) {
                if (properties.hasOwnProperty(name_1)) {
                    var propValue = void 0;
                    if (typeof (properties[name_1]) === "object") {
                        propValue = JSON.stringify(properties[name_1]);
                    }
                    else {
                        propValue = properties[name_1];
                    }
                    logEvent[name_1] = propValue;
                }
            }
        }
    }
    LogHelpers.addToLogEvent = addToLogEvent;
    function isConsoleOutputEnabled() {
        try {
            if (localStorage.getItem(Log.enableConsoleLogging)) {
                return true;
            }
        }
        catch (e) { }
        ;
        return false;
    }
    LogHelpers.isConsoleOutputEnabled = isConsoleOutputEnabled;
})(LogHelpers = exports.LogHelpers || (exports.LogHelpers = {}));

},{"./log":45}],47:[function(require,module,exports){
"use strict";
var Log = require("./log");
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.logJsonParseUnexpected = function (value) {
        this.logFailure(Log.Failure.Label.JsonParse, Log.Failure.Type.Unexpected, undefined /* failureInfo */, value);
    };
    return Logger;
}());
exports.Logger = Logger;

},{"./log":45}],48:[function(require,module,exports){
"use strict";
var Click;
(function (Click) {
    Click.category = "Click";
    var Label;
    (function (Label) {
        Label.regionSelectionRemoveButton = "RegionSelectionRemoveButton";
        Label.sectionComponent = "SectionComponent";
        Label.sectionPickerLocationContainer = "SectionPickerLocationContainer";
    })(Label = Click.Label || (Click.Label = {}));
})(Click = exports.Click || (exports.Click = {}));

},{}],49:[function(require,module,exports){
"use strict";
var Context;
(function (Context) {
    var contextKeyToStringMap = {
        AppInfoId: "AppInfo.Id",
        AppInfoVersion: "AppInfo.Version",
        DeviceInfoId: "DeviceInfo.Id",
        ExtensionLifecycleId: "ExtensionLifecycle.Id",
        SessionId: "Session.Id",
        UserInfoId: "UserInfo.Id",
        UserInfoLanguage: "UserInfo.Language",
        AuthType: "AuthType",
        BrowserLanguage: "BrowserLanguage",
        ClipperType: "ClipperType",
        ContentType: "ContentType",
        FlightInfo: "FlightInfo",
        InPrivateBrowsing: "InPrivateBrowsing",
        InvokeHostname: "InvokeHostname",
        PageLanguage: "PageLanguage"
    };
    var Custom;
    (function (Custom) {
        Custom[Custom["AppInfoId"] = 0] = "AppInfoId";
        Custom[Custom["AppInfoVersion"] = 1] = "AppInfoVersion";
        Custom[Custom["ExtensionLifecycleId"] = 2] = "ExtensionLifecycleId";
        Custom[Custom["DeviceInfoId"] = 3] = "DeviceInfoId";
        Custom[Custom["SessionId"] = 4] = "SessionId";
        Custom[Custom["UserInfoId"] = 5] = "UserInfoId";
        Custom[Custom["UserInfoLanguage"] = 6] = "UserInfoLanguage";
        Custom[Custom["AuthType"] = 7] = "AuthType";
        Custom[Custom["BrowserLanguage"] = 8] = "BrowserLanguage";
        Custom[Custom["ClipperType"] = 9] = "ClipperType";
        Custom[Custom["ContentType"] = 10] = "ContentType";
        Custom[Custom["FlightInfo"] = 11] = "FlightInfo";
        Custom[Custom["InPrivateBrowsing"] = 12] = "InPrivateBrowsing";
        Custom[Custom["InvokeHostname"] = 13] = "InvokeHostname";
        Custom[Custom["PageLanguage"] = 14] = "PageLanguage";
    })(Custom = Context.Custom || (Context.Custom = {}));
    function toString(key) {
        return contextKeyToStringMap[Custom[key]];
    }
    Context.toString = toString;
})(Context = exports.Context || (exports.Context = {}));

},{}],50:[function(require,module,exports){
"use strict";
var clientType_1 = require("../../clientType");
var constants_1 = require("../../constants");
var objectUtils_1 = require("../../objectUtils");
var localization_1 = require("../../localization/localization");
var log_1 = require("../log");
var ErrorUtils;
(function (ErrorUtils) {
    var ErrorPropertyName;
    (function (ErrorPropertyName) {
        ErrorPropertyName[ErrorPropertyName["Error"] = 0] = "Error";
        ErrorPropertyName[ErrorPropertyName["StatusCode"] = 1] = "StatusCode";
        ErrorPropertyName[ErrorPropertyName["Response"] = 2] = "Response";
        ErrorPropertyName[ErrorPropertyName["ResponseHeaders"] = 3] = "ResponseHeaders";
        ErrorPropertyName[ErrorPropertyName["Timeout"] = 4] = "Timeout";
    })(ErrorPropertyName || (ErrorPropertyName = {}));
    function toString(originalError) {
        if (!originalError) {
            return undefined;
        }
        var errorToObject = {};
        errorToObject[ErrorPropertyName[ErrorPropertyName.Error].toLowerCase()] = originalError.error;
        var tryCastError = originalError;
        if (tryCastError && tryCastError.statusCode !== undefined) {
            errorToObject[ErrorPropertyName[ErrorPropertyName.StatusCode].toLowerCase()] = tryCastError.statusCode;
            errorToObject[ErrorPropertyName[ErrorPropertyName.Response].toLowerCase()] = tryCastError.response;
            errorToObject[ErrorPropertyName[ErrorPropertyName.ResponseHeaders].toLowerCase()] = tryCastError.responseHeaders;
            if (tryCastError.timeout !== undefined) {
                errorToObject[ErrorPropertyName[ErrorPropertyName.Timeout].toLowerCase()] = tryCastError.timeout;
            }
        }
        return JSON.stringify(errorToObject);
    }
    ErrorUtils.toString = toString;
    function clone(originalError) {
        if (!originalError) {
            return undefined;
        }
        var tryCastError = originalError;
        if (tryCastError && tryCastError.statusCode !== undefined) {
            if (tryCastError.timeout !== undefined) {
                return { error: tryCastError.error, statusCode: tryCastError.statusCode, response: tryCastError.response, responseHeaders: tryCastError.responseHeaders, timeout: tryCastError.timeout };
            }
            else {
                return { error: tryCastError.error, statusCode: tryCastError.statusCode, response: tryCastError.response, responseHeaders: tryCastError.responseHeaders };
            }
        }
        else {
            return { error: originalError.error };
        }
    }
    ErrorUtils.clone = clone;
    /**
     * Sends a request to the misc logging endpoint with relevant failure data as query parameters
     */
    function sendFailureLogRequest(data) {
        var propsObject = {};
        propsObject[constants_1.Constants.Urls.QueryParams.failureType] = log_1.Failure.Type[data.properties.failureType];
        propsObject[constants_1.Constants.Urls.QueryParams.failureInfo] = ErrorUtils.toString(data.properties.failureInfo);
        propsObject[constants_1.Constants.Urls.QueryParams.stackTrace] = data.properties.stackTrace;
        if (!objectUtils_1.ObjectUtils.isNullOrUndefined(data.properties.failureId)) {
            propsObject[constants_1.Constants.Urls.QueryParams.failureId] = data.properties.failureId;
        }
        var clientInfo = data.clientInfo;
        addDelayedSetValuesOnNoOp(propsObject, clientInfo);
        LogManager.sendMiscLogRequest({
            label: log_1.Failure.Label[data.label],
            category: log_1.Failure.category,
            properties: propsObject
        }, true);
    }
    ErrorUtils.sendFailureLogRequest = sendFailureLogRequest;
    function handleCommunicatorError(channel, e, clientInfo, message) {
        var errorValue;
        if (message) {
            errorValue = JSON.stringify({ message: message, error: e.toString() });
        }
        else {
            errorValue = e.toString();
        }
        ErrorUtils.sendFailureLogRequest({
            label: log_1.Failure.Label.UnhandledExceptionThrown,
            properties: {
                failureType: log_1.Failure.Type.Unexpected,
                failureInfo: { error: errorValue },
                failureId: "Channel " + channel,
                stackTrace: log_1.Failure.getStackTrace(e)
            },
            clientInfo: clientInfo
        });
        throw e;
    }
    ErrorUtils.handleCommunicatorError = handleCommunicatorError;
    /*
    * Sends a request to the misc logging endpoint with noop-relevant data as query parameters
    *	and shows an alert if the relevant property is set.
    */
    function sendNoOpTrackerRequest(props, shouldShowAlert) {
        if (shouldShowAlert === void 0) { shouldShowAlert = false; }
        var propsObject = {};
        propsObject[constants_1.Constants.Urls.QueryParams.channel] = props.channel;
        propsObject[constants_1.Constants.Urls.QueryParams.url] = encodeURIComponent(props.url);
        propsObject[constants_1.Constants.Urls.QueryParams.timeoutInMs] = constants_1.Constants.Settings.noOpTrackerTimeoutDuration.toString();
        var clientInfo = props.clientInfo;
        addDelayedSetValuesOnNoOp(propsObject, clientInfo);
        LogManager.sendMiscLogRequest({
            label: log_1.NoOp.Label[props.label],
            category: log_1.NoOp.category,
            properties: propsObject
        }, true);
        if (shouldShowAlert && window) {
            window.alert(localization_1.Localization.getLocalizedString("WebClipper.Error.NoOpError"));
        }
    }
    ErrorUtils.sendNoOpTrackerRequest = sendNoOpTrackerRequest;
    /*
    * Returns a TimeOut that should be cleared, otherwise sends a request to onenote.com/count
    *	with relevant no-op tracking data
    */
    function setNoOpTrackerRequestTimeout(props, shouldShowAlert) {
        if (shouldShowAlert === void 0) { shouldShowAlert = false; }
        return setTimeout(function () {
            sendNoOpTrackerRequest(props, shouldShowAlert);
        }, constants_1.Constants.Settings.noOpTrackerTimeoutDuration);
    }
    ErrorUtils.setNoOpTrackerRequestTimeout = setNoOpTrackerRequestTimeout;
    /**
     * During a noop scenario, most properties are retrieved at the construction of the NoOpProperties
     * object for setNoOpTrackerRequestTimeout. But some properties could benefit from waiting
     * until after the noop timeout before we attempt to retrieve them (e.g., smart values).
     * This is a helper function for adding these values to the props object on delay.
     */
    function addDelayedSetValuesOnNoOp(props, clientInfo) {
        if (clientInfo) {
            props[constants_1.Constants.Urls.QueryParams.clientType] = objectUtils_1.ObjectUtils.isNullOrUndefined(clientInfo.get()) ? log_1.unknownValue : clientType_1.ClientType[clientInfo.get().clipperType];
            props[constants_1.Constants.Urls.QueryParams.clipperVersion] = objectUtils_1.ObjectUtils.isNullOrUndefined(clientInfo.get()) ? log_1.unknownValue : clientInfo.get().clipperVersion;
            props[constants_1.Constants.Urls.QueryParams.clipperId] = objectUtils_1.ObjectUtils.isNullOrUndefined(clientInfo.get()) ? log_1.unknownValue : clientInfo.get().clipperId;
        }
    }
})(ErrorUtils = exports.ErrorUtils || (exports.ErrorUtils = {}));

},{"../../clientType":2,"../../constants":10,"../../localization/localization":41,"../../objectUtils":60,"../log":45}],51:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var log_1 = require("../log");
var objectUtils_1 = require("../../objectUtils");
var Event;
(function (Event) {
    var Category;
    (function (Category) {
        Category[Category["BaseEvent"] = 0] = "BaseEvent";
        Category[Category["PromiseEvent"] = 1] = "PromiseEvent";
        Category[Category["StreamEvent"] = 2] = "StreamEvent";
    })(Category = Event.Category || (Event.Category = {}));
    var Label;
    (function (Label) {
        Label[Label["AddEmbeddedVideo"] = 0] = "AddEmbeddedVideo";
        Label[Label["AugmentationApiCall"] = 1] = "AugmentationApiCall";
        Label[Label["BookmarkPage"] = 2] = "BookmarkPage";
        Label[Label["CompressRegionSelection"] = 3] = "CompressRegionSelection";
        Label[Label["ClearNoOpTracker"] = 4] = "ClearNoOpTracker";
        Label[Label["Click"] = 5] = "Click";
        Label[Label["ClipAugmentationOptions"] = 6] = "ClipAugmentationOptions";
        Label[Label["ClipCommonOptions"] = 7] = "ClipCommonOptions";
        Label[Label["ClipPdfOptions"] = 8] = "ClipPdfOptions";
        Label[Label["ClipRegionOptions"] = 9] = "ClipRegionOptions";
        Label[Label["ClipSelectionOptions"] = 10] = "ClipSelectionOptions";
        Label[Label["ClipToOneNoteAction"] = 11] = "ClipToOneNoteAction";
        Label[Label["CloseClipper"] = 12] = "CloseClipper";
        Label[Label["ClosePageNavTooltip"] = 13] = "ClosePageNavTooltip";
        Label[Label["CreateNotebook"] = 14] = "CreateNotebook";
        Label[Label["CreatePage"] = 15] = "CreatePage";
        Label[Label["CreateSection"] = 16] = "CreateSection";
        Label[Label["DebugFeedback"] = 17] = "DebugFeedback";
        Label[Label["DeviceIdMap"] = 18] = "DeviceIdMap";
        Label[Label["FetchNonLocalData"] = 19] = "FetchNonLocalData";
        Label[Label["FullPageScreenshotCall"] = 20] = "FullPageScreenshotCall";
        Label[Label["GetBinaryRequest"] = 21] = "GetBinaryRequest";
        Label[Label["GetCleanDom"] = 22] = "GetCleanDom";
        Label[Label["GetExistingUserInformation"] = 23] = "GetExistingUserInformation";
        Label[Label["GetFlightingAssignments"] = 24] = "GetFlightingAssignments";
        Label[Label["GetLocale"] = 25] = "GetLocale";
        Label[Label["GetLocalizedStrings"] = 26] = "GetLocalizedStrings";
        Label[Label["GetNotebookByName"] = 27] = "GetNotebookByName";
        Label[Label["GetNotebooks"] = 28] = "GetNotebooks";
        Label[Label["GetPage"] = 29] = "GetPage";
        Label[Label["GetPageContent"] = 30] = "GetPageContent";
        Label[Label["GetPages"] = 31] = "GetPages";
        Label[Label["HandleSignInEvent"] = 32] = "HandleSignInEvent";
        Label[Label["HideClipperDueToSpaNavigate"] = 33] = "HideClipperDueToSpaNavigate";
        Label[Label["InvokeClipper"] = 34] = "InvokeClipper";
        Label[Label["InvokeTooltip"] = 35] = "InvokeTooltip";
        Label[Label["InvokeWhatsNew"] = 36] = "InvokeWhatsNew";
        Label[Label["LocalFilesNotAllowedPanelShown"] = 37] = "LocalFilesNotAllowedPanelShown";
        Label[Label["PagesSearch"] = 38] = "PagesSearch";
        Label[Label["PdfByteMetadata"] = 39] = "PdfByteMetadata";
        Label[Label["PdfDataUrlMetadata"] = 40] = "PdfDataUrlMetadata";
        Label[Label["ProcessPdfIntoDataUrls"] = 41] = "ProcessPdfIntoDataUrls";
        Label[Label["RegionSelectionCapturing"] = 42] = "RegionSelectionCapturing";
        Label[Label["RegionSelectionLoading"] = 43] = "RegionSelectionLoading";
        Label[Label["RegionSelectionProcessing"] = 44] = "RegionSelectionProcessing";
        Label[Label["RetrieveUserInformation"] = 45] = "RetrieveUserInformation";
        Label[Label["SendBatchRequest"] = 46] = "SendBatchRequest";
        Label[Label["SetContextProperty"] = 47] = "SetContextProperty";
        Label[Label["SetDoNotPromptRatings"] = 48] = "SetDoNotPromptRatings";
        Label[Label["ShouldShowRatingsPrompt"] = 49] = "ShouldShowRatingsPrompt";
        Label[Label["TooltipImpression"] = 50] = "TooltipImpression";
        Label[Label["UpdatePage"] = 51] = "UpdatePage";
        Label[Label["UserInfoUpdated"] = 52] = "UserInfoUpdated";
        Label[Label["WhatsNewImpression"] = 53] = "WhatsNewImpression";
    })(Label = Event.Label || (Event.Label = {}));
    var BaseEvent = (function () {
        function BaseEvent(labelOrData) {
            this._timerWasStopped = false;
            if (this.isEventData(labelOrData)) {
                var eventData = labelOrData;
                this._label = eventData.Label;
                this._duration = eventData.Duration;
                // TODO theoretically, this is a dangerous set
                // because we're not doing the checks found in .setCustomProperty
                this._properties = eventData.Properties ? JSON.parse(JSON.stringify(eventData.Properties)) : undefined;
            }
            else {
                var label = labelOrData;
                this._label = label;
                this.startTimer();
            }
        }
        BaseEvent.prototype.getDuration = function () {
            return this._duration;
        };
        /**
         * Returns the object's event category. Should be overriden by child classes.
         */
        BaseEvent.prototype.getEventCategory = function () {
            return Event.Category.BaseEvent;
        };
        /**
         * Returns a copy of this BaseEvent's internal data
         * (copy to prevent altering of class internals without setters)
         */
        BaseEvent.prototype.getEventData = function () {
            return {
                Label: this._label,
                Duration: this._duration,
                Properties: this.getCustomProperties()
            };
        };
        BaseEvent.prototype.getLabel = function () {
            return Event.Label[this._label];
        };
        /**
         * Returns a copy of this Event's Properties
         * (copy to prevent altering of class internals without .setCustomProperty())
         */
        BaseEvent.prototype.getCustomProperties = function () {
            return this._properties ? JSON.parse(JSON.stringify(this._properties)) : undefined;
        };
        BaseEvent.prototype.setCustomProperty = function (key, value) {
            if (this.isReservedPropertyName(key)) {
                throw new Error("Tried to overwrite key '" + log_1.PropertyName.Custom[key] + "' with value of " + JSON.stringify(value));
            }
            if (!this._properties) {
                this._properties = {};
            }
            this._properties[log_1.PropertyName.Custom[key]] = value;
        };
        /**
         * Calling this multiple times in a row will result in restart of the timer
         */
        BaseEvent.prototype.startTimer = function () {
            this._startTime = new Date().getTime();
        };
        /**
         * If called multiple times in a row, last call wins
         * If called before startTimer(), nothing happens
         */
        BaseEvent.prototype.stopTimer = function () {
            if (this._startTime) {
                this._duration = new Date().getTime() - this._startTime;
                this._timerWasStopped = true;
                return true;
            }
            return false;
        };
        BaseEvent.prototype.timerWasStopped = function () {
            return this._timerWasStopped;
        };
        BaseEvent.prototype.isEventData = function (labelOrData) {
            var tryCastAsEventData = labelOrData;
            if (tryCastAsEventData && !objectUtils_1.ObjectUtils.isNullOrUndefined(tryCastAsEventData.Label)) {
                return true;
            }
            return false;
        };
        BaseEvent.prototype.isReservedPropertyName = function (value) {
            for (var v in log_1.PropertyName.Reserved) {
                if (log_1.PropertyName.Custom[value].toLowerCase() === v.toLowerCase()) {
                    return true;
                }
            }
            return false;
        };
        return BaseEvent;
    }());
    Event.BaseEvent = BaseEvent;
    var PromiseEvent = (function (_super) {
        __extends(PromiseEvent, _super);
        function PromiseEvent(labelOrData) {
            var _this = _super.call(this, labelOrData) || this;
            _this._logStatus = log_1.Status.Succeeded;
            _this._failureType = log_1.Failure.Type.Unexpected;
            if (_this.isEventData(labelOrData)) {
                var eventData = labelOrData;
                _this._logStatus = eventData.LogStatus;
                _this._failureType = eventData.FailureType;
                _this._failureInfo = log_1.ErrorUtils.clone(eventData.FailureInfo);
            }
            return _this;
        }
        PromiseEvent.prototype.getEventCategory = function () {
            return Event.Category.PromiseEvent;
        };
        /**
         * Returns a copy of this PromiseEvent's internal data
         * (copy to prevent altering of class internals without setters)
         */
        PromiseEvent.prototype.getEventData = function () {
            return {
                Label: this._label,
                Duration: this._duration,
                Properties: this.getCustomProperties(),
                LogStatus: this._logStatus,
                FailureType: this._failureType,
                FailureInfo: log_1.ErrorUtils.clone(this._failureInfo)
            };
        };
        PromiseEvent.prototype.getStatus = function () {
            return log_1.Status[this._logStatus];
        };
        PromiseEvent.prototype.setStatus = function (status) {
            this._logStatus = status;
            if (!this._timerWasStopped) {
                this.stopTimer();
            }
        };
        PromiseEvent.prototype.getFailureInfo = function () {
            return log_1.ErrorUtils.toString(this._failureInfo);
        };
        /**
         * Set this PromiseEvent's FailureInfo to a copy of the GenericError passed in
         * (copy to prevent altering of class internals without this setter)
         */
        PromiseEvent.prototype.setFailureInfo = function (failureInfo) {
            this._failureInfo = log_1.ErrorUtils.clone(failureInfo);
        };
        PromiseEvent.prototype.getFailureType = function () {
            return log_1.Failure.Type[this._failureType];
        };
        PromiseEvent.prototype.setFailureType = function (type) {
            this._failureType = type;
        };
        return PromiseEvent;
    }(BaseEvent));
    Event.PromiseEvent = PromiseEvent;
    var StreamEvent = (function (_super) {
        __extends(StreamEvent, _super);
        function StreamEvent(labelOrData) {
            var _this = _super.call(this, labelOrData) || this;
            _this._stream = [];
            if (_this.isEventData(labelOrData)) {
                var eventData = labelOrData;
                _this._stream = eventData.Stream;
            }
            return _this;
        }
        StreamEvent.prototype.getEventCategory = function () {
            return Event.Category.StreamEvent;
        };
        /**
         * Returns a copy of this StreamEvent's internal data
         * (copy to prevent altering of class internals without setters)
         */
        StreamEvent.prototype.getEventData = function () {
            return {
                Label: this._label,
                Duration: this._duration,
                Properties: this.getCustomProperties(),
                Stream: this._stream
            };
        };
        StreamEvent.prototype.append = function (streamItem) {
            this._stream.push(streamItem);
        };
        return StreamEvent;
    }(BaseEvent));
    Event.StreamEvent = StreamEvent;
    function createEvent(eventCategory, eventData) {
        switch (eventCategory) {
            default:
            case Event.Category.BaseEvent:
                return new Event.BaseEvent(eventData);
            case Event.Category.PromiseEvent:
                return new Event.PromiseEvent(eventData);
            case Event.Category.StreamEvent:
                return new Event.StreamEvent(eventData);
        }
    }
    Event.createEvent = createEvent;
})(Event = exports.Event || (exports.Event = {}));

},{"../../objectUtils":60,"../log":45}],52:[function(require,module,exports){
"use strict";
var Failure;
(function (Failure) {
    Failure.category = "Failure";
    var Type;
    (function (Type) {
        Type[Type["Unexpected"] = 0] = "Unexpected";
        Type[Type["Expected"] = 1] = "Expected"; /* ICE */
    })(Type = Failure.Type || (Failure.Type = {}));
    function getStackTrace(err) {
        if (!err) {
            err = new Error();
        }
        return err.stack;
    }
    Failure.getStackTrace = getStackTrace;
    var Label;
    (function (Label) {
        /* unexpected */
        Label[Label["ClickedButtonWithNoId"] = 0] = "ClickedButtonWithNoId";
        Label[Label["EndSessionWithoutTrigger"] = 1] = "EndSessionWithoutTrigger";
        Label[Label["GetChangeLog"] = 2] = "GetChangeLog";
        Label[Label["GetComputedStyle"] = 3] = "GetComputedStyle";
        Label[Label["GetLocalizedString"] = 4] = "GetLocalizedString";
        Label[Label["GetSetting"] = 5] = "GetSetting";
        Label[Label["IFrameMessageHandlerHasNoOtherWindow"] = 6] = "IFrameMessageHandlerHasNoOtherWindow";
        Label[Label["InvalidArgument"] = 7] = "InvalidArgument";
        Label[Label["IsFeatureEnabled"] = 8] = "IsFeatureEnabled";
        Label[Label["JsonParse"] = 9] = "JsonParse";
        Label[Label["NotImplemented"] = 10] = "NotImplemented";
        Label[Label["OnLaunchOneNoteButton"] = 11] = "OnLaunchOneNoteButton";
        Label[Label["OrphanedWebClippersDueToExtensionRefresh"] = 12] = "OrphanedWebClippersDueToExtensionRefresh";
        Label[Label["RegionSelectionProcessing"] = 13] = "RegionSelectionProcessing";
        Label[Label["RenderFailurePanel"] = 14] = "RenderFailurePanel";
        Label[Label["ReservedPropertyOverwriteAttempted"] = 15] = "ReservedPropertyOverwriteAttempted";
        Label[Label["SessionAlreadySet"] = 16] = "SessionAlreadySet";
        Label[Label["SetLoggerNoop"] = 17] = "SetLoggerNoop";
        Label[Label["SetUndefinedLocalizedStrings"] = 18] = "SetUndefinedLocalizedStrings";
        Label[Label["TraceLevelErrorWarningMessage"] = 19] = "TraceLevelErrorWarningMessage";
        Label[Label["UnhandledApiCode"] = 20] = "UnhandledApiCode";
        Label[Label["UnhandledExceptionThrown"] = 21] = "UnhandledExceptionThrown";
        Label[Label["UserSetWithInvalidExpiredData"] = 22] = "UserSetWithInvalidExpiredData";
        Label[Label["WebExtensionWindowCreate"] = 23] = "WebExtensionWindowCreate";
        /* expected */
        Label[Label["UnclippablePage"] = 24] = "UnclippablePage";
        Label[Label["UnsupportedBrowser"] = 25] = "UnsupportedBrowser";
    })(Label = Failure.Label || (Failure.Label = {}));
})(Failure = exports.Failure || (exports.Failure = {}));

},{}],53:[function(require,module,exports){
"use strict";
var Funnel;
(function (Funnel) {
    Funnel.category = "Funnel";
    var Label;
    (function (Label) {
        Label[Label["Invoke"] = 0] = "Invoke";
        Label[Label["AuthAlreadySignedIn"] = 1] = "AuthAlreadySignedIn";
        Label[Label["AuthAttempted"] = 2] = "AuthAttempted";
        Label[Label["AuthSignInCompleted"] = 3] = "AuthSignInCompleted";
        Label[Label["AuthSignInFailed"] = 4] = "AuthSignInFailed";
        Label[Label["ClipAttempted"] = 5] = "ClipAttempted";
        Label[Label["Interact"] = 6] = "Interact";
        Label[Label["ViewInWac"] = 7] = "ViewInWac";
        Label[Label["SignOut"] = 8] = "SignOut";
    })(Label = Funnel.Label || (Funnel.Label = {}));
})(Funnel = exports.Funnel || (exports.Funnel = {}));

},{}],54:[function(require,module,exports){
"use strict";
var LogMethods;
(function (LogMethods) {
    LogMethods[LogMethods["LogEvent"] = 0] = "LogEvent";
    LogMethods[LogMethods["LogFailure"] = 1] = "LogFailure";
    LogMethods[LogMethods["PushToStream"] = 2] = "PushToStream";
    LogMethods[LogMethods["LogFunnel"] = 3] = "LogFunnel";
    LogMethods[LogMethods["LogSession"] = 4] = "LogSession";
    LogMethods[LogMethods["LogSessionStart"] = 5] = "LogSessionStart";
    LogMethods[LogMethods["LogSessionEnd"] = 6] = "LogSessionEnd";
    LogMethods[LogMethods["LogTrace"] = 7] = "LogTrace";
    LogMethods[LogMethods["LogClickEvent"] = 8] = "LogClickEvent";
    LogMethods[LogMethods["SetContextProperty"] = 9] = "SetContextProperty";
})(LogMethods = exports.LogMethods || (exports.LogMethods = {}));

},{}],55:[function(require,module,exports){
"use strict";
var NoOp;
(function (NoOp) {
    NoOp.category = "NoOp";
    var Label;
    (function (Label) {
        Label[Label["InitializeCommunicator"] = 0] = "InitializeCommunicator";
        Label[Label["WebClipperUiFrameDidNotExist"] = 1] = "WebClipperUiFrameDidNotExist";
        Label[Label["WebClipperUiFrameIsNotVisible"] = 2] = "WebClipperUiFrameIsNotVisible";
    })(Label = NoOp.Label || (NoOp.Label = {}));
})(NoOp = exports.NoOp || (exports.NoOp = {}));

},{}],56:[function(require,module,exports){
"use strict";
var PropertyName;
(function (PropertyName) {
    var Custom;
    (function (Custom) {
        Custom[Custom["AnnotationAdded"] = 0] = "AnnotationAdded";
        Custom[Custom["AugmentationModel"] = 1] = "AugmentationModel";
        Custom[Custom["AverageProcessingDurationPerPage"] = 2] = "AverageProcessingDurationPerPage";
        Custom[Custom["BookmarkInfo"] = 3] = "BookmarkInfo";
        Custom[Custom["ByteLength"] = 4] = "ByteLength";
        Custom[Custom["BytesPerPdfPage"] = 5] = "BytesPerPdfPage";
        Custom[Custom["BytesTrimmed"] = 6] = "BytesTrimmed";
        Custom[Custom["Channel"] = 7] = "Channel";
        Custom[Custom["ClipMode"] = 8] = "ClipMode";
        Custom[Custom["CloseReason"] = 9] = "CloseReason";
        Custom[Custom["ContainsAtLeastOneHighlight"] = 10] = "ContainsAtLeastOneHighlight";
        Custom[Custom["ContentType"] = 11] = "ContentType";
        Custom[Custom["CorrelationId"] = 12] = "CorrelationId";
        Custom[Custom["CurrentPanel"] = 13] = "CurrentPanel";
        Custom[Custom["CurrentSectionStillExists"] = 14] = "CurrentSectionStillExists";
        Custom[Custom["DeviceIdInStorage"] = 15] = "DeviceIdInStorage";
        Custom[Custom["DeviceIdInCookie"] = 16] = "DeviceIdInCookie";
        Custom[Custom["DomSizeInBytes"] = 17] = "DomSizeInBytes";
        Custom[Custom["FeatureEnabled"] = 18] = "FeatureEnabled";
        Custom[Custom["FinalDataUrlLength"] = 19] = "FinalDataUrlLength";
        Custom[Custom["FontSize"] = 20] = "FontSize";
        Custom[Custom["ForceRetrieveFreshLocStrings"] = 21] = "ForceRetrieveFreshLocStrings";
        Custom[Custom["FreshUserInfoAvailable"] = 22] = "FreshUserInfoAvailable";
        Custom[Custom["FullPageScreenshotContentFound"] = 23] = "FullPageScreenshotContentFound";
        Custom[Custom["Height"] = 24] = "Height";
        Custom[Custom["InitialDataUrlLength"] = 25] = "InitialDataUrlLength";
        Custom[Custom["InvokeMode"] = 26] = "InvokeMode";
        Custom[Custom["InvokeSource"] = 27] = "InvokeSource";
        Custom[Custom["IsHighDpiScreen"] = 28] = "IsHighDpiScreen";
        Custom[Custom["IsRetryable"] = 29] = "IsRetryable";
        Custom[Custom["IsSerif"] = 30] = "IsSerif";
        Custom[Custom["Key"] = 31] = "Key";
        Custom[Custom["LastSeenTooltipTime"] = 32] = "LastSeenTooltipTime";
        Custom[Custom["LastUpdated"] = 33] = "LastUpdated";
        Custom[Custom["MaxDepth"] = 34] = "MaxDepth";
        Custom[Custom["NumPages"] = 35] = "NumPages";
        Custom[Custom["NumRegions"] = 36] = "NumRegions";
        Custom[Custom["NumTimesTooltipHasBeenSeen"] = 37] = "NumTimesTooltipHasBeenSeen";
        Custom[Custom["PageNavTooltipType"] = 38] = "PageNavTooltipType";
        Custom[Custom["PageTitleModified"] = 39] = "PageTitleModified";
        Custom[Custom["PdfAllPagesClipped"] = 40] = "PdfAllPagesClipped";
        Custom[Custom["PdfAttachmentClipped"] = 41] = "PdfAttachmentClipped";
        Custom[Custom["PdfFileSelectedPageCount"] = 42] = "PdfFileSelectedPageCount";
        Custom[Custom["PdfFileTotalPageCount"] = 43] = "PdfFileTotalPageCount";
        Custom[Custom["PdfIsBatched"] = 44] = "PdfIsBatched";
        Custom[Custom["PdfIsLocalFile"] = 45] = "PdfIsLocalFile";
        Custom[Custom["RatingsInfo"] = 46] = "RatingsInfo";
        Custom[Custom["ShouldShowRatingsPrompt"] = 47] = "ShouldShowRatingsPrompt";
        Custom[Custom["SignInCancelled"] = 48] = "SignInCancelled";
        Custom[Custom["StoredLocaleDifferentThanRequested"] = 49] = "StoredLocaleDifferentThanRequested";
        Custom[Custom["TimeToClearNoOpTracker"] = 50] = "TimeToClearNoOpTracker";
        Custom[Custom["TooltipType"] = 51] = "TooltipType";
        Custom[Custom["UpdateInterval"] = 52] = "UpdateInterval";
        Custom[Custom["UserInformationReturned"] = 53] = "UserInformationReturned";
        Custom[Custom["UserInformationStored"] = 54] = "UserInformationStored";
        Custom[Custom["UserUpdateReason"] = 55] = "UserUpdateReason";
        Custom[Custom["Url"] = 56] = "Url";
        Custom[Custom["Value"] = 57] = "Value";
        Custom[Custom["VideoDataOriginalSrcUrl"] = 58] = "VideoDataOriginalSrcUrl";
        Custom[Custom["VideoSrcUrl"] = 59] = "VideoSrcUrl";
        Custom[Custom["Width"] = 60] = "Width";
        Custom[Custom["WriteableCookies"] = 61] = "WriteableCookies";
    })(Custom = PropertyName.Custom || (PropertyName.Custom = {}));
    /* tslint:disable:variable-name */
    var Reserved;
    (function (Reserved) {
        Reserved.Category = "Category";
        Reserved.Duration = "Duration";
        Reserved.EventName = "EventName";
        Reserved.EventType = "EventType";
        Reserved.FailureInfo = "FailureInfo";
        Reserved.FailureType = "FailureType";
        Reserved.Id = "Id";
        Reserved.Label = "Label";
        Reserved.Level = "Level";
        Reserved.Message = "Message";
        Reserved.Properties = "Properties";
        Reserved.StackTrace = "StackTrace";
        Reserved.Status = "Status";
        Reserved.Stream = "Stream";
        Reserved.Trigger = "Trigger";
        Reserved.WebClipper = "WebClipper";
    })(Reserved = PropertyName.Reserved || (PropertyName.Reserved = {}));
    /* tslint:enable:variable-name */
})(PropertyName = exports.PropertyName || (exports.PropertyName = {}));

},{}],57:[function(require,module,exports){
"use strict";
var Session;
(function (Session) {
    Session.category = "Session";
    var EndTrigger;
    (function (EndTrigger) {
        EndTrigger[EndTrigger["SignOut"] = 0] = "SignOut";
        EndTrigger[EndTrigger["Unload"] = 1] = "Unload";
    })(EndTrigger = Session.EndTrigger || (Session.EndTrigger = {}));
    var State;
    (function (State) {
        State[State["Started"] = 0] = "Started";
        State[State["Ended"] = 1] = "Ended";
    })(State = Session.State || (Session.State = {}));
})(Session = exports.Session || (exports.Session = {}));

},{}],58:[function(require,module,exports){
"use strict";
var Status;
(function (Status) {
    Status[Status["Succeeded"] = 0] = "Succeeded";
    Status[Status["Failed"] = 1] = "Failed";
})(Status = exports.Status || (exports.Status = {}));

},{}],59:[function(require,module,exports){
"use strict";
var Trace;
(function (Trace) {
    Trace.category = "Trace";
    var Label;
    (function (Label) {
        Label[Label["DefaultingToConsoleLogger"] = 0] = "DefaultingToConsoleLogger";
        Label[Label["DebugMode"] = 1] = "DebugMode";
        Label[Label["RequestForClipperInstalledPageUrl"] = 2] = "RequestForClipperInstalledPageUrl";
    })(Label = Trace.Label || (Trace.Label = {}));
    var Level;
    (function (Level) {
        Level[Level["None"] = 0] = "None";
        Level[Level["Error"] = 1] = "Error";
        Level[Level["Warning"] = 2] = "Warning";
        Level[Level["Information"] = 3] = "Information";
        Level[Level["Verbose"] = 4] = "Verbose";
    })(Level = Trace.Level || (Trace.Level = {}));
})(Trace = exports.Trace || (exports.Trace = {}));

},{}],60:[function(require,module,exports){
"use strict";
var ObjectUtils;
(function (ObjectUtils) {
    function isNumeric(varToCheck) {
        return typeof varToCheck === "number" && !isNaN(varToCheck);
    }
    ObjectUtils.isNumeric = isNumeric;
    function isNullOrUndefined(varToCheck) {
        /* tslint:disable:no-null-keyword */
        return varToCheck === null || varToCheck === undefined;
        /* tslint:enable:no-null-keyword */
    }
    ObjectUtils.isNullOrUndefined = isNullOrUndefined;
})(ObjectUtils = exports.ObjectUtils || (exports.ObjectUtils = {}));

},{}],61:[function(require,module,exports){
"use strict";
var OperationResult;
(function (OperationResult) {
    OperationResult[OperationResult["Succeeded"] = 0] = "Succeeded";
    OperationResult[OperationResult["Failed"] = 1] = "Failed";
})(OperationResult = exports.OperationResult || (exports.OperationResult = {}));

},{}],62:[function(require,module,exports){
"use strict";
var promise = require("es6-promise");
var Polyfills;
(function (Polyfills) {
    function init() {
        endsWithPoly();
        objectAssignPoly();
        promisePoly();
        requestAnimationFramePoly();
    }
    Polyfills.init = init;
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
    function endsWithPoly() {
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (searchString, position) {
                var subjectString = this.toString();
                if (typeof position !== "number" || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                    position = subjectString.length;
                }
                position -= searchString.length;
                var lastIndex = subjectString.lastIndexOf(searchString, position);
                return lastIndex !== -1 && lastIndex === position;
            };
        }
    }
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    function objectAssignPoly() {
        if (typeof Object.assign !== "function") {
            Object.assign = function (target) {
                if (!target) {
                    throw new TypeError("Cannot convert undefined to object");
                }
                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        }
    }
    function promisePoly() {
        if (typeof Promise === "undefined") {
            promise.polyfill();
        }
    }
    function requestAnimationFramePoly() {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window.msRequestAnimationFrame || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || (function (callback) {
                setTimeout(function () {
                    callback(Date.now());
                }, 16);
            });
        }
    }
})(Polyfills = exports.Polyfills || (exports.Polyfills = {}));

},{"es6-promise":78}],63:[function(require,module,exports){
"use strict";
var PromiseUtils;
(function (PromiseUtils) {
    /**
     * Returns a promise that simply resolves after the specified time period
     */
    function wait(millieseconds) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, millieseconds);
        });
    }
    PromiseUtils.wait = wait;
    /**
     * Executes the given function and retries on failure.
     */
    function execWithRetry(func, retryOptions) {
        if (retryOptions === void 0) { retryOptions = { retryCount: 3, retryWaitTimeInMs: 3000 }; }
        return func()["catch"](function (error1) {
            if (retryOptions.retryCount > 0) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        retryOptions.retryCount--;
                        execWithRetry(func, retryOptions).then(function (response) {
                            resolve(response);
                        })["catch"](function (error2) {
                            reject(error2);
                        });
                    }, retryOptions.retryWaitTimeInMs);
                });
            }
            else {
                return Promise.reject(error1);
            }
        });
    }
    PromiseUtils.execWithRetry = execWithRetry;
})(PromiseUtils = exports.PromiseUtils || (exports.PromiseUtils = {}));

},{}],64:[function(require,module,exports){
"use strict";
// Load up the settings file
var settings = require("../settings.json");
var Settings;
(function (Settings) {
    function getSetting(name) {
        var localResult = settings[name];
        if (!localResult || !localResult.Value) {
            return undefined;
        }
        return localResult.Value;
    }
    Settings.getSetting = getSetting;
    function setSettingsJsonForTesting(jsonObject) {
        if (jsonObject) {
            settings = jsonObject;
        }
        else {
            // revert to default
            settings = require("../settings.json");
        }
    }
    Settings.setSettingsJsonForTesting = setSettingsJsonForTesting;
})(Settings = exports.Settings || (exports.Settings = {}));

},{"../settings.json":76}],65:[function(require,module,exports){
"use strict";
var LocalStorage = (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.getValue = function (key) {
        var result;
        if (window.localStorage) {
            result = window.localStorage.getItem(key);
            if (!result) {
                // Somehow we stored an invalid value. Destroy it!
                this.removeKey(key);
            }
        }
        return result;
    };
    LocalStorage.prototype.getValues = function (keys) {
        var values = {};
        if (window.localStorage && keys) {
            for (var i = 0; i < keys.length; i++) {
                var result = window.localStorage.getItem(keys[i]);
                if (!result) {
                    // Somehow we stored an invalid value. Destroy it!
                    this.removeKey(keys[i]);
                }
                else {
                    values[keys[i]] = result;
                }
            }
        }
        return values;
    };
    LocalStorage.prototype.setValue = function (key, value) {
        if (window.localStorage) {
            if (!value) {
                window.localStorage.removeItem(key);
            }
            else {
                window.localStorage.setItem(key, value);
            }
        }
    };
    LocalStorage.prototype.removeKey = function (key) {
        if (window.localStorage) {
            window.localStorage.removeItem(key);
        }
        return true;
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;

},{}],66:[function(require,module,exports){
"use strict";
var clipperCachedHttp_1 = require("../http/clipperCachedHttp");
var clipperStorageGateStrategy_1 = require("./clipperStorageGateStrategy");
/**
 * The data-access-like object that handles the fetching and caching of data
 * from Clipper-specific endpoints (TODO: a factory class that is responsible for
 * providing getRemoteValue objects?). Also provides a gating mechanism as a
 * sanity-check for what information gets stored locally.
 */
var ClipperData = (function () {
    function ClipperData(storage, logger) {
        this.storage = storage;
        this.storageGateStrategy = new clipperStorageGateStrategy_1.ClipperStorageGateStrategy(storage);
        // We pass 'this' as the Storage object as it handles all the sanity-check gating in the setValue
        this.cachedHttp = new clipperCachedHttp_1.ClipperCachedHttp(this, logger);
    }
    ClipperData.prototype.setLogger = function (logger) {
        this.cachedHttp.setLogger(logger);
    };
    ClipperData.prototype.getFreshValue = function (key, getRemoteValue, updateInterval) {
        return this.cachedHttp.getFreshValue(key, getRemoteValue, updateInterval);
    };
    ClipperData.prototype.getValue = function (key) {
        return this.storage.getValue(key);
    };
    ClipperData.prototype.getValues = function (keys) {
        return this.storage.getValues(keys);
    };
    ClipperData.prototype.setValue = function (key, value) {
        if (this.storageGateStrategy.shouldSet(key, value)) {
            this.storage.setValue(key, value);
        }
    };
    ClipperData.prototype.removeKey = function (key) {
        return this.storage.removeKey(key);
    };
    return ClipperData;
}());
exports.ClipperData = ClipperData;

},{"../http/clipperCachedHttp":39,"./clipperStorageGateStrategy":67}],67:[function(require,module,exports){
"use strict";
var clipperStorageKeys_1 = require("./clipperStorageKeys");
var ClipperStorageGateStrategy = (function () {
    function ClipperStorageGateStrategy(storage) {
        this.keysThatRequireUserInfo = [
            clipperStorageKeys_1.ClipperStorageKeys.cachedNotebooks,
            clipperStorageKeys_1.ClipperStorageKeys.currentSelectedSection
        ];
        this.storage = storage;
    }
    ClipperStorageGateStrategy.prototype.shouldSet = function (key, value) {
        // An undefined value is the same thing as removing a key, so we allow it regardless
        if (value && this.keysThatRequireUserInfo.indexOf(key) > -1) {
            var userInfo = this.storage.getValue(clipperStorageKeys_1.ClipperStorageKeys.userInformation);
            return !!userInfo;
        }
        return true;
    };
    return ClipperStorageGateStrategy;
}());
exports.ClipperStorageGateStrategy = ClipperStorageGateStrategy;

},{"./clipperStorageKeys":68}],68:[function(require,module,exports){
"use strict";
var ClipperStorageKeys;
(function (ClipperStorageKeys) {
    ClipperStorageKeys.clipperId = "clipperId";
    ClipperStorageKeys.cachedNotebooks = "notebooks";
    ClipperStorageKeys.currentSelectedSection = "curSection";
    ClipperStorageKeys.displayLanguageOverride = "displayLocaleOverride";
    ClipperStorageKeys.doNotPromptRatings = "doNotPromptRatings";
    ClipperStorageKeys.flightingInfo = "flightingInfo";
    ClipperStorageKeys.hasPatchPermissions = "hasPatchPermissions";
    ClipperStorageKeys.lastBadRatingDate = "lastBadRatingDate";
    ClipperStorageKeys.lastBadRatingVersion = "lastBadRatingVersion";
    ClipperStorageKeys.lastClippedDate = "lastClippedDate";
    ClipperStorageKeys.lastSeenVersion = "lastSeenVersion";
    ClipperStorageKeys.lastInvokedDate = "lastInvokedDate";
    ClipperStorageKeys.lastSeenTooltipTimeBase = "lastSeenTooltipTime";
    ClipperStorageKeys.lastClippedTooltipTimeBase = "lastClippedTooltipTime";
    ClipperStorageKeys.locale = "locale";
    ClipperStorageKeys.locStrings = "locStrings";
    ClipperStorageKeys.numSuccessfulClips = "numSuccessfulClips";
    ClipperStorageKeys.numSuccessfulClipsRatingsEnablement = "numSuccessfulClipsRatingsEnablement";
    ClipperStorageKeys.numTimesTooltipHasBeenSeenBase = "numTimesTooltipHasBeenSeen";
    ClipperStorageKeys.userInformation = "userInformation";
})(ClipperStorageKeys = exports.ClipperStorageKeys || (exports.ClipperStorageKeys = {}));

},{}],69:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],70:[function(require,module,exports){
"use strict";
var objectUtils_1 = require("./objectUtils");
var operationResult_1 = require("./operationResult");
var localization_1 = require("./localization/localization");
var _ = require("lodash");
var StringUtils;
(function (StringUtils) {
    /**
     * Takes a range of the form 1,3-6,7,8,13,1,3,4,a-b, etc. and then returns an array
     * corresponding to the numbers in that range. It ignores invalid input, sorts it, and removes duplicates
     */
    function parsePageRange(text, maxRange) {
        if (objectUtils_1.ObjectUtils.isNullOrUndefined(text)) {
            return asFailedOperation("");
        }
        text = text.trim();
        if (text === "") {
            return asFailedOperation("");
        }
        var splitText = text.split(",");
        var range = [];
        for (var i = 0; i < splitText.length; ++i) {
            var valueToAppend = [], matches = void 0;
            var currentValue = splitText[i].trim();
            if (currentValue === "") {
                // We relax the restriction by allowing and ignoring whitespace between commas
                continue;
            }
            if (/^\d+$/.test(currentValue)) {
                var digit = parseInt(currentValue, 10 /* radix */);
                if (digit === 0 || !objectUtils_1.ObjectUtils.isNullOrUndefined(maxRange) && digit > maxRange) {
                    return asFailedOperation(currentValue);
                }
                valueToAppend = [digit];
            }
            else if (matches = /^(\d+)\s*-\s*(\d+)$/.exec(currentValue)) {
                var lhs = parseInt(matches[1], 10), rhs = parseInt(matches[2], 10);
                // Try and catch an invalid range as soon as possible, before we compute the range
                // We also define a maxRangeAllowed as 2^32, which is the max size of an array in JS
                var maxRangeSizeAllowed = 4294967295;
                if (lhs >= rhs || lhs === 0 || rhs === 0 || lhs >= maxRangeSizeAllowed || rhs >= maxRangeSizeAllowed ||
                    rhs - lhs + 1 > maxRangeSizeAllowed || (!objectUtils_1.ObjectUtils.isNullOrUndefined(maxRange) && rhs > maxRange)) {
                    return asFailedOperation(currentValue);
                }
                valueToAppend = _.range(lhs, rhs + 1);
            }
            else {
                // The currentValue is not a single digit or a valid range
                return asFailedOperation(currentValue);
            }
            range = range.concat(valueToAppend);
        }
        var parsedPageRange = _(range).sortBy().sortedUniq().value();
        if (parsedPageRange.length === 0) {
            return asFailedOperation(text);
        }
        var last = _.last(parsedPageRange);
        if (!objectUtils_1.ObjectUtils.isNullOrUndefined(maxRange) && last > maxRange) {
            return asFailedOperation(last.toString());
        }
        return asSucceededOperation(parsedPageRange);
    }
    StringUtils.parsePageRange = parsePageRange;
    function asSucceededOperation(obj) {
        return {
            status: operationResult_1.OperationResult.Succeeded,
            result: obj
        };
    }
    function asFailedOperation(obj) {
        return {
            status: operationResult_1.OperationResult.Failed,
            result: obj
        };
    }
    function countPageRange(text) {
        var operation = parsePageRange(text);
        if (operation.status !== operationResult_1.OperationResult.Succeeded) {
            return 0;
        }
        var pages = operation.result;
        return pages ? pages.length : 0;
    }
    StringUtils.countPageRange = countPageRange;
    function getBatchedPageTitle(titleOfDocument, pageIndex) {
        var firstPageNumberAsString = (pageIndex + 1).toString();
        return titleOfDocument + ": " + localization_1.Localization.getLocalizedString("WebClipper.Label.Page") + " " + firstPageNumberAsString;
    }
    StringUtils.getBatchedPageTitle = getBatchedPageTitle;
    function generateGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    StringUtils.generateGuid = generateGuid;
})(StringUtils = exports.StringUtils || (exports.StringUtils = {}));

},{"./localization/localization":41,"./objectUtils":60,"./operationResult":61,"lodash":79}],71:[function(require,module,exports){
"use strict";
var objectUtils_1 = require("./objectUtils");
var settings_1 = require("./settings");
var tooltipType_1 = require("./clipperUI/tooltipType");
var UrlUtils;
(function (UrlUtils) {
    function checkIfUrlMatchesAContentType(url, tooltipTypes) {
        for (var i = 0; i < tooltipTypes.length; ++i) {
            var tooltipType = tooltipTypes[i];
            var contentTypeAsString = tooltipType_1.TooltipType[tooltipType];
            var contentTypeRegexes = settings_1.Settings.getSetting(contentTypeAsString + "Domains");
            var concatenatedRegExes = new RegExp(contentTypeRegexes.join("|"), "i");
            if (concatenatedRegExes.test(url)) {
                return tooltipType;
            }
        }
        return;
    }
    UrlUtils.checkIfUrlMatchesAContentType = checkIfUrlMatchesAContentType;
    function getFileNameFromUrl(url, fallbackResult) {
        if (!url) {
            return fallbackResult;
        }
        var regexResult = /\/(?=[^\/]+\.\w{3,4}$).+/g.exec(url);
        return regexResult && regexResult[0] ? regexResult[0].slice(1) : fallbackResult;
    }
    UrlUtils.getFileNameFromUrl = getFileNameFromUrl;
    function getHostname(url) {
        var l = document.createElement("a");
        l.href = url;
        return l.protocol + "//" + l.host + "/";
    }
    UrlUtils.getHostname = getHostname;
    function getPathname(url) {
        var l = document.createElement("a");
        l.href = url;
        var urlPathName = l.pathname;
        // We need to ensure the leading forward slash to make it consistant across all browsers.
        return ensureLeadingForwardSlash(urlPathName);
    }
    UrlUtils.getPathname = getPathname;
    function ensureLeadingForwardSlash(url) {
        url = objectUtils_1.ObjectUtils.isNullOrUndefined(url) ? "/" : url;
        return (url.length > 0 && url.charAt(0) === "/") ? url : "/" + url;
    }
    /**
     * Gets the query value of the given url and key.
     *
     * @param url The URL to get the query value from
     * @param key The query key in the URL to get the query value from
     * @return Undefined if the key does not exist; "" if the key exists but has no matching
     * value; otherwise the query value
     */
    function getQueryValue(url, key) {
        if (!url || !key) {
            return undefined;
        }
        var escapedKey = key.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + escapedKey + "(=([^&#]*)|&|#|$)", "i");
        var results = regex.exec(url);
        if (!results) {
            return undefined;
        }
        if (!results[2]) {
            return "";
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    UrlUtils.getQueryValue = getQueryValue;
    /**
     * Add a name/value pair to the query string of a URL.
     * If the name already exists, simply replace the value (there is no existing standard
     * for the usage of multiple identical names in the same URL, so we assume adding a
     * duplicate name is unintended).
     *
     * @param originalUrl The URL to add the name/value to
     * @param name New value name
     * @param value New value
     * @return Resulting URL
     */
    function addUrlQueryValue(originalUrl, key, value, keyToCamelCase) {
        if (keyToCamelCase === void 0) { keyToCamelCase = false; }
        if (!originalUrl || !key || !value) {
            return originalUrl;
        }
        if (keyToCamelCase) {
            key = key.charAt(0).toUpperCase() + key.slice(1);
        }
        // The fragment refers to the last part of the url consisting of "#" and everything after it
        var regexResult = originalUrl.match(/^([^#]*)(#.*)?$/);
        var beforeFragment = regexResult[1];
        var fragment = regexResult[2] ? regexResult[2] : "";
        var queryStartIndex = beforeFragment.indexOf("?");
        if (queryStartIndex === -1) {
            // There is no query string, so create a new one
            return beforeFragment + "?" + key + "=" + value + fragment;
        }
        else if (queryStartIndex === beforeFragment.length - 1) {
            // Sometimes for some reason there are no name/value pairs specified after the '?'
            return beforeFragment + key + "=" + value + fragment;
        }
        else {
            // Check that name does not already exist
            var pairs = beforeFragment.substring(queryStartIndex + 1).split("&");
            for (var i = 0; i < pairs.length; i++) {
                var splitPair = pairs[i].split("=");
                if (splitPair[0] === key) {
                    // Replace the value
                    pairs[i] = splitPair[0] + "=" + value;
                    return beforeFragment.substring(0, queryStartIndex + 1) + pairs.join("&") + fragment;
                }
            }
            // No existing name found
            return beforeFragment + "&" + key + "=" + value + fragment;
        }
    }
    UrlUtils.addUrlQueryValue = addUrlQueryValue;
    function onBlacklistedDomain(url) {
        return urlMatchesRegexInSettings(url, ["PageNav_BlacklistedDomains"]);
    }
    UrlUtils.onBlacklistedDomain = onBlacklistedDomain;
    function onWhitelistedDomain(url) {
        return urlMatchesRegexInSettings(url, ["AugmentationDefault_WhitelistedDomains", "ProductDomains", "RecipeDomains"]);
    }
    UrlUtils.onWhitelistedDomain = onWhitelistedDomain;
    function urlMatchesRegexInSettings(url, settingNames) {
        if (!url) {
            return false;
        }
        var domains = [];
        settingNames.forEach(function (settingName) {
            domains = domains.concat(settings_1.Settings.getSetting(settingName));
        });
        for (var _i = 0, domains_1 = domains; _i < domains_1.length; _i++) {
            var identifier = domains_1[_i];
            if (new RegExp(identifier).test(url)) {
                return true;
            }
        }
        return false;
    }
})(UrlUtils = exports.UrlUtils || (exports.UrlUtils = {}));

},{"./clipperUI/tooltipType":3,"./objectUtils":60,"./settings":64}],72:[function(require,module,exports){
"use strict";
var AuthType;
(function (AuthType) {
    AuthType[AuthType["Msa"] = 0] = "Msa";
    AuthType[AuthType["OrgId"] = 1] = "OrgId";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
var UpdateReason;
(function (UpdateReason) {
    UpdateReason[UpdateReason["InitialRetrieval"] = 0] = "InitialRetrieval";
    UpdateReason[UpdateReason["SignInAttempt"] = 1] = "SignInAttempt";
    UpdateReason[UpdateReason["SignInCancel"] = 2] = "SignInCancel";
    UpdateReason[UpdateReason["SignOutAction"] = 3] = "SignOutAction";
    UpdateReason[UpdateReason["TokenRefreshForPendingClip"] = 4] = "TokenRefreshForPendingClip";
})(UpdateReason = exports.UpdateReason || (exports.UpdateReason = {}));

},{}],73:[function(require,module,exports){
"use strict";
var ChangeLog;
(function (ChangeLog) {
    ChangeLog.schemaVersionSupported = "1";
})(ChangeLog = exports.ChangeLog || (exports.ChangeLog = {}));

},{}],74:[function(require,module,exports){
"use strict";
var version_1 = require("./version");
var ChangeLogHelper;
(function (ChangeLogHelper) {
    /**
     * Given a list of updates sorted in descending order, returns the updates that are more recent
     * than the specified verison. If the version is not specified (i.e., undefined), all updates
     * are returned.
     */
    function getUpdatesSinceVersion(updates, version) {
        if (!updates || updates.length === 0) {
            return [];
        }
        if (!version) {
            return updates;
        }
        for (var i = 0; i < updates.length; i++) {
            var updateVersion = new version_1.Version(updates[i].version);
            if (version.isGreaterThanOrEqualTo(updateVersion)) {
                return updates.slice(0, i);
            }
        }
        return updates;
    }
    ChangeLogHelper.getUpdatesSinceVersion = getUpdatesSinceVersion;
    /**
     * Given a list of updates sorted in descending order, returns the updates between a lower (exclusive)
     * and upper (inclusive) bound version. If the lower bound is not specified (i.e., undefined), all updates
     * before the upper bound are returned.
     */
    function getUpdatesBetweenVersions(updates, lowerVersion, higherVersion) {
        if (!updates || updates.length === 0) {
            return [];
        }
        var betweenUpdates = [];
        for (var i = 0; i < updates.length; i++) {
            var updateVersion = new version_1.Version(updates[i].version);
            if (lowerVersion && updateVersion.isLesserThanOrEqualTo(lowerVersion)) {
                break;
            }
            if (updateVersion.isLesserThanOrEqualTo(higherVersion)) {
                betweenUpdates.push(updates[i]);
            }
        }
        return betweenUpdates;
    }
    ChangeLogHelper.getUpdatesBetweenVersions = getUpdatesBetweenVersions;
    /**
     * Given a list of updates, returns the updates that contain at least one change that applies to the given
     * browser type (i.e., filtering out updates that do not apply to the specified browser).
     */
    function filterUpdatesThatDontApplyToBrowser(updates, browser) {
        if (!updates || !browser) {
            return [];
        }
        var filteredUpdates = [];
        for (var i = 0; i < updates.length; i++) {
            var update = updates[i];
            var filteredChanges = update.changes.filter(function (change) { return change.supportedBrowsers.indexOf(browser) !== -1; });
            // We are only interested in an update if it had at least one change relevant to the browser
            if (filteredChanges.length > 0) {
                // Do this to keep the function pure
                filteredUpdates.push({
                    version: update.version,
                    date: update.date,
                    changes: filteredChanges
                });
            }
        }
        return filteredUpdates;
    }
    ChangeLogHelper.filterUpdatesThatDontApplyToBrowser = filterUpdatesThatDontApplyToBrowser;
})(ChangeLogHelper = exports.ChangeLogHelper || (exports.ChangeLogHelper = {}));

},{"./version":75}],75:[function(require,module,exports){
"use strict";
var Version = (function () {
    function Version(version) {
        if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
            throw new Error("version must match 'int.int.int' pattern, but was: " + version);
        }
        var parts = version.split(".");
        this.major = parseInt(parts[0], 10);
        this.minor = parseInt(parts[1], 10);
        this.patch = parseInt(parts[2], 10);
        this.stringRepresentation = this.major + "." + this.minor + "." + this.patch;
    }
    Version.prototype.isEqualTo = function (other, ignorePatchUpdate) {
        return this.major === other.major && this.minor === other.minor && (ignorePatchUpdate || this.patch === other.patch);
    };
    Version.prototype.isGreaterThan = function (other, ignorePatchUpdate) {
        if (this.major !== other.major) {
            return this.major > other.major;
        }
        if (this.minor !== other.minor) {
            return this.minor > other.minor;
        }
        return ignorePatchUpdate ? false : this.patch > other.patch;
    };
    Version.prototype.isGreaterThanOrEqualTo = function (other, ignorePatchUpdate) {
        return this.isEqualTo(other, ignorePatchUpdate) || this.isGreaterThan(other, ignorePatchUpdate);
    };
    Version.prototype.isLesserThan = function (other, ignorePatchUpdate) {
        if (this.major !== other.major) {
            return this.major < other.major;
        }
        if (this.minor !== other.minor) {
            return this.minor < other.minor;
        }
        return ignorePatchUpdate ? false : this.patch < other.patch;
    };
    Version.prototype.isLesserThanOrEqualTo = function (other, ignorePatchUpdate) {
        return this.isEqualTo(other, ignorePatchUpdate) || this.isLesserThan(other, ignorePatchUpdate);
    };
    Version.prototype.toString = function () {
        return this.stringRepresentation;
    };
    return Version;
}());
exports.Version = Version;

},{}],76:[function(require,module,exports){
module.exports={
	"DummyObjectForTestingPurposes": {
		"Description": "Do not remove under any circumstances!",
		"Value": "Testing."
	},
	"AugmentationDefault_WhitelistedDomains": {
		"Description": "The set of domains on which we are changing the default clip mode to Augmentation.",
		"Value": [
			"^https?:\\/\\/www\\.onenote\\.com",
			"[^\\w]wikipedia",
			"[^\\w]nytimes",
			"[^\\w]lifehacker",
			"[^\\w]msn",
			"[^\\w]theguardian",
			"[^\\w]forbes",
			"[^\\w]bbc",
			"[^\\w]huffingtonpost",
			"[^\\w]businessinsider",
			"[^\\w]washingtonpost",
			"[^\\w]medium",
			"[^\\w]buzzfeed",
			"[^\\w]bbc",
			"[^\\w]theverge",
			"[^\\w]techcrunch",
			"[^\\w]amazon",
			"[^\\w]allrecipes",
			"[^\\w]foodnetwork",
			"[^\\w]seriouseats",
			"[^\\w]epicurious",
			"[^\\w]support.office.com",
			"[^\\w]blogs.office.com",
			"[^\\w]blogs.technet.com",
			"[^\\w]youtube\\.com\\/watch(\\?v=(\\w+)|.*\\&v=(\\w+))",
			"[^\\w]youtube\\.com\\/embed\\/(\\w+)",
			"[^\\w]vimeo\\.com.*?\\/(\\d+)($|\\?|\\#|\\/$)",
			"[^\\w]vimeo\\.com.*?\\/(\\d+)\\/\\w+:\\w+(\\/|$)",
			"[^\\w]vimeo\\.com.*?\\/ondemand\\/\\w+$",
			"[^\\w]khanacademy\\.org(.*)/v/(.*)",
			"\\/(\\d{2}|\\d{4})\\/\\d{1,2}\\/",
			"\\/(\\d{2}|\\d{4})-\\d{1,2}-\\d{1,2}\\/"
		]
	},
	"PageNav_BlacklistedDomains": {
		"Description": "The set of domains where we do not want to show any PageNav tooltip experience",
		"Value": [
			"^(http(s)?)://(login\\.live\\.com)",
			"^(http(s)?)://(login\\.microsoftonline\\.com)"
		]
	},
	"PdfDomains": {
		"Description": "PDF regexes",
		"Value": [
			"^.*(\\.pdf)$"
		]
	},
	"RecipeDomains": {
		"Description": "The set of domains where we want to show a Recipe tooltip",
		"Value": [
			"^(http(s)?)://(12tomatoes\\.com/)()([^/]*-[^/]*)/$",
			"^(http(s)?)://(abc\\.go\\.com/shows/the-chew/recipes/)([^/]*-[^/]*)$",
			"^(http(s)?)://(([^ ]{1,18})?)(allrecipes\\.com)()/(recipe/.*)$",
			"^(http(s)?)://((\\.{1,18}\\.)?)(allrecipes\\.)(com)/(recipe/[^/]+(/)?(/detail\\.aspx\\??)?)$",
			"^(http(s)?)://()(allrecipes\\.com)()/([r|R]ecipe/[^/]+/Detail\\.aspx)$",
			"^(http(s)?)://()(allrecipes\\.com)()/(recipe/.*)$",
			"^(http(s)?)://(cookieandkate\\.com)()/(\\d{4})/(.+)$",
			"^(http(s)?)://(cooking\\.)(nytimes\\.com)()/(recipes/(.*))$",
			"^(http(s)?)://()(cookpad\\.com)()/(recipe/[0-9]+$)$",
			"^(http(s)?)://()(damndelicious\\.net)()/\\d+/\\d+/\\d+/.+/$",
			"^(http(s)?)://(food52\\.com)()/recipes/[0-9]+-.+$",
			"^(http(s)?)://(minimalistbaker.com)/([^/]*-[^/]*)/$",
			"^(http(s)?)://(paleoleap.com)/([^/]*-[^/]*)/$",
			"^(http(s)?)://(pinchofyum.com)/([^/]*-[^/]*)$",
			"^(http(s)?)://(recipe\\.rakuten\\.co\\.jp)()/recipe/[0-9]+/$",
			"^(http(s)?)://()(thepioneerwoman\\.com)()/(cooking/.+/)$",
			"^(http(s)?)://((www\\.)?)(allrecipes\\.com)()/([r|R]ecipe/[^/]+/(Detail\\.aspx)?)$",
			"^(http(s)?)://((www\\.)?)(allrecipes\\.com)()/([R|r]ecipe/.*)$",
			"^(http(s)?)://(www\\.)(bbc\\.co\\.uk/food/recipes/[^/]*_\\d+)$",
			"^(http(s)?)://(www\\.)(bbcgoodfood\\.com)()/(recipes/[0-9]+/(.*))$",
			"^(http(s)?)://(www\\.)(bbcgoodfood\\.com)/recipes/([^/]*-[^/]*)$",
			"^(http(s)?)://(www\\.)(bettycrocker\\.com)()/(recipes/[^\\/]+/[0-9a-f-]{36}/?)$",
			"^(http(s)?)://(www\\.)(bonappetit\\.com)()/(recipe/(.*))$",
			"^(http(s)?)://(www\\.budgetbytes\\.com)/\\d{4}/\\d{2}/(.*)/",
			"^(http(s)?)://((www\\.)?)(chowhound\\.com)()/(recipes/.*)$",
			"^(http(s)?)://(www\\.cookingclassy\\.com)/\\d{4}/\\d{2}/(.*)/",
			"^(http(s)?)://(www\\.delish\\.com)/cooking/recipe-ideas/recipes/a\\d+/[^/]*-[^/]*/",
			"^(http(s)?)://(www\\.)(eatingwell\\.com)()/(recipe/\\d+/.+/)$",
			"^(http(s)?)://(www\\.)(epicurious\\.com)()/(recipes/food/views/.*)$",
			"^(http(s)?)://(www\\.)(food\\.com)()/(recipe/.*)$",
			"^(http(s)?)://(www\\.)(foodandwine\\.com)()/(recipes\\/.+)$",
			"^(http(s)?)://(www\\.)(foodnetwork)(\\.ca)/(recipe/(.*))$",
			"^(http(s)?)://(www\\.)(foodnetwork\\.com)()/(recipe-collections/.*)$",
			"^(http(s)?)://(www\\.)(foodnetwork\\.com)()/(recipes.*)$",
			"^(http(s)?)://(www\\.)(foodnetwork\\.com)()/(recipes/.*)$",
			"^(http(s)?)://(www\\.)(marthastewart\\.com)()/(([0-9]+|recipe)/.*)$",
			"^(http(s)?)://(www\\.)(marthastewart\\.com)()/([0-9]+/[^/]+)$",
			"^(http(s)?)://(www\\.)(myrecipes\\.com)()/(recipe/.*)$",
			"^(http(s)?)://(www\\.)(myrecipes\\.com)()/(recipe/.*-[0-9]*/)$",
			"^(http(s)?)://(www\\.)(myrecipes\\.com)()/(recipe/.*)$",
			"^(http(s)?)://(www\\.)(myrecipes\\.com)()/(recipe/[^/]+.*)$",
			"^(http(s)?)://(www\\.)(realsimple\\.com)()/(food-recipes/browse-all-recipes/[^\\/]+/index\\.html)$",
			"^(http(s)?)://((www)?\\.)(seriouseats\\.com)()/([Rr]ecipes\\/.*\\.(html|HTML)(.*)?)$",
			"^(http(s)?)://(www\\.)(simplyrecipes\\.com)()/(recipes/[^/]*/)$",
			"^(http(s)?)://((www\\.)?)(simplyrecipes\\.com)()/(recipes/[^/]*/)$",
			"^(http(s)?)://((www\\.)?)(simplyrecipes\\.com)()/(recipes/.*)$",
			"^(http(s)?)://(www\\.)(tasteofhome\\.com)()/([R|r]ecipes/[^/]+$)$",
			"^(http(s)?)://(www\\.)(tasteofhome\\.com)()/(recipes/[^/]*/?)$",
			"^(http(s)?)://(www\\.)(tasteofhome\\.com)()/(recipes/[^\\/]+/?)$",
			"^(http(s)?)://(www\\.)(yummly\\.com)()/(recipe/[^/]+)$",
			"^(http(s)?)://((www\\.)?)(yummly\\.com)()/(recipe/.*)$",
			"^(http(s)?)://(.*)(yummly\\.com)()/(recipe/.+)$"
		]
	},
	"ProductDomains": {
		"Description": "The set of domains where we want to show a Product tooltip",
		"Value": [
			"^(http(s)?)://store\\.steampowered.com/app/\\d+/.*$",
			"^(http(s)?)://(www\\.)(amazon\\.com)()/(gp/product/[^/]+/.*)$",
			"^(http(s)?)://(www\\.)(amazon\\.com)()/(dp/[^/]+.*)$",
			"^(http(s)?)://(www\\.)(amazon\\.com)()/([^/]+/dp/[^/]+)$",
			"^(http(s)?)://(www\\.)(amazon\\.in)()/((.+/)?(dp|gp/product)\\/\\w{10,13}([^\\w].*)?)$",
			"^(http(s)?)://(www\\.)(amazon\\.)([a-zA-Z\\.]+)/([^/]+/dp/.*)$",
			"^(http(s)?)://(www\\.)(bedbathandbeyond\\.com)(/store/product/)([^/]*-[^/]*/)(\\d+.*)",
			"^(http(s)?)://(www\\.)(ebay\\.com)()/(itm/[^/]+/.*)$",
			"^(http(s)?)://(www\\.)(etsy\\.com)()/(listing)/(\\d+/.*)$",
			"^(http(s)?)://(www\\.)(homedepot\\.com)()/(p/[^/]+/.*)$",
			"^(http(s)?)://(www\\.)(newegg\\.com)()/(Product/Product\\.aspx\\?Item=.+)$",
			"^(http(s)?)://(www\\.)(overstock\\.com)()/(.+/.+/[0-9]+/product\\.html.*)$",
			"^(http(s)?)://(www\\.)(staples\\.com)()/(.*/product_[^/]+)$",
			"^(http(s)?)://(www\\.)(target\\.com)()/(p/.+)$",
			"^(http(s)?)://(www\\.)(walmart\\.com)()/(ip/.*)$"
		]
	},
	"App_Id": {
		"Description": "For identifying the Clipper during interaction with external services",
		"Value": "OneNote Clipper OSS"
	}
}
},{}],77:[function(require,module,exports){
module.exports={
	"WebClipper.Accessibility.ScreenReader.CurrentModeHasChanged": "The current clipping mode is now '{0}'",
	"WebClipper.Accessibility.ScreenReader.ClippingPageToOneNote": "Clipping the current page to OneNote",
	"WebClipper.Accessibility.ScreenReader.ChangeFontToSansSerif": "Change font to Sans-Serif",
	"WebClipper.Accessibility.ScreenReader.ChangeFontToSerif": "Change font to Serif",
	"WebClipper.Accessibility.ScreenReader.DecreaseFontSize": "Decrease font size",
	"WebClipper.Accessibility.ScreenReader.IncreaseFontSize": "Increase font size",
	"WebClipper.Accessibility.ScreenReader.ToggleHighlighterForArticleMode": "Toggle Highlighter Mode For Article",
	"WebClipper.Accessibility.ScreenReader.InputBoxToChangeTitleOfOneNotePage": "Text input to edit the title of the page you want to save",
	"WebClipper.Accessibility.ScreenReader.InputBoxToChangeNotesToAddToPage": "Text input to edit the notes to save along with this page",
	"WebClipper.Action.BackToHome": "Back",
	"WebClipper.Action.Cancel": "Cancel",
	"WebClipper.Action.Clip": "Clip",
	"WebClipper.Action.CloseTheClipper": "Close the Clipper",
	"WebClipper.Action.Feedback": "Feedback?",
	"WebClipper.Action.RefreshPage": "Refresh Page",
	"WebClipper.Action.Signin": "Sign In",
	"WebClipper.Action.SigninMsa": "Sign in with a Microsoft account",
	"WebClipper.Action.SigninOrgId": "Sign in with a work or school account",
	"WebClipper.Action.SignOut": "Sign Out",
	"WebClipper.Action.TryAgain": "Try Again",
	"WebClipper.Action.ViewInOneNote": "View in OneNote",
	"WebClipper.Action.Less": "Less",
	"WebClipper.Action.More": "More",
	"WebClipper.BetaTag": "beta",
	"WebClipper.ClipType.Article.Button": "Article",
	"WebClipper.ClipType.Article.ProgressLabel": "Clipping Article",
	"WebClipper.ClipType.Bookmark.Button": "Bookmark",
	"WebClipper.ClipType.Bookmark.Button.Tooltip": "Clip just the title, thumbnail, synopsis, and link.",
	"WebClipper.ClipType.Bookmark.ProgressLabel": "Clipping Bookmark",
	"WebClipper.ClipType.Button.Tooltip": "Clip just the {0} in an easy-to-read format.",
	"WebClipper.ClipType.Image.Button": "Image",
	"WebClipper.ClipType.ImageSnippet.Button": "Image Snippet",
	"WebClipper.ClipType.MultipleRegions.Button.Tooltip": "Take screenshots of parts of the page you\u0027ll select.",
	"WebClipper.ClipType.Pdf.Button": "PDF Document",
	"WebClipper.ClipType.Pdf.AskPermissionToClipLocalFile": "We need your permission to clip PDF files stored on your computer",
	"WebClipper.ClipType.Pdf.InstructionsForClippingLocalFiles": "In Chrome, right-click the OneNote icon in the toolbar and choose \u0022Manage Extension\u0027. Then, for OneNote Web Clipper, check \u0027Allow access to file URLs.\u0027",
	"WebClipper.ClipType.Pdf.ProgressLabel": "Clipping PDF File",
	"WebClipper.ClipType.Pdf.ProgressLabelDelay": "PDFs can take a little while to upload. Still clipping.”",
	"WebClipper.ClipType.Pdf.IncrementalProgressMessage": "Clipping page {0} of {1}...",
	"WebClipper.ClipType.Pdf.Button.Tooltip": "Take a screenshot of the whole PDF file and save a copy of the attachment.",
	"WebClipper.ClipType.Product.Button": "Product",
	"WebClipper.ClipType.Product.ProgressLabel": "Clipping Product",
	"WebClipper.ClipType.Recipe.Button": "Recipe",
	"WebClipper.ClipType.Recipe.ProgressLabel": "Clipping Recipe",
	"WebClipper.ClipType.Region.Button": "Region",
	"WebClipper.ClipType.Region.Button.Tooltip": "Take a screenshot of the part of the page you\u0027ll select.",
	"WebClipper.ClipType.Region.ProgressLabel": "Clipping Region",
	"WebClipper.ClipType.ScreenShot.Button": "Full Page",
	"WebClipper.ClipType.ScreenShot.Button.Tooltip": "Take a screenshot of the whole page, just like you see it.",
	"WebClipper.ClipType.ScreenShot.ProgressLabel": "Clipping Page",
	"WebClipper.ClipType.Selection.Button": "Selection",
	"WebClipper.ClipType.Selection.Button.Tooltip": "Clip the selection you made on the web page.",
	"WebClipper.ClipType.Selection.ProgressLabel": "Clipping Selection",
	"WebClipper.Error.ConflictingExtension": "Your PDF viewer or another extension might be blocking the OneNote Web Clipper. You could temporarily disable the following extension and try clipping again.",
	"WebClipper.Error.CannotClipPage": "Sorry, this type of page can\u0027t be clipped.",
	"WebClipper.Error.CookiesDisabled.Line1": "Cookies must be enabled in order for OneNote Web Clipper to work correctly.",
	"WebClipper.Error.CookiesDisabled.Line2": "Please allow third-party cookies in your browser or add the onenote.com and live.com domains as an exception.",
	"WebClipper.Error.CookiesDisabled.Chrome": "Please allow third-party cookies in your browser or add the [*.]onenote.com and [*.]live.com domains as an exception.",
	"WebClipper.Error.CookiesDisabled.Edge": "Please allow third-party cookies in your browser.",
	"WebClipper.Error.CookiesDisabled.Firefox": "Please allow third-party cookies in your browser or add the https://onenote.com and https://live.com domains as an exception.",
	"WebClipper.Error.CorruptedSection": "Your clip can\u0027t be saved here because the section is corrupt.",
	"WebClipper.Error.GenericError": "Something went wrong. Please try clipping the page again.",
	"WebClipper.Error.GenericExpiredTokenRefreshError": "Your login session has ended and we were unable to clip the page. Please sign in again.",
	"WebClipper.Error.NoOpError":  "Sorry, we can\u0027t clip this page right now",
	"WebClipper.Error.NotProvisioned": "Your clip can\u0027t be saved because your OneDrive for Business account isn\u0027t set up.",
	"WebClipper.Error.OrphanedWebClipperDetected": "Something went wrong. Please refresh this page, and try to clip again.",
	"WebClipper.Error.PasswordProtected": "Your clip can\u0027t be saved here because the section is password protected.",
	"WebClipper.Error.QuotaExceeded": "Your clip can\u0027t be saved because your OneDrive account has reached its size limit.",
	"WebClipper.Error.ResourceDoesNotExist": "Your clip can\u0027t be saved here because the location no longer exists. Please try clipping to another location.",
	"WebClipper.Error.SectionTooLarge": "Your clip can\u0027t be saved here because the section has reached its size limit.",
	"WebClipper.Error.SignInUnsuccessful": "We couldn\u0027t sign you in. Please try again.",
	"WebClipper.Error.ThirdPartyCookiesDisabled": "For OneNote Web Clipper to work correctly, please allow third-party cookies in your browser, or add the onenote.com domain as an exception.",
	"WebClipper.Error.UserAccountSuspended": "Your clip can\u0027t be saved because your Microsoft account has been suspended.",
	"WebClipper.Error.UserAccountSuspendedResetText": "Reset Your Account",
	"WebClipper.Error.UserDoesNotHaveUpdatePermission": "We\u0027ve added features to the Web Clipper that require new permissions. To accept them, please sign out and sign back in.",
	"WebClipper.Extension.RefreshTab": "Please refresh this page, and try to clip again.",
	"WebClipper.FromCitation": "Clipped from: {0}",
	"WebClipper.Label.Annotation": "Note",
	"WebClipper.Label.AnnotationPlaceholder": "Add a note...",
	"WebClipper.Label.PageTitlePlaceholder": "Add a page title...",
	"WebClipper.Label.AttachPdfFile": "Attach PDF file",
	"WebClipper.Label.AttachPdfFileSubText": "(all pages)",
	"WebClipper.Label.ClipImageToOneNote": "Clip Image to OneNote",
	"WebClipper.Label.ClipLocation": "Location",
	"WebClipper.Label.ClipSelectionToOneNote": "Clip Selection to OneNote",
	"WebClipper.Label.ClipSuccessful": "Clip Successful!",
	"WebClipper.Label.DragAndRelease": "Drag and release to capture a screenshot",
	"WebClipper.Label.OneNoteClipper": "OneNote Clipper",
	"WebClipper.Label.OneNoteWebClipper": "OneNote Web Clipper",
	"WebClipper.Label.OpenChangeLogFromTooltip": "Check out what\u0027s new",
	"WebClipper.Label.Page": "Page",
	"WebClipper.Label.PdfAllPagesRadioButton": "All pages",
	"WebClipper.Label.PdfDistributePagesCheckbox": "New note for each PDF page",
	"WebClipper.Label.PdfOptions": "PDF Options",
	"WebClipper.Label.PdfTooLargeToAttach": "PDF too large to attach",
	"WebClipper.Label.PdfTooltip": "Clip this PDF to OneNote, and read it later",
	"WebClipper.Label.ProceedToWebClipper": "Proceed to the Web Clipper",
	"WebClipper.Label.ProceedToWebClipperFun": "Try it out!",
	"WebClipper.Label.ProductTooltip": "Clip and save product details like this to OneNote",
	"WebClipper.Label.Ratings.Message.End": "Thanks for your feedback!",
	"WebClipper.Label.Ratings.Message.Feedback": "Help us improve",
	"WebClipper.Label.Ratings.Message.Init": "Enjoying the Web Clipper?",
	"WebClipper.Label.Ratings.Message.Rate": "Glad you like it!",
	"WebClipper.Label.Ratings.Button.Feedback": "Provide feedback",
	"WebClipper.Label.Ratings.Button.Init.Positive": "Yes, it\u0027s great!",
	"WebClipper.Label.Ratings.Button.Init.Negative": "Not really...",
	"WebClipper.Label.Ratings.Button.NoThanks": "No thanks",
	"WebClipper.Label.Ratings.Button.Rate": "Rate us 5 stars",
	"WebClipper.Label.RecipeTooltip": "Save clutter-free recipes right to OneNote",
	"WebClipper.Label.SignedIn": "Signed in",
	"WebClipper.Label.SignInDescription": "Save anything on the web to OneNote in one click",
	"WebClipper.Label.SignInUnsuccessfulMoreInformation": "More information",
	"WebClipper.Label.SignInUnsuccessfulLessInformation": "Less information",
	"WebClipper.Label.UnsupportedBrowser": "Sorry, your browser version is unsupported.",
	"WebClipper.Label.WebClipper": "Web Clipper",
	"WebClipper.Label.WebClipperWasUpdated": "OneNote Web Clipper has been updated",
	"WebClipper.Label.WebClipperWasUpdatedFun": "OneNote Web Clipper is now better than ever!",
	"WebClipper.Label.WhatsNew": "What's New",
	"WebClipper.Label.VideoTooltip": "Clip this video and watch it anytime in OneNote",
	"WebClipper.Popover.PdfInvalidPageRange": "We couldn't find page '{0}'",
	"WebClipper.Preview.AugmentationModeGenericError": "Something went wrong creating the preview. Try again, or choose a different clipping mode.",
	"WebClipper.Preview.BookmarkModeGenericError": "Something went wrong creating the bookmark. Try again, or choose a different clipping mode.",
	"WebClipper.Preview.FullPageModeGenericError": "A preview isn't available, but you can still clip your page.",
	"WebClipper.Preview.FullPageModeScreenshotDescription": "A full page screenshot of '{0}'",
	"WebClipper.Preview.LoadingMessage": "Loading preview...",
	"WebClipper.Preview.NoFullPageScreenshotFound": "No content found. Try another clipping mode.",
	"WebClipper.Preview.NoContentFound": "No article found. Try another clipping mode.",
	"WebClipper.Preview.UnableToClipLocalFile": "Local files can only be clipped using Region mode.",
	"WebClipper.Preview.Header.AddAnotherRegionButtonLabel": "Add another region",
	"WebClipper.Preview.Header.SansSerifButtonLabel": "Sans-serif",
	"WebClipper.Preview.Header.SerifButtonLabel": "Serif",
	"WebClipper.Preview.Spinner.ClipAnyTimeInFullPage": "In a hurry? You can clip any time in Full Page mode!",
	"WebClipper.SectionPicker.DefaultLocation":  "Default location",
	"WebClipper.SectionPicker.LoadingNotebooks": "Loading notebooks...",
	"WebClipper.SectionPicker.NoNotebooksFound": "You don't have any notebooks yet, so we'll create your default notebook when you clip this page.",
	"WebClipper.SectionPicker.NotebookLoadFailureMessage": "OneNote couldn't load your notebooks. Please try again later.",
	"WebClipper.SectionPicker.NotebookLoadUnretryableFailureMessage": "OneNote couldn't load your notebooks.",
	"WebClipper.SectionPicker.NotebookLoadUnretryableFailureMessageWithExplanation": "We couldn't load your notebooks because a list limit was exceeded in OneDrive.",
	"WebClipper.SectionPicker.NotebookLoadUnretryableFailureLinkMessage": "Learn more",
	"WebClipper.FontFamily.Regular": "Segoe UI Regular,Segoe UI,Segoe,Segoe WP,Helvetica Neue,Roboto,Helvetica,Arial,Tahoma,Verdana,sans-serif",
	"WebClipper.FontFamily.Bold": "Segoe UI Bold,Segoe UI,Segoe,Segoe WP,Helvetica Neue,Roboto,Helvetica,Arial,Tahoma,Verdana,sans-serif",
	"WebClipper.FontFamily.Light": "Segoe UI Light,Segoe WP Light,Segoe UI,Segoe,Segoe WP,Helvetica Neue,Roboto,Helvetica,Arial,Tahoma,Verdana,sans-serif",
	"WebClipper.FontFamily.Preview.SerifDefault": "Georgia",
	"WebClipper.FontFamily.Preview.SansSerifDefault": "Verdana",
	"WebClipper.FontFamily.Semibold": "Segoe UI Semibold,Segoe UI,Segoe,Segoe WP,Helvetica Neue,Roboto,Helvetica,Arial,Tahoma,Verdana,sans-serif",
	"WebClipper.FontFamily.Semilight": "Segoe UI Semilight,Segoe UI Light,Segoe WP Light,Segoe UI,Segoe,Segoe WP,Helvetica Neue,Roboto,Helvetica,Arial,Tahoma,Verdana,sans-serif",
	"WebClipper.FontSize.Preview.SerifDefault": "16px",
	"WebClipper.FontSize.Preview.SansSerifDefault": "16px"
}

},{}],78:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.0.5
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":80}],79:[function(require,module,exports){
(function (global){
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.4';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      reLeadingDot = /^\./,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g,
      reTrimStart = /^\s+/,
      reTrimEnd = /\s+$/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
      rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * Adds the key-value `pair` to `map`.
   *
   * @private
   * @param {Object} map The map to modify.
   * @param {Array} pair The key-value pair to add.
   * @returns {Object} Returns `map`.
   */
  function addMapEntry(map, pair) {
    // Don't return `map.set` because it's not chainable in IE 11.
    map.set(pair[0], pair[1]);
    return map;
  }

  /**
   * Adds `value` to `set`.
   *
   * @private
   * @param {Object} set The set to modify.
   * @param {*} value The value to add.
   * @returns {Object} Returns `set`.
   */
  function addSetEntry(set, value) {
    // Don't return `set.add` because it's not chainable in IE 11.
    set.add(value);
    return set;
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
        symIterator = Symbol ? Symbol.iterator : undefined,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        if (isObject(srcValue)) {
          stack || (stack = new Stack);
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(object[key], srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = object[key],
          srcValue = source[key],
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      var index = -1;
      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array == null ? 0 : array.length,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `map`.
     *
     * @private
     * @param {Object} map The map to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned map.
     */
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of `set`.
     *
     * @private
     * @param {Object} set The set to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned set.
     */
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor);
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined && other === undefined) {
          return defaultValue;
        }
        if (value !== undefined) {
          result = value;
        }
        if (other !== undefined) {
          if (result === undefined) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined,
          newHoldersRight = isCurry ? undefined : holders,
          newPartials = isCurry ? partials : undefined,
          newPartialsRight = isCurry ? undefined : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return cloneSet(object, isDeep, cloneFunc);

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(args) {
      args.push(undefined, customDefaultsAssignIn);
      return apply(assignInWith, undefined, args);
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return apply(mergeWith, undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined;
      }
      while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined) {
        upper = lower;
        lower = undefined;
      }
      if (upper !== undefined) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined;
      }
      if (floating === undefined) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined;
        }
      }
      if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined;
      }
      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      var sourceURL = '//# sourceURL=' +
        ('sourceURL' in options
          ? options.sourceURL
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = (lodashFunc.name + ''),
            names = realNames[key] || (realNames[key] = []);

        names.push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],80:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[21]);

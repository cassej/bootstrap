define('router', ['common'], function(){!function(e){function t(){if(h=!0,l.fromHash=!1,i){if(0===location.hash.indexOf("#!/")){var t=location.pathname+location.hash.replace(/^#!\//gi,"");history.replaceState({},"",t),l.fromHash=!0}e(window).bind("popstate",o)}else c?e(window).bind("hashchange.router",o):setInterval(function(){location.href!=u&&(o(),u=location.href)},500)}function a(e){var t=e?e:location.pathname;if(t=decodeURI(t),!i){if(0!==location.hash.indexOf("#!/"))return"";t+=location.hash.substring(3)}return t=t.replace(/\/$/,"")}function r(e){for(var t=[],a=0,r=s.length;r>a;a++){var n=s[a];if("regexp"==n.type){var o=e.match(n.route);if(o){var i={};i.matches=o,t.push({route:n,data:i}),l.currentId=n.id;break}}else{var c=e.split("/"),h=n.route.split("/");if(h.length==c.length){for(var i={},u=0,f=0,d=h.length;d>f;f++){var p=0===h[f].indexOf(":");p?(i[h[f].substring(1)]=decodeURI(c[f]),u++):h[f]==c[f]&&u++}if(h.length==u){t.push({route:n,data:i}),l.currentId=n.id,l.currentParameters=i;break}}}}return t}function n(){for(var e=a(location.pathname),t=r(e),n=0,o=t.length;o>n;n++)t[n].route.callback(t[n].data)}function o(e){null!=e&&e.originalEvent&&void 0!==e.originalEvent.state?n():c?n():c||i||n()}var i=history&&history.pushState,c=!i&&"onhashchange"in window&&!1,l={},s=[],h=!1,u=location.href;l.currentId="",l.currentParameters={},l.capabilities={hash:c,pushState:i,timer:!c&&!i},l.reset=function(){var e={};e.currentId="",e.currentParameters={}},l.add=function(e,a,r){"function"==typeof a&&(r=a,delete a);var n="object"==typeof e;n||(e.lastIndexOf("/")==e.length-1&&(e=e.substring(0,e.length-1)),e=e.replace(location.protocol+"//","").replace(location.hostname,""));var o={route:e,callback:r,type:n?"regexp":"string",id:a};s.push(o),h||t()},t(),l.go=function(e,t){if(i)history.pushState({},t,e),n();else{e=e.replace(location.protocol+"//","").replace(location.hostname,"");var a=e.replace(location.pathname,"");a.indexOf("!")<0&&(a="!/"+a),location.hash=a}},l.check=l.redo=function(){n(!0)},l.parameters=function(e){var t=a(e),n=r(t);return l.currentParameters=0==n.length?{}:n[0].data,l.currentParameters},e.router?window.console&&window.console.warn&&console.warn("jQuery.status already defined. Something is using the same name."):e.router=l}(jQuery);});

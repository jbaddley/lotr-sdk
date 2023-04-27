!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("dayjs")):"function"==typeof define&&define.amd?define(["dayjs"],t):(e||self).baddleyLotrSdk=t(e.dayjs)}(this,function(e){function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=/*#__PURE__*/t(e);function o(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,"symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key))?i:String(i),o)}var i}function i(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},n.apply(this,arguments)}function s(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,c(e,t)}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}var a=/*#__PURE__*/function(){function e(e){this.apiKey=void 0,this.baseUrl="https://the-one-api.dev/v2/",e&&(e.apiKey&&(this.apiKey=e.apiKey),e.baseUrl&&(this.baseUrl=e.baseUrl))}var t=e.prototype;return t.setApiKey=function(e){this.apiKey=e},t.invoke=function(e,t,r){return fetch(""+this.baseUrl+e,n({},r,{method:t,headers:this.headers})).then(function(e){if(e.ok)return e.json();throw new Error(e.statusText)})},t.get=function(e,t){return this.invoke(e,"GET",t)},t.post=function(e,t,r){return this.invoke(e,"POST",n({},r,{body:JSON.stringify(t)}))},t.put=function(e,t,r){return this.invoke(e,"PUT",n({},r,{body:JSON.stringify(t)}))},t.delete=function(e,t){return this.invoke(e,"DELETE",t)},i(e,[{key:"config",get:function(){return{apiKey:this.apiKey,baseUrl:this.baseUrl}}},{key:"headers",get:function(){return this.apiKey?{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey}:{"Content-Type":"application/json"}}}]),e}(),u=/*#__PURE__*/function(e){function t(){return e.apply(this,arguments)||this}s(t,e);var r=t.prototype;return r.getAll=function(){try{return Promise.resolve(this.get("book")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},r.getById=function(e){try{return Promise.resolve(this.get("book/"+e)).then(function(e){var t=e.docs;return(void 0===t?[]:t)[0]})}catch(e){return Promise.reject(e)}},r.getChapters=function(e){try{return Promise.resolve(this.get("book/"+e+"/chapter")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},i(t,[{key:"valid",get:function(){return!!this.config.apiKey}}]),t}(a),h=/*#__PURE__*/function(e){function t(){return e.apply(this,arguments)||this}s(t,e);var r=t.prototype;return r.getAll=function(){try{return Promise.resolve(this.get("character")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},r.getById=function(e){try{return Promise.resolve(this.get("character/"+e)).then(function(e){var t=e.docs;return(void 0===t?[]:t)[0]})}catch(e){return Promise.reject(e)}},r.getQuotes=function(e){try{return Promise.resolve(this.get("character/"+e+"/quote")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},i(t,[{key:"valid",get:function(){return!!this.config.apiKey}}]),t}(a),f=/*#__PURE__*/function(e){function t(){return e.apply(this,arguments)||this}s(t,e);var r=t.prototype;return r.getAll=function(){try{return Promise.resolve(this.get("movie")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},r.getById=function(e){try{return Promise.resolve(this.get("movie/"+e)).then(function(e){var t=e.docs;return(void 0===t?[]:t)[0]})}catch(e){return Promise.reject(e)}},r.getQuotes=function(e){try{return Promise.resolve(this.get("movie/"+e+"/quote")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},i(t,[{key:"valid",get:function(){return!0}}]),t}(a);function v(e){return r.default().add(e,"minute").toISOString()}var m={chapters:{},movieQuotes:{},bookDetails:{},movieDetails:{},characterDetails:{},characterQuotes:{}};/*#__PURE__*/
return function(){function e(e){this.config=void 0,this.booksAPI=void 0,this.moviesAPI=void 0,this.charactersAPI=void 0,this.cacheDuration=10,this.books=void 0,this.movies=void 0,this.characters=void 0,this.bookDetails={},this.movieDetails={},this.characterDetails={},this.chapters={},this.movieQuotes={},this.characterQuotes={},this.cacheDateTimes=m,this.config=e={},this.booksAPI=new u(e),this.moviesAPI=new f(e),this.charactersAPI=new h(e),e&&e.cacheDuration&&(this.cacheDuration=e.cacheDuration)}var t=e.prototype;return t.setApiKey=function(e){this.booksAPI.setApiKey(e),this.moviesAPI.setApiKey(e),this.charactersAPI.setApiKey(e),this.cacheDateTimes=m},t.getMovies=function(){try{var e=this;return e.movies&&r.default().isBefore(e.cacheDateTimes.movies)?Promise.resolve(e.movies):(e.cacheDateTimes.movies=v(e.cacheDuration),Promise.resolve(e.moviesAPI.getAll()).then(function(t){return e.movies=t,e.movies}))}catch(e){return Promise.reject(e)}},t.getMovie=function(e){try{var t=this;return t.movieDetails[e]&&r.default().isBefore(t.cacheDateTimes.movieDetails[e])?Promise.resolve(t.movieDetails[e]):(t.cacheDateTimes.movieDetails[e]=v(t.cacheDuration),Promise.resolve(t.moviesAPI.getById(e)).then(function(r){return t.movieDetails[e]=r,t.movieDetails[e]}))}catch(e){return Promise.reject(e)}},t.getMovieByName=function(e){try{var t=this,r=e.toLowerCase();return Promise.resolve(t.getMovies()).then(function(e){var o=e.find(function(e){return e.name.toLowerCase().includes(r)});return o?t.getMovie(o._id):void 0})}catch(e){return Promise.reject(e)}},t.getMovieQuotes=function(e){try{var t=this;return t.movieQuotes[e]&&r.default().isBefore(t.cacheDateTimes.movieQuotes[e])?Promise.resolve(t.movieQuotes[e]):(t.cacheDateTimes.movieQuotes[e]=v(t.cacheDuration),Promise.resolve(t.moviesAPI.getQuotes(e)).then(function(r){return Promise.resolve(t.getCharacters()).then(function(o){return Promise.resolve(t.getMovies()).then(function(i){return t.movieQuotes[e]=r.map(function(e){return n({},e,{movieData:i.find(function(t){return t._id===e.movie}),characterData:o.find(function(t){return t._id===e.character})})}),t.movieQuotes[e]})})}))}catch(e){return Promise.reject(e)}},t.getBooks=function(){try{var e=this;return e.books&&r.default().isBefore(e.cacheDateTimes.books)?Promise.resolve(e.books):(e.cacheDateTimes.books=v(e.cacheDuration),Promise.resolve(e.booksAPI.getAll()).then(function(t){return e.books=t,e.books}))}catch(e){return Promise.reject(e)}},t.getBook=function(e){try{var t=this;return t.bookDetails[e]&&r.default().isBefore(t.cacheDateTimes.bookDetails[e])?Promise.resolve(t.bookDetails[e]):(t.cacheDateTimes.bookDetails[e]=v(t.cacheDuration),Promise.resolve(t.booksAPI.getById(e)).then(function(r){return t.bookDetails[e]=r,t.bookDetails[e]}))}catch(e){return Promise.reject(e)}},t.getBookByName=function(e){try{var t=this,r=e.toLowerCase();return Promise.resolve(t.getBooks()).then(function(e){var o=e.find(function(e){return e.name.toLowerCase().includes(r)});return o?t.getBook(o._id):void 0})}catch(e){return Promise.reject(e)}},t.getChaptersByBook=function(e){try{var t=this;return t.chapters[e]&&r.default().isBefore(t.cacheDateTimes.chapters[e])?Promise.resolve(t.chapters[e]):(t.cacheDateTimes.chapters[e]=v(t.cacheDuration),Promise.resolve(t.booksAPI.getChapters(e)).then(function(r){return t.chapters[e]=r,t.chapters[e]}))}catch(e){return Promise.reject(e)}},t.getCharacters=function(e){try{var t=function(){if(e){var t=e.toLowerCase();return o.characters.filter(function(e){return e.name.toLowerCase().includes(t)})}return o.characters},o=this,i=function(){if(!o.characters||!r.default().isBefore(o.cacheDateTimes.characters))return o.cacheDateTimes.characters=v(o.cacheDuration),Promise.resolve(o.charactersAPI.getAll()).then(function(e){o.characters=e})}();return Promise.resolve(i&&i.then?i.then(t):t())}catch(e){return Promise.reject(e)}},t.getCharacter=function(e){try{var t=this;return t.characterDetails[e]&&r.default().isBefore(t.cacheDateTimes.characterDetails[e])?Promise.resolve(t.characterDetails[e]):(t.cacheDateTimes.characterDetails[e]=v(t.cacheDuration),Promise.resolve(t.charactersAPI.getById(e)).then(function(r){return t.characterDetails[e]=r,t.characterDetails[e]}))}catch(e){return Promise.reject(e)}},t.getCharacterByName=function(e){try{var t=this,r=e.toLowerCase();return Promise.resolve(t.getCharacters()).then(function(e){var o=e.find(function(e){return e.name.toLowerCase().includes(r)});return o?t.getCharacter(o._id):void 0})}catch(e){return Promise.reject(e)}},t.getQuotesByCharacter=function(e){try{var t=this;return t.characterQuotes[e]&&r.default().isBefore(t.cacheDateTimes.characterQuotes[e])?Promise.resolve(t.characterQuotes[e]):(t.cacheDateTimes.characterQuotes[e]=v(t.cacheDuration),Promise.resolve(t.charactersAPI.getQuotes(e)).then(function(r){return Promise.resolve(t.getCharacters()).then(function(o){return Promise.resolve(t.getMovies()).then(function(i){return t.characterQuotes[e]=r.map(function(e){return n({},e,{movieData:i.find(function(t){return t._id===e.movie}),characterData:o.find(function(t){return t._id===e.character})})}),t.characterQuotes[e]})})}))}catch(e){return Promise.reject(e)}},i(e,[{key:"hasApiKey",get:function(){return!!this.config.apiKey}}]),e}()});

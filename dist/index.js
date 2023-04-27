function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=/*#__PURE__*/e(require("dayjs"));function r(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,"symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key))?i:String(i),o)}var i}function o(e,t,o){return t&&r(e.prototype,t),o&&r(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},i.apply(this,arguments)}function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,s(e,t)}function s(e,t){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},s(e,t)}var c=/*#__PURE__*/function(){function e(e){this.apiKey=void 0,this.baseUrl="https://the-one-api.dev/v2/",this.apiErrors={},e&&(e.apiKey&&(this.apiKey=e.apiKey),e.baseUrl&&(this.baseUrl=e.baseUrl))}var t=e.prototype;return t.setApiKey=function(e){this.apiKey=e},t.invoke=function(e,t,r){return fetch(""+this.baseUrl+e,i({},r,{method:t,headers:this.headers})).then(function(e){if(e.ok)return e.json();throw new Error(e.statusText)})},t.get=function(e,t){return this.invoke(e,"GET",t)},t.post=function(e,t,r){return this.invoke(e,"POST",i({},r,{body:JSON.stringify(t)}))},t.put=function(e,t,r){return this.invoke(e,"PUT",i({},r,{body:JSON.stringify(t)}))},t.delete=function(e,t){return this.invoke(e,"DELETE",t)},o(e,[{key:"config",get:function(){return{apiKey:this.apiKey,baseUrl:this.baseUrl}}},{key:"headers",get:function(){return this.apiKey?{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey}:{"Content-Type":"application/json"}}}]),e}(),a=/*#__PURE__*/function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var r=t.prototype;return r.getAll=function(){try{return Promise.resolve(this.get("book")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},r.getById=function(e){try{return Promise.resolve(this.get("book/"+e)).then(function(e){var t=e.docs;return(void 0===t?[]:t)[0]})}catch(e){return Promise.reject(e)}},r.getChapters=function(e){try{return Promise.resolve(this.get("book/"+e+"/chapter")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},o(t,[{key:"valid",get:function(){return!!this.config.apiKey}}]),t}(c),u=/*#__PURE__*/function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var r=t.prototype;return r.getAll=function(){try{return Promise.resolve(this.get("character")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},r.getById=function(e){try{return Promise.resolve(this.get("character/"+e)).then(function(e){var t=e.docs;return(void 0===t?[]:t)[0]})}catch(e){return Promise.reject(e)}},r.getQuotes=function(e){try{return Promise.resolve(this.get("character/"+e+"/quote")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},o(t,[{key:"valid",get:function(){return!!this.config.apiKey}}]),t}(c),h=/*#__PURE__*/function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var r=t.prototype;return r.getAll=function(){try{return Promise.resolve(this.get("movie")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},r.getById=function(e){try{return Promise.resolve(this.get("movie/"+e)).then(function(e){var t=e.docs;return(void 0===t?[]:t)[0]})}catch(e){return Promise.reject(e)}},r.getQuotes=function(e){try{return Promise.resolve(this.get("movie/"+e+"/quote")).then(function(e){return e.docs})}catch(e){return Promise.reject(e)}},o(t,[{key:"valid",get:function(){return!0}}]),t}(c);function f(e){return t.default().add(e,"minute").toISOString()}var v={chapters:{},movieQuotes:{},bookDetails:{},movieDetails:{},characterDetails:{},characterQuotes:{}};module.exports=/*#__PURE__*/function(){function e(e){this.config=void 0,this.booksAPI=void 0,this.moviesAPI=void 0,this.charactersAPI=void 0,this.cacheDuration=10,this.books=void 0,this.movies=void 0,this.characters=void 0,this.bookDetails={},this.movieDetails={},this.characterDetails={},this.chapters={},this.movieQuotes={},this.characterQuotes={},this.cacheDateTimes=v,this.config=e={},this.booksAPI=new a(e),this.moviesAPI=new h(e),this.charactersAPI=new u(e),e&&e.cacheDuration&&(this.cacheDuration=e.cacheDuration)}var r=e.prototype;return r.setApiKey=function(e){this.booksAPI.setApiKey(e),this.moviesAPI.setApiKey(e),this.charactersAPI.setApiKey(e),this.cacheDateTimes=v},r.getMovies=function(){try{var e=this;return e.movies&&t.default().isBefore(e.cacheDateTimes.movies)?Promise.resolve(e.movies):(e.cacheDateTimes.movies=f(e.cacheDuration),Promise.resolve(e.moviesAPI.getAll()).then(function(t){return e.movies=t,e.movies}))}catch(e){return Promise.reject(e)}},r.getMovie=function(e){try{var r=this;return r.movieDetails[e]&&t.default().isBefore(r.cacheDateTimes.movieDetails[e])?Promise.resolve(r.movieDetails[e]):(r.cacheDateTimes.movieDetails[e]=f(r.cacheDuration),Promise.resolve(r.moviesAPI.getById(e)).then(function(t){return r.movieDetails[e]=t,r.movieDetails[e]}))}catch(e){return Promise.reject(e)}},r.getMovieByName=function(e){try{var t=this,r=e.toLowerCase();return Promise.resolve(t.getMovies()).then(function(e){var o=e.find(function(e){return e.name.toLowerCase().includes(r)});return o?t.getMovie(o._id):void 0})}catch(e){return Promise.reject(e)}},r.getMovieQuotes=function(e){try{var r=this;return r.movieQuotes[e]&&t.default().isBefore(r.cacheDateTimes.movieQuotes[e])?Promise.resolve(r.movieQuotes[e]):(r.cacheDateTimes.movieQuotes[e]=f(r.cacheDuration),Promise.resolve(r.moviesAPI.getQuotes(e)).then(function(t){return Promise.resolve(r.getCharacters()).then(function(o){return Promise.resolve(r.getMovies()).then(function(n){return r.movieQuotes[e]=t.map(function(e){return i({},e,{movieData:n.find(function(t){return t._id===e.movie}),characterData:o.find(function(t){return t._id===e.character})})}),r.movieQuotes[e]})})}))}catch(e){return Promise.reject(e)}},r.getBooks=function(){try{var e=this;return e.books&&t.default().isBefore(e.cacheDateTimes.books)?Promise.resolve(e.books):(e.cacheDateTimes.books=f(e.cacheDuration),Promise.resolve(e.booksAPI.getAll()).then(function(t){return e.books=t,e.books}))}catch(e){return Promise.reject(e)}},r.getBook=function(e){try{var r=this;return r.bookDetails[e]&&t.default().isBefore(r.cacheDateTimes.bookDetails[e])?Promise.resolve(r.bookDetails[e]):(r.cacheDateTimes.bookDetails[e]=f(r.cacheDuration),Promise.resolve(r.booksAPI.getById(e)).then(function(t){return r.bookDetails[e]=t,r.bookDetails[e]}))}catch(e){return Promise.reject(e)}},r.getBookByName=function(e){try{var t=this,r=e.toLowerCase();return Promise.resolve(t.getBooks()).then(function(e){var o=e.find(function(e){return e.name.toLowerCase().includes(r)});return o?t.getBook(o._id):void 0})}catch(e){return Promise.reject(e)}},r.getChaptersByBook=function(e){try{var r=this;return r.chapters[e]&&t.default().isBefore(r.cacheDateTimes.chapters[e])?Promise.resolve(r.chapters[e]):(r.cacheDateTimes.chapters[e]=f(r.cacheDuration),Promise.resolve(r.booksAPI.getChapters(e)).then(function(t){return r.chapters[e]=t,r.chapters[e]}))}catch(e){return Promise.reject(e)}},r.getCharacters=function(e){try{var r=function(){if(e){var t=e.toLowerCase();return o.characters.filter(function(e){return e.name.toLowerCase().includes(t)})}return o.characters},o=this,i=function(){if(!o.characters||!t.default().isBefore(o.cacheDateTimes.characters))return o.cacheDateTimes.characters=f(o.cacheDuration),Promise.resolve(o.charactersAPI.getAll()).then(function(e){o.characters=e})}();return Promise.resolve(i&&i.then?i.then(r):r())}catch(e){return Promise.reject(e)}},r.getCharacter=function(e){try{var r=this;return r.characterDetails[e]&&t.default().isBefore(r.cacheDateTimes.characterDetails[e])?Promise.resolve(r.characterDetails[e]):(r.cacheDateTimes.characterDetails[e]=f(r.cacheDuration),Promise.resolve(r.charactersAPI.getById(e)).then(function(t){return r.characterDetails[e]=t,r.characterDetails[e]}))}catch(e){return Promise.reject(e)}},r.getCharacterByName=function(e){try{var t=this,r=e.toLowerCase();return Promise.resolve(t.getCharacters()).then(function(e){var o=e.find(function(e){return e.name.toLowerCase().includes(r)});return o?t.getCharacter(o._id):void 0})}catch(e){return Promise.reject(e)}},r.getQuotesByCharacter=function(e){try{var r=this;return r.characterQuotes[e]&&t.default().isBefore(r.cacheDateTimes.characterQuotes[e])?Promise.resolve(r.characterQuotes[e]):(r.cacheDateTimes.characterQuotes[e]=f(r.cacheDuration),Promise.resolve(r.charactersAPI.getQuotes(e)).then(function(t){return Promise.resolve(r.getCharacters()).then(function(o){return Promise.resolve(r.getMovies()).then(function(n){return r.characterQuotes[e]=t.map(function(e){return i({},e,{movieData:n.find(function(t){return t._id===e.movie}),characterData:o.find(function(t){return t._id===e.character})})}),r.characterQuotes[e]})})}))}catch(e){return Promise.reject(e)}},o(e,[{key:"hasApiKey",get:function(){return!!this.config.apiKey}}]),e}();

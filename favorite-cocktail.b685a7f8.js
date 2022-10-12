function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},s={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in s){var t=s[e];delete s[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){s[e]=t},t.parcelRequired7c6=i),i.register("7K24o",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}}));const r=document.querySelector("#search-form"),o=document.querySelector(".cocktails__list"),a=document.querySelector(".not-found"),c=document.querySelector(".cocktails__title");r.addEventListener("submit",(function(e){e.preventDefault();const t=r.elements.searchQuery.value;c.classList.remove("is-hidden"),a.classList.add("is-hidden"),(n=t,fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${n}`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))).then((({drinks:e})=>{if(!t)throw new Error;o.innerHTML=e.map((({strDrink:e,strDrinkThumb:t,idDrink:n})=>`<li class="cocktails__card">\n              <div>\n                <img src="${t}" alt="${e}" width="280">\n              </div>\n              <p class="cocktails__name" data-id="${n}">${e}</p>\n              <div class="button-wrapper">\n                <button class="btn-lm" type="button">Learn more</button>\n                <button class="btn-add" type="button">Add to\n                  <svg class="icon__add" width="18" height="18">\n                    <use href="./image/symbol-defs.svg#icon-Heart"\n                        aria-label="img"\n                        role="button"\n                    ></use>\n                  </svg>\n                </button>\n              </div>\n            </li>`)).join("")})).catch((e=>{console.log(e),o.innerHTML="",a.classList.remove("is-hidden"),c.classList.add("is-hidden")}));var n}));var l={};Object.defineProperty(l,"__esModule",{value:!0}),l.default=function(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n};var d={};Object.defineProperty(d,"__esModule",{value:!0}),d.default=function(e,t){h.default(e,t),t.add(e)};var u,h=(u=i("7K24o"))&&u.__esModule?u:{default:u};var p=new WeakSet,m=new WeakSet;function f(){this.$el.classList.add("select"),this.$el.innerHTML='\n    <div class="select__input" data-type="input">A<i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i></div>\n    <div class="select__dropdown">\n      <ul class="letter-list">\n        <li class="letter">B</li>\n        <li class="letter">C</li>\n        <li class="letter">D</li>\n        <li class="letter">E</li>\n      </ul>\n    </div>\n    '}function v(){this.clickHandler=this.clickHandler.bind(this),this.$el.addEventListener("click",this.clickHandler),this.$arrow=this.$el.querySelector('[data-type="arrow"]')}new class{clickHandler(e){const{type:t}=e.target.dataset;console.log(t),"input"===t&&this.toggle()}get isOpen(){return this.$el.classList.contains("open")}toggle(){this.isOpen?this.close():this.open()}open(){this.$el.classList.add("open"),this.$arrow.classList.remove("fa-chevron-down"),this.$arrow.classList.add("fa-chevron-up")}close(){this.$el.classList.remove("open"),this.$arrow.classList.add("fa-chevron-down"),this.$arrow.classList.remove("fa-chevron-up")}destroy(){this.$el.removeEventListener("click",this.clickHandler)}constructor(t,n){e(d)(this,p),e(d)(this,m),this.$el=document.querySelector(t),e(l)(this,p,f).call(this),e(l)(this,m,v).call(this)}}("#select",{});(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),n=document.querySelector(".js-close-menu"),s=()=>{const s="true"===t.getAttribute("aria-expanded")||!1;t.setAttribute("aria-expanded",!s),e.classList.toggle("is-open"),s?(t.classList.remove("is-hiden-btn"),n.classList.add("is-hiden-btn")):(n.classList.remove("is-hiden-btn"),t.classList.add("is-hiden-btn"))};t.addEventListener("click",s),n.addEventListener("click",s),window.matchMedia("(min-width: 1200px)").addEventListener("change",(s=>{s.matches&&(e.classList.remove("is-open"),t.classList.remove("is-hiden-btn"),n.classList.add("is-hiden-btn"),t.setAttribute("aria-expanded",!1))}))})();const b=(e,t)=>{try{const n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.error("Set state error: ",e.message)}},g=e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},w="light-theme",y="dark-theme",L=document.querySelector(".theme-switch__toggle");!function(){const e=g("theme");L.checked=e,document.body.className=e?y:w}();L.addEventListener("change",(e=>{const{checked:t}=e.target;document.body.className=t?y:w,b("theme",t)}));const k=document.querySelector("p"),_=document.querySelector(".cocktails__list");let $=[],S="",j=0,q=[];let E="abcdefghijklmnopqrstuvwxyz 1234567890".split("");k.insertAdjacentHTML("afterend",'<ul class="letter-list"></ul>');const M=document.querySelector(".letter-list");function T(){if(""!==S)return(e=S,fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${e}`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))).then((e=>{null!==e.drinks?(j=e.drinks.length,q=e.drinks,H(q)):x()}));var e;x()}!function(e){const t=e.map((e=>`\n            <li class="letter">\n                <button class="btn-letter" type="button">\n                ${e}\n                </button>\n            </li>`)).join("");M.insertAdjacentHTML("beforeend",t),$=document.querySelectorAll(".btn-letter")}(E);const H=e=>{const t=e.map((({strDrinkThumb:e,strDrink:t})=>`\n        <li>\n            <div>\n              <img src="${e}" alt="${t}" width="280">\n            </div>\n            <p>${t}</p>\n            <button class="btn-lm" type="button">Learn more</button>\n            <button class="btn-add" type="button">Add to</button>\n        </li>`)).join("");_.innerHTML="",_.insertAdjacentHTML("beforeend",t)};function x(){_.innerHTML="",console.log("Sorry, we didn't find any cocktail for you"),_.insertAdjacentHTML("beforeend",'\n        <div class="alert">\n        <p>Sorry, we didn\'t find any cocktail for you</p>\n        <img src="./images/frame.jpg" alt="Picture sorry">\n        </div>\n    ')}M.addEventListener("click",(e=>{$.forEach((e=>{e.classList.remove("button-active")})),S=e.target.textContent.trim().toLowerCase(),console.log("You pressed on button :",S),console.log("event.target",e.target),e.target.classList.add("button-active"),T()}));
//# sourceMappingURL=favorite-cocktail.b685a7f8.js.map

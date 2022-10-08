var o;console.log("helloworld"),console.log((o="gin-Small.png",fetch(`https://www.thecocktaildb.com/images/ingredients/${o}`).then((o=>{if(!o.ok)throw new Error(o.status);return o.url}))).then(console.log));
//# sourceMappingURL=index.23292336.js.map

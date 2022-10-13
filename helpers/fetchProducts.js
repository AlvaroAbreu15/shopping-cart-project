// const fetch = require('node-fetch');

const fetchProducts = async (endpoint) => {
  // seu código aqui
  if(endpoint !== undefined){
  try { 
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`);
  const data = await result.json();
  return data;
  } catch(error) {
   throw new Error('Error');
  }
  }
  throw new Error('You must provide an url');
};  

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

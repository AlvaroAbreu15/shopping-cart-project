// const fetch = require('node-fetch');

const fetchProducts = async (endpoint) => {
  try { 
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`;
  const result = await fetch(url);
  const response = await result.json(); 
  const resultado = await response.results;
  return resultado;
  } catch (error) {
    throw Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
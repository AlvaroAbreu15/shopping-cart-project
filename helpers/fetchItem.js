const fetchItem = async (id) => {
  // seu código aqui
  if (!id) { 
  throw new Error('You must provide an id!');
  }
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(url);
  const response = await result.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

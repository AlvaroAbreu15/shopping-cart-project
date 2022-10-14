require('../mocks/fetchSimulator');
const { expect } = require('expect');
const { fetchProducts } = require('../helpers/fetchProducts');
const { results } = require('../mocks/search');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('If fetchProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test(`With 'computador' as argument, if fetch has been called` , async () => { 
   await fetchProducts('computador');
   expect(fetch).toHaveBeenCalled();
  });
  test(`If the function fetchProducts is called with 'computador' as argument, the fetch function `, async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test(`if return of the fetchProducts with 'computador' as argument contains the same struct data of the computadorSearch object. `, async () => {
    const func = await fetchProducts('computador');
    expect(func).toEqual(computadorSearch['results']);
  });
  test(`If, call fetchProducts function without argument, returns an error with mensage 'You must provide an url'.`, async () => { 
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});

require('../mocks/fetchSimulator');
const { expect } = require('expect');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test(`If fetchItem is a function`, () => {
    expect(typeof fetchItem).toBe('function');
  });
  test(`Run the fetchItem function with the argument 'MLB1615760527' and test if fetch have been called`, async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test(`Test if, when calling the fetchItem function with the item argument 'MLB1615760527', the fetch function uses the endpoint 'https://api.mercadolibre.com/items/MLB1615760527'`, async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test(`if return of the fetchItem with 'MLB1615760527' as argument contains the same struct data of the item object.`, async () => {
    const func1 = await fetchItem('MLB1615760527');
    expect(func1).toEqual(item);
  });
  test(`If, call fetchProducts function without argument, returns an error with mensage 'You must provide an url'.`, async () => { 
    await expect(fetchItem()).rejects.toThrow('You must provide an url');
  });
});
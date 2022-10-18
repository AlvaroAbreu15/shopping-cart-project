const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const { expect } = require('expect');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test(`if runs saveCartItems function with cartItem as argument, the method localStorage.setItem have been called`, async () => {
    saveCartItems('cartItem');
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });
   test(`if runs saveCartItems function wwith cartItem as argument, the method localStorage.setItem has been called with two parameters`, () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
   });
});

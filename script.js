// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const { getRules } = require("axe-core");
// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { array } = require("yargs");

// const saveCartItems = require("./helpers/saveCartItems");

// const saveCartItems = require("./helpers/saveCartItems");
// const { id } = require("prelude-ls");

// const { fetchProducts } = require('./helpers/fetchProducts');

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchItem } = require("./helpers/fetchItem");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const fetchFunction = async (end) => {
  const func = await fetchProducts(end);
  func.forEach((e) => {
    const sectionOfItems = document.querySelector('.items');
    const element = createProductItemElement(e);
    sectionOfItems.appendChild(element);
  });
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
//  const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const clickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', clickListener);
  return li;
};

// const createCartModel = ({id, title, price}) => `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;

const cartItemAppend = async (idProduct) => {
  const functionItem = await fetchItem(idProduct); // Pegando as infos dos produtos a partir do ID
  const itemAdd = createCartItemElement(functionItem); // criando o modelo a partir das infos do produto

  const getList = document.querySelector('.cart__items');
  
  getList.appendChild(itemAdd); // criando os elementos do carrinho como filho da 'ol'
  // const catchItem = getSavedCartItems(); // Informação que ta salva no localStorage;
  if (localStorage.getItem('cartItems') === null) { 
    const arrayEmpty = [];
    arrayEmpty.push(itemAdd.innerText);
    saveCartItems(arrayEmpty);
  } else { 
  const array = [...getSavedCartItems()];
  const soma = itemAdd.innerText;
  array.push(soma);
  console.log(array);
  saveCartItems(array);
  }
};

const catchItemValueById = () => {
  const buttons = document.getElementsByClassName('item__add');
    for (const product of buttons) {
      product.addEventListener('click', () => {
        const id = product.parentNode.firstChild.textContent;
        cartItemAppend(id); // Dando o id capturado com o click
      });
    }
};

const clickListenerLocal = (evento) => {
  evento.target.remove();
  // localStorage.removeItem('cartItems');
};

const functioOfList = (arg) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = arg;
  li.addEventListener('click', clickListenerLocal);
  return li;
};

const elementsSaved = () => {
  const getListAfter = document.querySelector('.cart__items');
  // if (localStorage.getItem('cartItems') !== null) { 
  const elements = getSavedCartItems();
  // console.log(elements);
  if (elements !== null) { 
  elements.forEach((el) => {
    const modelReady = functioOfList(el);
    getListAfter.appendChild(modelReady);
  });
  }
  // getListAfter.innerHTML = '';
};

const emptyCart = () => {
  const buttonEmpty = document.querySelector('.empty-cart');
  buttonEmpty.addEventListener('click', () => {
    localStorage.clear();
    const cart = document.querySelector('.cart__items');
    cart.innerHTML = '';
  });
};

window.onload = async () => {
  await fetchFunction('computador');
  catchItemValueById();
  elementsSaved();
  emptyCart();
};

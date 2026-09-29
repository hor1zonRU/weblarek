import './scss/styles.scss';

import { Api } from './components/base/Api';
import { ShopApi } from './components/shopApi/shopApi';
import { API_URL } from './utils/constants';

import { Catalog } from './components/models/Catalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { IProduct } from './types/index';



const baseApi = new Api(API_URL);
const shopApi = new ShopApi(baseApi);
const catalog = new Catalog();
const cart = new Cart();
const buyer = new Buyer();


shopApi.getProductList()
  .then((data) => {
    catalog.setProducts(data.items)
    console.log('Каталог успешно заполнен данными с сервера!');
    console.log(catalog.getProducts()) // получили все товары с сервера.
    
    const testItem = catalog.getProducts()[0]; // тестовый товар с сервера.
    console.log(cart); // просто данные корзины, что она есть.

    catalog.setSelectedProduct(testItem); // выбрали товар
    console.log('Выбранный товар для просмотра:', catalog.getSelectedProduct()); // и его смотрим

    cart.setProductToCart(testItem); // добавляем наш тестовый товар в корзину,
    console.log('Товары в корзине после добавления:', cart.getProductsInCart()); // смотрим его
    console.log('Товар есть в корзине? (проверка по id):', cart.hasProductInCart(testItem.id)) // проверяем товар в корзине по id, true.

    cart.deleteProductFromCart(testItem.id); // пробуем удалить товар, да, работает.
    console.log('Корзина после удаления товара:', cart.getProductsInCart()); // смотрим состояние корзины после удаления, пустая.

    buyer.setBuyerData({ email: 'student@practicum.ru', address: 'Яндекс' }); // проверяем данные покупателя, вносим данные, но не все.
    console.log('Данные покупателя:', buyer.getBuyerData()); // видим данные покупателя
    console.log('Ошибки валидации:', buyer.validateBuyerData()); // работает валидация, так как не все данные ввел покупатель.

    buyer.clearBuyerData(); // ояищаем наш объет с данными покупателя
    console.log('Данные покупателя после очистки:', buyer.getBuyerData()); // и смотрим, что объект чистый.

  })
  .catch((error) => {
    console.error('Ошибка при загрузке товаров с сервера!', error)
  })

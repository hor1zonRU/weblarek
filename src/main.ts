import './scss/styles.scss';

import { Api } from './components/base/Api';
import { ShopApi } from './components/shopApi/shopApi';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

import { Catalog } from './components/models/Catalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';


const baseApi = new Api(API_URL);
const shopApi = new ShopApi(baseApi);

const catalog = new Catalog();
console.log('*Тестируем модель каталога товаров*');

catalog.setProducts(apiProducts.items); // Кладем моковые данные в каталог.
console.log('Все товары:', catalog.getProducts()); // Проверяем, что все товары попали в каталог.
console.log('Товар по id:', catalog.getProductById(apiProducts.items[0].id)); // Проверяем полчение товара по id.
catalog.setSelectedProduct(apiProducts.items[1]); // Выбираем товар (превью товара).
console.log('Выбранный товар:', catalog.getSelectedProduct()); // Получаем выбранный товар.


const cart = new Cart();
console.log('**Тестируем модель корзины**');

cart.setProductToCart(apiProducts.items[0]); // Добавляем товар в корзину.
cart.setProductToCart(apiProducts.items[1]); // Еще один.
console.log('Товары в корзине после добавления:', cart.getProductsInCart()); // Проверяем добавлены ли товары.
console.log('Всего товаров в корзине:', cart.getQuantityOfProductsInCart()) // Сколько сейчас товаров в корзине.
console.log('В корзине товаров на сумму:', cart.getSumOfProductsInCart()) // Считаем общую сумму товаров в корзине.
cart.deleteProductFromCart(apiProducts.items[0].id); // Удаляем один товар из корзины.
console.log('Товары в корзине после удаления:', cart.getProductsInCart()); // Смотрим, действительно ли остался один товар.
console.log('Товар с id 0 есть в корзине?:', cart.hasProductInCart(apiProducts.items[0].id)) // Проверяем есть ли удаленный товар по id.
console.log('Товар с id 1 есть в корзине?:', cart.hasProductInCart(apiProducts.items[1].id)) // Проверяем есть ли оставшийся товар по id.
cart.clearCart(); // Очищаем корзину полностью.
console.log('Корзина после очистки:', cart.getProductsInCart()); // Смотрим, пустая.


const buyer = new Buyer();
console.log('***Тестируем модель покупателя***');

buyer.setBuyerData({email: 'student@practicum.ru', address: 'Яндекс'}); // Покупетль вносит свои данные, но не все.
console.log('Данные покупателя:', buyer.getBuyerData()); // Получаем его данные.
console.log('Ошибки валидации:', buyer.validateBuyerData()); // Не все данные внесены, ошибка валидации.
buyer.clearBuyerData(); // Очищаем все данные покупателя.
console.log('Данные покупателя:', buyer.getBuyerData()); // Проверяем очищен ли объект с данными покупателя.


shopApi.getProductList()
  .then((data) => {
    
    catalog.setProducts(data.items)
    console.log('Каталог успешно заполнен данными с сервера!');
    console.log(catalog.getProducts()) // получили все товары с сервера.
        
  })
  .catch((error) => {
    console.error('Ошибка при загрузке товаров с сервера!', error)
  })

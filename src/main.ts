import './scss/styles.scss';
import { ShopApi } from './components/shopApi/shopApi';
import { Catalog } from './components/models/Catalog';
import { API_URL } from './utils/constants';

const api = new ShopApi(API_URL);
const catalog = new Catalog();

api.getProductList()
  .then((data) => {
    catalog.setProducts(data.items)
    console.log('Каталог успешно заполнен данными с сервера!');
    console.log(catalog.getProducts())
  })
  .catch((error) => {
    console.error('Ошибка при загрузке товаров с сервера!', error)
  })

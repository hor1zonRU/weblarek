import './scss/styles.scss';

import { Api } from './components/base/Api';
import { ShopApi } from './components/shopApi/shopApi';
import { API_URL, CDN_URL } from './utils/constants';

import { Catalog } from './components/models/Catalog';
import { IProduct, IBuyer } from './types/index';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';

import { Header } from './components/views/Header';
import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';

import { Gallery } from './components/views/Gallery';

import { Modal } from './components/views/Modal';
import { Success } from './components/views/Success';

import { FormOrder } from './components/views/FormOrder';
import { FormContacts } from './components/views/FormContacts';

import { CardCatalog } from './components/views/CardCatalog';
import { CardPreview } from './components/views/CardPreview';
import { CardInCart } from './components/views/CardInCart';

import { CartView } from './components/views/CartView';


const baseApi = new Api(API_URL);
const shopApi = new ShopApi(baseApi);

const events = new EventEmitter();
const cart = new Cart(events);
const buyer = new Buyer(events);
const products = new Catalog(events);

const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const header = new Header(events, ensureElement<HTMLElement>(".header"));
const cartView = new CartView(events, cloneTemplate<HTMLElement>("#basket"));
const modal = new Modal(ensureElement<HTMLElement>("#modal-container"));
const formOrder = new FormOrder(events, cloneTemplate<HTMLFormElement>("#order"));
const formContacts = new FormContacts(events, cloneTemplate<HTMLFormElement>("#contacts"));
const success = new Success(events, cloneTemplate<HTMLElement>("#success"));
const cardPreview = new CardPreview(events, cloneTemplate<HTMLElement>("#card-preview"));


// 1. Отрисовка каталога при загрузке данных
events.on('catalog:change', () => {
  const cards = products.getProducts().map( item => {
    const card = new CardCatalog(cloneTemplate<HTMLElement>("#card-catalog"), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render({
      category: item.category,
      image: {url: CDN_URL + item.image, alt: item.title},
      price: item.price,
      title: item.title
    })
  })
  gallery.render({catalog: cards});
});

// 2. Клик на карточку в общем каталоге
events.on('card:select', (item: IProduct) => {
  products.setSelectedProduct(item.id); 
});

// 3. Реакция на изменение выбранного товара в модели
events.on('card:change', () => {
  const item = products.getSelectedProduct();
  
  if (!item) return;

  const hasPrice = item.price !== null;
  const inCart = cart.hasProductInCart(item.id);

  let buttonText = 'В корзину';
  let isButtonValid = true;

  if (!hasPrice) {
    buttonText = 'Недоступно';
    isButtonValid = false;
  } else if (inCart) {
    buttonText = 'Удалить из корзины';
  }

  modal.render({
    content: cardPreview.render({
      description: item.description,
      category: item.category,
      image: {url: CDN_URL + item.image, alt: item.title},
      price: item.price,
      title: item.title,
      buttonText: buttonText,
      valid: isButtonValid 
    })
  });
  modal.open();
});

// 4. Открытие модального окна корзины
events.on('cart:open', () => {
  modal.render({ content: cartView.render() });
  modal.open();
});

// 5. Обработка добавления товара в корзину
events.on('card:action', () => {
  const product = products.getSelectedProduct();
  if (!product || product.price === null) return; 

  if (cart.hasProductInCart(product.id)) {
    cart.deleteProductFromCart(product.id);
  } else {
    cart.setProductToCart(product);
  }

  modal.close();
});

// 6. Удаление товара из корзины
events.on('cart:remove', (item: IProduct) => {
  if (item && item.id) {cart.deleteProductFromCart(item.id)}
  else {console.log('Технический вызов cart:remove от модели пропущен, передача ID не требуется.')}
});

// 7. Любое изменение состояния корзины 
events.on('cart:change', () => {
  header.render({
    counter: cart.getQuantityOfProductsInCart()
  });

  const cards = cart.getProductsInCart().map( (item, index) => {
    const card = new CardInCart(cloneTemplate<HTMLElement>("#card-basket"), {
      onClick: () => events.emit('cart:remove', item)
    });
    return card.render({
      price: item.price,
      title: item.title,
      index: index + 1
    })
  });
  
  cartView.render({
    content: cards,
    total: cart.getSumOfProductsInCart(),
    valid: cart.getQuantityOfProductsInCart() !== 0
  });
});

// 8. Закрытие окон успешной операции
events.on('success:buttonClick', () => {
  modal.close();
});

// 9. Ввод данных покупателя
events.on('formOrder:change', (data: { field: keyof IBuyer; value: string }) => {
  buyer.setBuyerData({ [data.field]: data.value });
});

events.on('formContacts:change', (data: { field: keyof IBuyer; value: string }) => {
  buyer.setBuyerData({ [data.field]: data.value });
});

// 10. Валидация полей форм при изменении модели Buyer
events.on('user:change', () => {
  const errors = buyer.validateBuyerData();
  const buyerData = buyer.getBuyerData(); 

  const orderErrors = {
    address: errors.address,
    payment: errors.payment
  };
  const isOrderValid = !orderErrors.address && !orderErrors.payment;
  const orderErrorString = Object.values(orderErrors).filter((error): error is string => !!error).join('; ');

  formOrder.render({
    payment: buyerData.payment,
    address: buyerData.address,
    valid: isOrderValid,
    error: orderErrorString
  });

  const contactsErrors = {
    email: errors.email,
    phone: errors.phone
  };
  const isContactsValid = !contactsErrors.email && !contactsErrors.phone;
  const contactsErrorString = Object.values(contactsErrors).filter((error): error is string => !!error).join('; ');

  formContacts.render({
    email: buyerData.email,
    phone: buyerData.phone,
    valid: isContactsValid,
    error: contactsErrorString
  });
});


// 11. Переход из корзины к оформлению заказа
events.on('cart:order', () => {
  const errors = buyer.validateBuyerData();
  modal.render({
    content: formOrder.render({
      valid: !errors.payment && !errors.address,
      error: errors.payment || errors.address || ''
    })
  });
  modal.open();
});

// 12. Переход ко второму шагу оформления (Ввод Email и Телефона)
events.on('order:submit', () => {
  const errors = buyer.validateBuyerData();
  modal.render({
    content: formContacts.render({
      valid: !errors.email && !errors.phone,
      error: errors.email || errors.phone || ''
    })
  });
});

// 13. Финальный сабмит заказа (Клик на «Оплатить»)
events.on('contacts:submit', () => {
  const orderData = {
    ...buyer.getBuyerData(),                             
    items: cart.getProductsInCart().map(item => item.id), 
    total: cart.getSumOfProductsInCart()               
  };

  shopApi.postOrderList(orderData)
    .then((result) => {
      cart.clearCart();        
      buyer.clearBuyerData();  

      modal.render({
        content: success.render({
          total: result.total
        })
      });
    })
    .catch((err) => {
      console.error('Ошибка при отправке заказа на сервер:', err);
    });
});

cart.clearCart();
buyer.clearBuyerData();

// ***Запрос к серверу***
shopApi.getProductList()
.then(data => {
  products.setProducts(data.items);
})
.catch(console.error);

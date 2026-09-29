# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

##### Данные

Интерфейсы данных:
Тут представлены два интерфейса c описанием ключей и типов данных значений.

-Интерфейс продукта:

```typescript
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

-Интерфейс Покупателя:


``` typescript
interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}
```

###### Модели данных:
Содержит в себе описание классов, в которых будет реализована работа с данными.

Класс Catalog:

Хранит данные о массиве товаров и данные об отдельном товаре.
Конструктор класса не принимает параметров.

```typescript
export class Catalog {

  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  setProducts(products: IProduct[]): void {
    this.products = products
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(productId: string): IProduct | undefined {
    return this.products.find((product: IProduct): boolean => product.id === productId)
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null  {
    return this.selectedProduct;
  }
}
```

Методы:
  setProducts(products: IProduct[]): void - сохранение массива товаров полученного в параметрах метода.
  getProducts(): IProduct[] - получение массива товаров из модели.
  getProductById(productId: string): IProduct | undefined - получение одного товара по его id.
  setSelectedProduct(product: IProduct): void - сохранение товара для подробного отображения.
  getSelectedProduct(): IProduct | null - получение товара для подробного отображения.

Класс Cart (Корзина):

Хранит массив товаров, выбранных покупателем для покупки.
Конструктор класса не принимает параметров.

```typescript
export class Cart {

  private products: IProduct[] = [];

  getProductsInCart(): IProduct[] {
    return this.products;
  }

  setProductToCart(product: IProduct): void {
    this.products.push(product);
  }

  deleteProductFromCart(productId: string): void {
    this.products = this.products.filter((product: IProduct):boolean => product.id !== productId);
  }

  clearCart(): void {
    this.products.length = 0;
  }

  getSumOfProductsInCart(): number {
    return this.products.reduce((sum: number, product: IProduct): number => {
      return product.price === null ? sum : sum + product.price
    }, 0)
  }

  getQuantityOfProductsInCart(): number {
    return this.products.length;
  }
  
  hasProductInCart(productId: string): boolean {
    return this.products.some((product: IProduct): boolean => product.id === productId)
  }
}
```

Методы:
  getProductsInCart(): IProduct[] - получение массива товаров, которые находятся в корзине.
  setProductToCart(product: IProduct): void  - добавление товара, который был получен в параметре, в массив корзины.
  deleteProductFromCart(productId: string): void - удаление товара, полученного в параметре из массива корзины.
  clearCart(): void - очистка корзины.
  getSumOfProductsInCart(): number - получение стоимости всех товаров в корзине.
  getQuantityOfProductsInCart(): number - получение количества товаров в корзине.
  hasProductInCart(productId: string): boolean - проверка наличия товара в корзине по его id, полученного в параметр метода.

Класс Buyer:
Хранит данные о покупателе.
Конструктор класса не принимает параметров.

```typescript
export class Buyer {
  private payment: TPayment | null = null;
  private email: string = "";
  private phone: string = "";
  private address: string = "";


  setBuyerData(data: Partial<IBuyer>): void {
    Object.assign(this, data)
  }

  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  clearBuyerData(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validateBuyerData(): Record<string, string> {
    const errors: Errors = {};
    
    if (this.payment === null) {errors.payment = "Не выбран вид оплаты"};
    if (this.email === "") {errors.email = "Укажите емэйл"};
    if (this.phone === "") {errors.phone = "укажите телефон"};
    if (this.address === "") {errors.address = "Не указан адрес"};

    return errors;
  }
}
```

Методы:
  setBuyerData(data: Partial<IBuyer>): void - сохранение данных о покупателе. 
  getBuyerData(): IBuyer - получение всех данных покупателя.
  clearBuyerData(): void - очистка данных покупателя.
  validateBuyerData(): Record<string, string> - валидация данных. 

###### Слой коммуникации

Для взаимодействия с сервером есть класс ShopApi.
Этот класс будет использовать композицию, чтобы выполнить запрос на сервер с помощью метода get класса Api и будет получать с сервера объект с массивом товаров.

```typescript
export class ShopApi {
  private api: IApi;
  constructor (api: IApi) {
    this.api = api;
  }

  getProductList(): Promise<IProductList> {
    return this.api.get<IProductList>('/product');
  }

  postOrderList(order: Order): Promise<IOrder> {
    return this.api.post<IOrder>('/order', order)
  }
}
```
Конструктор: constructor(api: IApi) - в конструктор передаётся класс с методами get и post для принятия и отправки данных с сервера.
Методы класса: 
getProductList(): Promise<IProductList> - получение с сервера объекта с товарами. 
postOrderList(order: Order): Promise<IOrder> - отправка на сервер данных о купленных товарах и покупателе.
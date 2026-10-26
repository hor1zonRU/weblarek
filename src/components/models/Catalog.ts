import { IProduct } from '../../types/index';
import { IEvents } from "../base/Events";

export class Catalog {

  private products: IProduct[] = [];
  private card: IProduct | undefined;

  constructor (protected events: IEvents) {};

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit('catalog:change');
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(productId: string): IProduct | undefined {
    return this.products.find((product: IProduct): boolean => product.id === productId)
  }

  setSelectedProduct(id: string): void {
    this.card = this.products.find((product: IProduct) => product.id === id);
    this.events.emit('card:change');
  }

  getSelectedProduct(): IProduct | undefined  {
    return this.card;
  }
}
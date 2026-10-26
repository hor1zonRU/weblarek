import {IProduct} from '../../types/index';
import { IEvents } from "../base/Events";

export class Cart {

  private products: IProduct[] = [];

  constructor (protected events: IEvents) {}

  getProductsInCart(): IProduct[] {
    return this.products;
  }

  setProductToCart(product: IProduct): void {
    this.products.push(product);
    this.events.emit(`cart:add`);
    this.events.emit('cart:change');
  }

  deleteProductFromCart(productId: string): void {
    this.products = this.products.filter((product: IProduct):boolean => product.id !== productId);
    this.events.emit(`cart:remove`);
    this.events.emit('cart:change');
  }

  clearCart(): void {
    this.products.length = 0;
    this.events.emit(`cart:clear`);
    this.events.emit('cart:change');
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
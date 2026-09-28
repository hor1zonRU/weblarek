import {IProduct} from '../../types/index'

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
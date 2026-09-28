import {IProduct} from '../../types/index'

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
import { IProductList, IOrder, Order} from "../../types/index";
import { Api } from "../base/Api";

export class ShopApi extends Api {
  constructor (baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }

  getProductList(): Promise<IProductList> {
    return this.get<IProductList>('/product');
  }

  postOrderList(order: Order): Promise<IOrder> {
    return this.post<IOrder>('/order', order)
  }
}
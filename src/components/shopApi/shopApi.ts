import { IApi, IProductList, IOrder, Order} from "../../types/index";

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
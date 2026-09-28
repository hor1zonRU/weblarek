import { IBuyer, TPayment} from "../../types/index";

export class Buyer {
  private payment: TPayment | "" = "";
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
    this.payment = "";
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validateBuyerData(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (this.payment === "") {errors.payment = "Не выбран вид оплаты"};
    if (this.email === "") {errors.email = "Укажите емэйл"};
    if (this.phone === "") {errors.phone = "укажите телефон"};
    if (this.address === "") {errors.address = "Не указан адрес"};

    return errors;
  }
}
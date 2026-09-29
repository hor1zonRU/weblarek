import { IBuyer, TPayment, Errors} from "../../types/index";

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
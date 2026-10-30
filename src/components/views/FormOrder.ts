import { Form, IForm} from "./Form";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { TPayment, IBuyer} from "../../types/index";
import { IEvents } from "../base/Events";

type TFormOrder = Pick<IBuyer, 'payment' | 'address'> & IForm 

export class FormOrder extends Form<TFormOrder> {
  protected buttonPayment: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLFormElement) {
    super(events, container);

    this.buttonPayment = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.buttonPayment.forEach( button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.events.emit('formOrder:change', {field: 'payment', value: button.name});
      })
    })

    this.addressInput.addEventListener('input', () => {
      this.events.emit('formOrder:change', {field: 'address', value: this.addressInput.value})
    })
  }

  protected set payment(value: TPayment | null) {
    this.buttonPayment.forEach(button => {
      button.classList.toggle('button_alt-active', value !== null && button.name === value);
    })
  }

  protected set address(value: string) {
    this.addressInput.value = value;
  }
}
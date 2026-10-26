import { Form} from "./Form";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { TPayment } from "../../types/index";
import { IEvents } from "../base/Events";


export class FormOrder extends Form {
  protected buttonPayment: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(events, container);

    this.buttonPayment = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.buttonPayment.forEach( button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.payment = button.name as TPayment;
        this.events.emit('formOrder:change', {field: 'payment', value: button.name});
      })
    })

    this.addressInput.addEventListener('input', () => {
      this.events.emit('formOrder:change', {field: 'address', value: this.addressInput.value})
    })
  }

  protected set payment(value: TPayment) {
    this.buttonPayment.forEach(button => {
      button.classList.toggle('button_alt-active', button.name === value);
    })
  }

  protected set address(value: string) {
    this.addressInput.value = value;
  }
}
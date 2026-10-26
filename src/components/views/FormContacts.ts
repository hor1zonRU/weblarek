import { Form } from "./Form";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class FormContacts extends Form {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(events, container);

    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this.emailInput.addEventListener('input', () => {
      this.events.emit('formContacts:change', {field: 'email', value: this.emailInput.value});
    })
    this.phoneInput.addEventListener('input', () => {
      this.events.emit('formContacts:change', {field: 'phone', value: this.phoneInput.value});
    })
  }

  protected set email(value: string) {
    this.emailInput.value = value;
  }

  protected set phone(value: string) {
    this.phoneInput.value = value;
  }
}


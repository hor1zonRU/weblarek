import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IForm {
  error: string;
  valid: boolean;
}

export class Form extends Component<IForm> {
  protected formError: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(container);

    this.formError = ensureElement<HTMLElement>('.form__errors', this.container);
    this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);

    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit(`${this.container.getAttribute('name')}:submit`);
    }); 
  }

  protected set error(value: string) {
    this.formError.textContent = value;
  }

  protected set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
}
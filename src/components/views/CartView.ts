import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface ICart {
  content: HTMLElement[];
  total: number;
  valid: boolean;
}

export class CartView extends Component<ICart> {
  protected cartContent: HTMLElement;
  protected cartButton: HTMLButtonElement;
  protected cartPrice: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.cartContent = ensureElement<HTMLElement>('.basket__list', this.container);
    this.cartButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.cartPrice = ensureElement<HTMLElement>('.basket__price', this.container);

    this.cartButton.addEventListener('click', () => {
      this.events.emit('cart:order');
    })
  }

  protected set content (value: HTMLElement[]) {
    this.cartContent.replaceChildren(...value);
  }
  protected set total (value: number) {
    this.cartPrice.textContent = `${value} синапсов`;
  }
  protected set valid(value: boolean) {
    this.cartButton.disabled = !value;
  }
}
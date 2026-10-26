import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  total: number;
}

export class Success extends Component<ISuccess> {
  successButton: HTMLButtonElement;
  successOrder: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.successOrder = ensureElement<HTMLElement>('.order-success__description', this.container);

    this.successButton.addEventListener(`click`, () => {
      this.events.emit(`success:buttonClick`);
    });
  }

  protected set total(value: number) {
    this.successOrder.textContent = `Списано ${value} синапсов`;
  }
}
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface ICard {
  title: string;
  price: number | null;
}

export class Card<T extends ICard = ICard> extends Component<T> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
  }

  protected set title(value: string) {
    this.cardTitle.textContent = value;
  }

  protected set price(value: number | null) {
    if (value) {this.cardPrice.textContent = `${value} синапсов`}
    else {this.cardPrice.textContent = ''}
  }
}
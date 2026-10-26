import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export class Card<T = object> extends Component<T> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;
  protected cardImage?: HTMLImageElement | null;
  protected cardCategory?: HTMLElement | null;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
    this.cardImage = this.container.querySelector('.card__image') as HTMLImageElement;
    this.cardCategory = this.container.querySelector('.card__category') as HTMLElement;
  }

  protected set title(value: string) {
    this.cardTitle.textContent = value;
  }

  protected set price(value: number | null) {
    if (value) {this.cardPrice.textContent = `${value} синапсов`}
    else {this.cardPrice.textContent = ''}
  }

  protected set category(value: string) {
    if (this.cardCategory) {this.cardCategory.textContent = value};
  }
  protected set image(value: string) {
    if (this.cardImage) {this.setImage(this.cardImage, value)};
  }
}
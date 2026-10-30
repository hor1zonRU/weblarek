import { Card } from "./Card";
import { ensureElement } from "../../utils/utils";
import {IProduct, ICardActions } from "../../types/index";

interface ICardInCart {
  index: number;
  title: IProduct['title'];
  price: IProduct['price'];
}

export class CardInCart extends Card<ICardInCart> {
  protected cardIndex: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.cardIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    if (actions?.onClick) {
      this.deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        actions.onClick(e); 
      });
    }
  }

  protected set index(value: number) {
    this.cardIndex.textContent = String(value);
  }
}
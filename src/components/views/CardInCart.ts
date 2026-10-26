import { Card } from "./Card";
import { ensureElement } from "../../utils/utils";
import { IProduct, ICardActions } from "../../types/index";

interface ICardInCart extends IProduct{
  index: number;
}

export class CardInCart extends Card<ICardInCart> {
  protected cardIndex: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.cardIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    if (actions?.onClick) {
      // ИСПРАВЛЕНИЕ: Оборачиваем вызов, отменяя стандартное поведение
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
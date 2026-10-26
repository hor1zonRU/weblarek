import { Card } from "./Card";
import { ICardActions } from "../../types/index";

export class CardCatalog extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    if (actions && actions.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }
}
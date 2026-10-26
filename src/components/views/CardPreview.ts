import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class CardPreview extends Card {
  protected cardDescription: HTMLElement;
  protected cardAddButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
    this.cardAddButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.cardAddButton.addEventListener('click', () => {
      this.events.emit('card:addToCart');
    })
  }

  protected set description(value: string) {
    this.cardDescription.textContent = value;
  }
  protected set button(value: string) {
    this.cardAddButton.textContent = value;
  }
  protected set valid(value: boolean) {
    this.cardAddButton.disabled = !value;
  }
}
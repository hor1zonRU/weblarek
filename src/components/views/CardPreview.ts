import { Card, ICard} from "./Card";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants";

type CategoryKey = keyof typeof categoryMap;

interface ICardPreview extends ICard{
  image: {url: string, alt: string};
  category: string;
  description: string;
  buttonText?: string;
  valid?: boolean; 
}

export class CardPreview extends Card<ICardPreview>{
  protected cardImage: HTMLImageElement;
  protected cardCategory: HTMLElement;
  protected cardDescription: HTMLElement;
  protected cardAddButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
    this.cardAddButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.cardAddButton.addEventListener('click', () => {
      this.events.emit('card:action');
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

  protected set category(value: string) {
    this.cardCategory.textContent = value;

    for (const key in categoryMap) {
      this.cardCategory.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      )
    }
  }

  protected set image(value: {url: string, alt: string}) {
    this.setImage(this.cardImage, value.url);
    this.cardImage.alt = value.alt; 
  }
}
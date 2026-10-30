import { Card, ICard} from "./Card";
import { ICardActions } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants"

interface ICardCatalog extends ICard {
  category: string;
  image: {url: string, alt: string};
}

type CategoryKey = keyof typeof categoryMap;

export class CardCatalog extends Card<ICardCatalog> {
  protected cardImage: HTMLImageElement;
  protected cardCategory: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);

    if (actions && actions.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
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
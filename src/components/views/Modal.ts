import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  
  protected modalButton: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);

    this.container.addEventListener('click', this.close.bind(this));
    this.modalButton.addEventListener('click', this.close.bind(this));
    this.modalContent.addEventListener('click', (e) => e.stopPropagation());
  }

  protected set content(value: HTMLElement) {
    this.modalContent.replaceChildren(value);
  }

  open(): void {
    this.container.classList.add('modal_active');
  }

  close(): void {
    this.container.classList.remove('modal_active');
    this.modalContent.replaceChildren();
  }
}
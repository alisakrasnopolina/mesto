import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._imageSelector = this._selector.querySelector('.popup__pic');
    this._linkSelector = this._selector.querySelector('.popup__name');
  }

  open({name, link}) {
    super.open();
    this._linkSelector.textContent = name;
    this._imageSelector.src = link;
    this._imageSelector.alt = `Изображение ${name}`;
  }
}
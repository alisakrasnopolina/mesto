import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__pic');
    this._name = this._popup.querySelector('.popup__name');
  }

  open({name, link}) {
    super.open();
    this._name.textContent = name;
    this._image.src = link;
    this._image.alt = `Изображение ${name}`;
  }
}
import {Popup} from './Popup.js'

export class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleDeleteClick) {
    super(popupSelector);
    this._handleDeleteClick = handleDeleteClick;
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__submit-button');
  }

  open(data) {
    super.open();
    this._data = data;
  }

  setButtonText(text) {
    this._button.textContent = text
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteClick(this._data)
    })
  }
}
import {Popup} from './Popup.js'

export class PopupWithConfirmation extends Popup {

  constructor(popupSelector,handledeleteClick) {
    super(popupSelector);
    this._handledeleteClick = handledeleteClick;
    this._button = this._selector.querySelector('.popup__submit-button')
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
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handledeleteClick(this._data)
    })
  }
}
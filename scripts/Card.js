import {popupPicElement, cardName, cardPic, openPopup} from './index.js'

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('elements__heart_condition_active');
  }
  
  _handleTrashClick(evt) {
    evt.target.closest('.elements__card').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.elements__heart').addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._element.querySelector('.elements__trash').addEventListener('click', (evt) => {
      this._handleTrashClick(evt);
    });

    this._element.querySelector('.elements__pic').addEventListener('click', (evt) => {
      openPopup(popupPicElement);
      cardName.textContent = this._name;
      cardPic.src = this._link;
      cardPic.alt = `Изображение ${this._name}`;
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardPicElement = this._element.querySelector('.elements__pic');
    this._setEventListeners();

    this._element.querySelector('.elements__name').textContent = this._name;
    cardPicElement.src = this._link;
    cardPicElement.alt = `Изображение ${this._name}`;

    return this._element;
  }
}
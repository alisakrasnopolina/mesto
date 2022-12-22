export class Card {

  constructor(data, templateSelector, openPicPopup) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._openPicPopup = openPicPopup;
    this._handleTrashClick = this._handleTrashClick.bind(this);
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
  
  _handleTrashClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.elements__heart').addEventListener('click', this._handleLikeClick)

    this._element.querySelector('.elements__trash').addEventListener('click', this._handleTrashClick);

    this._cardPicElement.addEventListener('click',  () => {this._openPicPopup(this._name, this._link)});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPicElement = this._element.querySelector('.elements__pic');
    this._setEventListeners();

    this._element.querySelector('.elements__name').textContent = this._name;
    this._cardPicElement.src = this._link;
    this._cardPicElement.alt = `Изображение ${this._name}`;

    return this._element;
  }
}
export class Card {

  constructor({data, user, templateSelector, handleCardClick, handledeleteClick, handleLikeClick}) {
    this._templateSelector = templateSelector;
    this._user = user;
    this._userId = user._id;
    this._data = data;
    this._id = data._id;
    this._owner =  data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likes_length = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._handledeleteClick = handledeleteClick;
    this._handleLikeClick = handleLikeClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    if (this._likes.find(like => like._id === this._userId) === undefined) {
      return true
    } else {
      return false
    }
  }
  
  toggleLike() {
  this._element.querySelector('.elements__heart').classList.toggle('elements__heart_condition_active');
  }

  setLikes(likes) {
    this._likes_length = likes.length;
    this._element.querySelector('.elements__number-of-likes').textContent = this._likes_length;
  }
  
  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.elements__heart').addEventListener('click', () => {this._handleLikeClick(this._id)})

    this._element.querySelector('.elements__trash').addEventListener('click', () => {this._handledeleteClick(this._data)});

    this._cardPicElement.addEventListener('click',  () => {this._handleCardClick({name: this._name, link: this._link})});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPicElement = this._element.querySelector('.elements__pic'); 
    this._setEventListeners();
    if (this.isLiked()) {
      this._element.querySelector('.elements__heart').classList.remove('elements__heart_condition_active');
    } else {
      this._element.querySelector('.elements__heart').classList.add('elements__heart_condition_active');
    }

    if (this._userId != this._owner) {
      this._element.querySelector('.elements__trash').style.display = 'none'
    }

    this._element.querySelector('.elements__name').textContent = this._name;
    this._cardPicElement.style.backgroundImage = `url('${this._link}')`;
    this._cardPicElement.title = `Изображение ${this._name}`;
    this._element.querySelector('.elements__number-of-likes').textContent = this._likes_length

    return this._element;
  }
}
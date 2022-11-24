const popupElement = document.querySelector('.popup');
const popupFormElement = document.querySelector('#popup_name_form');
const popupCardElement = document.querySelector('#popup_name_card');
const popupPicElement = document.querySelector('#popup_name_pic');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseButtonElement = document.querySelectorAll('.popup__close');
let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__text_data_name');
let jobInput = document.querySelector('.popup__text_data_about');
let titleInput = document.querySelector('.popup__text_data_title');
let linkInput = document.querySelector('.popup__text_data_link');
let profileNameElement = document.querySelector('.profile__name');
let profileAboutElement = document.querySelector('.profile__occupation');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];
const cards = document.querySelector('.elements');

initialCards.forEach(function (item) {
  const newCard = document.querySelector('#card').content;
  const cardElement = newCard.querySelector('.elements__card').cloneNode(true);

  cardElement.querySelector('.elements__name').textContent = item.name;
  cardElement.querySelector('.elements__pic').src = item.link;

  cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_condition_active')
  });

  cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
  });

  cardElement.querySelector('.elements__pic').addEventListener('click', function (evt) {
    popupPicElement.querySelector('.popup__name').textContent = item.name;
    popupPicElement.querySelector('.popup__pic').src = item.link;
    popupPicElement.classList.toggle('popup_opened');
  });

  cards.append(cardElement);
});

function addCard (evt) {
  evt.preventDefault();
  const newCard = document.querySelector('#card').content;
  const cardElement = newCard.querySelector('.elements__card').cloneNode(true);

  cardElement.querySelector('.elements__name').textContent = titleInput.value;
  cardElement.querySelector('.elements__pic').src = linkInput.value;

  cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_condition_active')
  });

  cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
  });

  cardElement.querySelector('.elements__pic').addEventListener('click', function (evt) {
    popupPicElement.querySelector('.popup__name').textContent = titleInput.value;
    popupPicElement.querySelector('.popup__pic').src = linkInput.value;
    popupPicElement.classList.toggle('popup_opened');
  });

  cards.prepend(cardElement);

  closePopup(popupCardElement);
};

const openPopup = function(popupElement) {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileNameElement.textContent = nameInput.value;
    profileAboutElement.textContent = jobInput.value;

    closePopup(popupFormElement);
}


popupEditButtonElement.addEventListener('click', function() {openPopup(popupFormElement)});
popupAddButtonElement.addEventListener('click', function() {openPopup(popupCardElement)});
popupFormElement.querySelector('.popup__close').addEventListener('click', function() {closePopup(popupFormElement)});
popupCardElement.querySelector('.popup__close').addEventListener('click', function() {closePopup(popupCardElement)});
popupPicElement.querySelector('.popup__close').addEventListener('click', function() {closePopup(popupPicElement)});
popupFormElement.querySelector('.popup__content').addEventListener('submit', formSubmitHandler);
popupCardElement.querySelector('.popup__content').addEventListener('submit', addCard);
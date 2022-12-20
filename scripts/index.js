const popups = document.querySelectorAll('.popup');
const formPopupProfile = document.querySelector('#popup_name_form');
const formPopupCard = document.querySelector('#popup_name_card');
const buttonEditPopup = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');
const titleInput = document.querySelector('.popup__input_data_title');
const linkInput = document.querySelector('.popup__input_data_link');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__occupation');
const cards = document.querySelector('.elements');
export const popupPicElement = document.querySelector('#popup_name_pic');
export const cardName = popupPicElement.querySelector('.popup__name');
export const cardPic = popupPicElement.querySelector('.popup__pic');
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
}
const formList = Array.from(document.querySelectorAll(settings.formSelector));

import {initialCards} from './cards.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

initialCards.forEach(function (item) {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();
  cards.append(cardElement);
});

function addCard(evt) {
  evt.preventDefault();

  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const card = new Card(data, '#card');
  const cardElement = card.generateCard();

  cards.prepend(cardElement);

  closePopup(formPopupCard);

  evt.target.reset();
};

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function openPropfilePopup() { 

  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;

  openPopup(formPopupProfile)
}

function handleFormPopupProfileSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;

  closePopup(formPopupProfile);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__container')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
});
  
formList.forEach((formElement) => {
  const valid = new FormValidator(settings, formElement);
  valid.enableValidation(); 
});

buttonEditPopup.addEventListener('click', openPropfilePopup);
buttonAddCard.addEventListener('click', function() {openPopup(formPopupCard)});
formPopupProfile.querySelector('.popup__content').addEventListener('submit', handleFormPopupProfileSubmit);
formPopupCard.querySelector('.popup__content').addEventListener('submit', addCard);
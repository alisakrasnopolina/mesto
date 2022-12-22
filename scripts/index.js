import {initialCards, validationSettings} from './constants.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup_name_edit-profile');
const popupCard = document.querySelector('#popup_name_card');
const formPopupProfile = document.querySelector('#popup_form_profile');
const formPopupCard = document.querySelector('#popup_form_card');
const buttonEditPopup = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');
const titleInput = document.querySelector('.popup__input_data_title');
const linkInput = document.querySelector('.popup__input_data_link');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__occupation');
const cards = document.querySelector('.elements');
const popupPicElement = document.querySelector('#popup_name_pic');
const cardName = popupPicElement.querySelector('.popup__name');
const cardPic = popupPicElement.querySelector('.popup__pic');
const formList = document.querySelectorAll(validationSettings.formSelector);


function handleOpenPopup(name, link) {
  openPopup(popupPicElement);
  cardName.textContent = name;
  cardPic.src = link;
  cardPic.alt = `Изображение ${name}`;
}

function createCard(data) {
  const card = new Card(data, '#card', handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement
};

initialCards.forEach(function (item) {
  cards.append(createCard(item));
});

function addCard(evt) {
  evt.preventDefault();

  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };

  cards.prepend(createCard(data));

  closePopup(popupCard);

  evt.target.reset();
};

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

function openPopup(popupElement) {
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

  openPopup(popupProfile)
}

function handleFormPopupProfileSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;

  closePopup(popupProfile);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
});
  
formList.forEach((formElement) => {
  const valid = new FormValidator(validationSettings, formElement);
  valid.enableValidation(); 
});


buttonEditPopup.addEventListener('click', openPropfilePopup);
buttonAddCard.addEventListener('click', function() {openPopup(popupCard)});
formPopupProfile.addEventListener('submit', handleFormPopupProfileSubmit);
formPopupCard.addEventListener('submit', addCard);
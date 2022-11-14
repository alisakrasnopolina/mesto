const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
let formElement = popupElement.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__text_data_name');
let jobInput = formElement.querySelector('.popup__text_data_about');
let profileNameElement = document.querySelector('.profile__name');
let profileAboutElement = document.querySelector('.profile__occupation');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileNameElement.textContent = nameInput.value;
    profileAboutElement.textContent = jobInput.value;

    closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
import {initialCards, 
  validationSettings,
  formPopupProfile,
  formPopupCard,
  buttonEditPopup,
  buttonAddCard,
  nameInput,
  jobInput,
  cards} from './constants.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {Section} from './Section.js'
import {PopupWithImage} from './PopupWithImage.js'
import {PopupWithForm} from './PopupWithForm.js'
import {UserInfo} from './UserInfo.js'
import '../pages/index.css';


const popupWithImage = new PopupWithImage('#popup_name_pic');
popupWithImage.setEventListeners()

function createCard(data) {
  const card = new Card(data, '#card', () => popupWithImage.open(data));
  return card.generateCard();
};

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    initialCardList.addItem(createCard(item));
  },
}, '.elements');

initialCardList.renderItems();

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__occupation'});

const popupProfile = new PopupWithForm('#popup_name_edit-profile', ({name, about}) => userInfo.setUserInfo({name, about}))
popupProfile.setEventListeners()

const popupCard = new PopupWithForm('#popup_name_card', (data) => cards.prepend(createCard(data)))
popupCard.setEventListeners()

const validationPopupProfile = new FormValidator(validationSettings, formPopupProfile);
validationPopupProfile.enableValidation(); 

const validationPopupCard = new FormValidator(validationSettings, formPopupCard);
validationPopupCard.enableValidation(); 

buttonEditPopup.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
  popupProfile.open()});
buttonAddCard.addEventListener('click', () => {popupCard.open()});
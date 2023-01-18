import {initialCards, 
  validationSettings,
  formPopupProfile,
  formPopupCard,
  buttonEditPopup,
  buttonAddCard} from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
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

const popupCard = new PopupWithForm('#popup_name_card', (item) => initialCardList.addItemToStart(createCard(item)))
popupCard.setEventListeners()

const validationPopupProfile = new FormValidator(validationSettings, formPopupProfile);
validationPopupProfile.enableValidation(); 

const validationPopupCard = new FormValidator(validationSettings, formPopupCard);
validationPopupCard.enableValidation(); 

buttonEditPopup.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupProfile.setInputValues(info);
  popupProfile.open()});
buttonAddCard.addEventListener('click', () => {popupCard.open()});
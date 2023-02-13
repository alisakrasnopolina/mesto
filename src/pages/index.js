import { 
  validationSettings,
  formPopupProfile,
  formPopupCard,
  formPopupAvatar,
  buttonEditPopup,
  buttonAddCard, 
  buttonEditAvatar} from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api'
import '../pages/index.css';
let user

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'b91add11-33ee-4087-8698-f24340903f03',
    'Content-Type': 'application/json'
  }
});

function handleDeleteClick(card) {
  popupSure.setButtonText('Удаление...')
  api.deleteCard(card.getId())
    .then(() => {
      card.deleteCard()
      popupSure.close()
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupSure.setButtonText('Да')
    })
}

function createCard(data) {
  const card = new Card({
    data,
    user, 
    templateSelector: '#card',
    handleCardClick: () => popupWithImage.open(data),
    handleDeleteClick: () => {
      popupSure.open(card)
    },
    handleLikeClick:  (id) => {
    if (!card.isLiked()) {
      api.putLike(id)
        .then((res) => {
          card.toggleLike()
          card.setLikes(res.likes)
        })
        .catch((err) => {console.log(err)}) 
    } else {
      api.deleteLike(id)
        .then((res) => {
          card.toggleLike()
          card.setLikes(res.likes)
        })
        .catch((err) => {console.log(err)})
    }
    }}
  );
  return card.generateCard();
};

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([profileData, cards]) => {
    user = profileData
    userInfo.setUserInfo({name: profileData.name, about: profileData.about})
    userInfo.setAvatar(profileData.avatar)
    cardsSection.renderItems(cards)
  })
  .catch((err) => {console.log(err)}); 

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.appendItem(createCard(item));
  },
}, '.elements');

const popupWithImage = new PopupWithImage('#popup_name_pic');
popupWithImage.setEventListeners()

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__occupation', avatarSelector: '.profile__avatar'});

const popupSure = new PopupWithConfirmation('#popup_name_sure', (card) => {handleDeleteClick(card)})
popupSure.setEventListeners();

const popupProfile = new PopupWithForm('#popup_name_edit-profile', ({name, about}) => {
  popupProfile.setButtonText('Сохранение...')
  api.editProfile({name, about})
    .then(res => {
      userInfo.setUserInfo({name: res.name, about: res.about})
      popupProfile.close()
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupProfile.setButtonText('Сохранить')
    }) 
})
popupProfile.setEventListeners()

const popupAvatar = new PopupWithForm('#popup_name_edit-avatar', (avatar) => {
  popupAvatar.setButtonText('Сохранение...')
  api.editAvatar(avatar)
    .then(res => {
      userInfo.setAvatar(res.avatar)
      popupAvatar.close()
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupAvatar.setButtonText('Сохранить')
    }) 
})
popupAvatar.setEventListeners()

const popupCard = new PopupWithForm('#popup_name_card', ({name, link}) => {
  popupCard.setButtonText('Создание...')
  api.addCard({name, link})
    .then(res => {
      cardsSection.prependItem(createCard(res))
      popupCard.close()
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      popupCard.setButtonText('Создать')
    })
})
popupCard.setEventListeners()

const validationPopupProfile = new FormValidator(validationSettings, formPopupProfile);
validationPopupProfile.enableValidation(); 

const validationPopupAvatar = new FormValidator(validationSettings, formPopupAvatar);
validationPopupAvatar.enableValidation(); 

const validationPopupCard = new FormValidator(validationSettings, formPopupCard);
validationPopupCard.enableValidation(); 

buttonEditPopup.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupProfile.setInputValues(info);
  popupProfile.open()});
buttonAddCard.addEventListener('click', () => {popupCard.open()});
buttonEditAvatar.addEventListener('click', () => {popupAvatar.open()});
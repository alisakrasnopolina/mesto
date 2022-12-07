const popupElement = document.querySelector('.popup');
const formPopupProfile = document.querySelector('#popup_name_form');
const formPopupCard = document.querySelector('#popup_name_card');
const popupPicElement = document.querySelector('#popup_name_pic');
const buttonEditPopup = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__content');
const nameInput = document.querySelector('.popup__text_data_name');
const jobInput = document.querySelector('.popup__text_data_about');
const titleInput = document.querySelector('.popup__text_data_title');
const linkInput = document.querySelector('.popup__text_data_link');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__occupation');
const cards = document.querySelector('.elements');
const newCard = document.querySelector('#card').content;

function handleLikeClick(evt) {
  evt.target.classList.toggle('elements__heart_condition_active');
}

function handleTrashClick(evt) {
  evt.target.parentElement.remove();
}

function createCard(titleValue, picValue) {
  const cardElement = newCard.querySelector('.elements__card').cloneNode(true);

  cardElement.querySelector('.elements__name').textContent = titleValue;
  cardElement.querySelector('.elements__pic').src = picValue;

  cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
    handleLikeClick(evt);
  });

  cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    handleTrashClick(evt);
  });

  cardElement.querySelector('.elements__pic').addEventListener('click', function (evt) {
    openPopup(popupPicElement);
    popupPicElement.querySelector('.popup__name').textContent = titleValue;
    popupPicElement.querySelector('.popup__pic').src = picValue;
  });

  return cardElement
}

initialCards.forEach(function (item) {
  const cardElement = createCard(item.name, item.link);

  cards.append(cardElement);
});

function addCard(evt) {
  evt.preventDefault();

  const cardElement = createCard(titleInput.value, linkInput.value);

  cards.prepend(cardElement);

  closePopup(formPopupCard);

  formPopupCard.querySelector('#popup_form_card').reset();
};

function closePopupwithEsc(evt, popupElement) {
  if (evt.key === 'Escape') {
    closePopup(popupElement);
  }
};

function closePopupwithOverlay(evt, popupElement) {
  if (evt.target.classList.contains('popup__container')) {
    closePopup(popupElement);
  }
};


function openPopup( popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', function(evt) {closePopupwithEsc(evt, popupElement)});
  document.addEventListener('mousedown', function(evt) {closePopupwithOverlay(evt, popupElement)});
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', function(evt) {closePopupwithEsc(evt, popupElement)});
  document.removeEventListener('mousedown', function(evt) {closePopupwithOverlay(evt, popupElement)});
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


buttonEditPopup.addEventListener('click', openPropfilePopup);
buttonAddCard.addEventListener('click', function() {openPopup(formPopupCard)});
formPopupProfile.querySelector('.popup__close').addEventListener('click', function() {closePopup(formPopupProfile)});
formPopupCard.querySelector('.popup__close').addEventListener('click', function() {closePopup(formPopupCard)});
popupPicElement.querySelector('.popup__close').addEventListener('click', function() {closePopup(popupPicElement)});
formPopupProfile.querySelector('.popup__content').addEventListener('submit', handleFormPopupProfileSubmit);
formPopupCard.querySelector('.popup__content').addEventListener('submit', addCard);
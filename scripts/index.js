const popups = document.querySelectorAll('.popup');
const formPopupProfile = document.querySelector('#popup_name_form');
const formPopupCard = document.querySelector('#popup_name_card');
const popupPicElement = document.querySelector('#popup_name_pic');
const buttonEditPopup = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');
const titleInput = document.querySelector('.popup__input_data_title');
const linkInput = document.querySelector('.popup__input_data_link');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__occupation');
const cards = document.querySelector('.elements');
const cardName= popupPicElement.querySelector('.popup__name');
const cardPic = popupPicElement.querySelector('.popup__pic');
const cardTemplate = document.querySelector('#card').content;

function handleLikeClick(evt) {
  evt.target.classList.toggle('elements__heart_condition_active');
}

function handleTrashClick(evt) {
  evt.target.closest('.elements__card').remove();
}

function createCard(titleValue, picValue) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardPicElement = cardElement.querySelector('.elements__pic');

  cardElement.querySelector('.elements__name').textContent = titleValue;
  cardPicElement.src = picValue;
  cardPicElement.alt = `Изображение ${titleValue}`;

  cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
    handleLikeClick(evt);
  });

  cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    handleTrashClick(evt);
  });

  cardPicElement.addEventListener('click', function (evt) {
    openPopup(popupPicElement);
    cardName.textContent = titleValue;
    cardPic.src = picValue;
    cardPic.alt = `Изображение ${titleValue}`;
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

buttonEditPopup.addEventListener('click', openPropfilePopup);
buttonAddCard.addEventListener('click', function() {openPopup(formPopupCard)});
formPopupProfile.querySelector('.popup__content').addEventListener('submit', handleFormPopupProfileSubmit);
formPopupCard.querySelector('.popup__content').addEventListener('submit', addCard);
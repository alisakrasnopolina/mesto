const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_type_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__input-error_type_active');
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonSubmitElement) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmitElement.classList.add('popup__submit-button_type_inactive');
  } else {
    buttonSubmitElement.classList.remove('popup__submit-button_type_inactive');
  }
}; 

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonSubmitElement = formElement.querySelector('.popup__submit-button');
  const buttonCloseList = Array.from(document.querySelectorAll('.popup__close'));

  toggleButtonState(inputList, buttonSubmitElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonSubmitElement);

      buttonCloseList.forEach((buttonClose) => {
        buttonClose.addEventListener('click', function() {hideInputError(formElement, inputElement)})
        document.addEventListener('keydown', function(evt) {
          if (evt.key === 'Escape') {
            hideInputError(formElement, inputElement)
          }
        });
        document.addEventListener('mousedown', function(evt) {
          if (evt.target.classList.contains('popup__container')) {
            hideInputError(formElement, inputElement);
          }
        });
      });
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(); 

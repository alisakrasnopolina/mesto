const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonSubmitElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmitElement.classList.add(settings.inactiveButtonClass);
    buttonSubmitElement.setAttribute("disabled", "disabled");
  } else {
    buttonSubmitElement.classList.remove(settings.inactiveButtonClass);
    buttonSubmitElement.removeAttribute("disabled");
  }
}; 

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonSubmitElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonSubmitElement, settings);

  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonSubmitElement, settings);
    }, 0); 
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonSubmitElement, settings);
    });
  });
}; 

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

enableValidation(settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
}); 
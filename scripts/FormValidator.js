export class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inactiveButtonClass = data.inactiveButtonClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._formElement = formElement
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }; 
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 

  _toggleButtonState(inputList, buttonSubmitElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonSubmitElement.classList.add(this._inactiveButtonClass);
      buttonSubmitElement.setAttribute("disabled", "disabled");
    } else {
      buttonSubmitElement.classList.remove(this._inactiveButtonClass);
      buttonSubmitElement.removeAttribute("disabled");
    }
  }; 

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector);
  
    this._toggleButtonState(inputList, buttonSubmitElement);
  
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonSubmitElement);
      }, 0); 
    });
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
  
        this._toggleButtonState(inputList, buttonSubmitElement);
      });
    });
  }; 

  enableValidation() {
    this._setEventListeners(this._formElement);
  };
}
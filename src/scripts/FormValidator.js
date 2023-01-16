export class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inactiveButtonClass = data.inactiveButtonClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector);
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
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleInputErrorState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmitElement.classList.add(this._inactiveButtonClass);
      this._buttonSubmitElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonSubmitElement.classList.remove(this._inactiveButtonClass);
      this._buttonSubmitElement.removeAttribute("disabled");
    }
  }; 

  _setEventListeners() {
    this._toggleButtonState();
  
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0); 
    });
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(inputElement);
  
        this._toggleButtonState();
      });
    });
  }; 

  enableValidation() {
    this._setEventListeners();
  };
}
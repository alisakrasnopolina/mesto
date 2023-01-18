export class UserInfo {

  constructor({nameSelector, jobSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return { 
      name: this._nameSelector.textContent,
      about: this._jobSelector.textContent 
    }
  }

  setUserInfo({name, about}) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = about;
  }
}
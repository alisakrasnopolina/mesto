export class UserInfo {

  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { 
      name: this._nameSelector.textContent,
      about: this._jobSelector.textContent 
    }
  }

  setAvatar(avatar) {
    this._avatar.style.backgroundImage = `url('${avatar}')`;
  }

  setUserInfo({name, about}) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = about;
  }
}
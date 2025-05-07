import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProfileServiceService {

  get userProfile(): object {
    return this._userProfile;
  }

  set userProfile(value: object) {
    this._userProfile = value;
  }

  private _userProfile: object = {};
  constructor() {}
}

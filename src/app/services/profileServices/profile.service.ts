import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { AccountDTO, ProfileDTO, PlacementDTO, AccountType, TechnicalSkill } from '../../DTOs/ProfileDTO';


@Injectable({
  providedIn: 'root'
})


export class ProfileService {

  setProfile(profile: any) {
    this._profile.next(profile);
  }

  getProfileSubject() {
    return this._profile;
  }

  get technicalSkill(): BehaviorSubject<TechnicalSkill | null> {
    return this._technicalSkill;
  }

  set technicalSkill(value: BehaviorSubject<TechnicalSkill | null>) {
    this._technicalSkill = value;
  }
  get accountType(): BehaviorSubject<AccountType | null> {
    return this._accountType;
  }

  set accountType(value: BehaviorSubject<AccountType | null>) {
    this._accountType = value;
  }

  get profile(): BehaviorSubject<ProfileDTO> {
    return this._profile;
  }

  set profile(value: BehaviorSubject<ProfileDTO>) {
    this._profile = value;
  }

  get placement(): BehaviorSubject<PlacementDTO> {
    return this._placement;
  }

  set placement(value: BehaviorSubject<PlacementDTO>) {
    this._placement = value;
  }

  getProfileValue(){
    return this._profile$;
  }

  private _profile = new BehaviorSubject<ProfileDTO>(new ProfileDTO());
  private _profile$ = this._profile;
  private _placement = new BehaviorSubject<PlacementDTO>(new PlacementDTO());
  private _accountType = new BehaviorSubject<AccountType | null>(null);
  private _technicalSkill = new BehaviorSubject<TechnicalSkill | null>(null);

  constructor() {}
}


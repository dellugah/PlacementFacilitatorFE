import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../../services/profileServices/profile.service';
import {Router} from '@angular/router';
import {PlacementDTO, ProfileDTO} from '../../../../DTOs/ProfileDTO';
import {NgForOf, NgIf} from '@angular/common';
import {ConnectionService} from '../../../../services/connection/connection.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-placement-offers',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './placement-offers.component.html',
  styleUrl: './placement-offers.component.css'
})
export class PlacementOffersComponent implements OnInit{

  pendingOffers: PlacementDTO[] = [];
  constructor(protected profile: ProfileService,
              router : Router, protected connection : ConnectionService) { }

  ngOnInit(){
    this.reloadProfile()
  }

  public async acceptPlacement(placement : PlacementDTO){
    await this.connection.postConnection(placement.placementId, "student/accept-placement").then(
      (data => {
        this.profile.profile = new BehaviorSubject<ProfileDTO>( data as ProfileDTO);
        this.reloadProfile()
      })
    )
  }

  public async rejectPlacement(placement : PlacementDTO){
    await this.connection.postConnection(placement.placementId, "student/reject-placement").then(
      (data => {
        this.profile.profile = new BehaviorSubject<ProfileDTO>( data as ProfileDTO);
        this.reloadProfile()
      })
    )
  }

  private reloadProfile(){
    const profileValue = this.profile.profile.getValue();
    this.pendingOffers = [];
    if (profileValue.pendingOffers) {
      profileValue.pendingOffers.forEach(placement => {
        this.pendingOffers.push(placement);
      });
    }
  }

}

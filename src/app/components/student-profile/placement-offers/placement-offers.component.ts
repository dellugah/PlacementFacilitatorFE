import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {Router} from '@angular/router';
import {PlacementDTO} from '../../../DTOs/ProfileDTO';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-placement-offers',
  imports: [
    NgForOf
  ],
  templateUrl: './placement-offers.component.html',
  styleUrl: './placement-offers.component.css'
})
export class PlacementOffersComponent implements OnInit{

  pendingOffers: PlacementDTO[] = [];
  constructor(protected profile: ProfileService,
              router : Router,) { }

  ngOnInit(){
    const profileValue = this.profile.profile.getValue();
    console.log(profileValue);
    if (profileValue.pendingOffers) {
      profileValue.pendingOffers.forEach(placement => {
        console.log(placement);
        this.pendingOffers.push(placement);
      });
    }
  }

}

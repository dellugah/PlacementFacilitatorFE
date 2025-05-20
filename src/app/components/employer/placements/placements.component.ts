import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {PlacementDTO, ProfileDTO} from '../../../DTOs/ProfileDTO';
import {Router, RouterLink, ActivatedRoute } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {ConnectionService} from '../../../services/connection/connection.service';

@Component({
  selector: 'app-placements',
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink
  ],
  templateUrl: './placements.component.html',
  standalone: true,
  styleUrl: './placements.component.css'
})
export class PlacementsComponent implements OnInit {

  placement: PlacementDTO = new PlacementDTO();

  constructor(protected profile : ProfileService,
              protected connection : ConnectionService,
              private router : Router) { }

  async ngOnInit(){
    const updateProfile = await this.connection.getProfile();
    this.profile.profile = new BehaviorSubject<ProfileDTO>(updateProfile as ProfileDTO);

}

  async deletePlacement(placement: PlacementDTO){
    if(confirm('Are you sure you want to delete this placement?')){
      console.log(placement);
      await this.connection.postConnection(placement, 'employer/delete-placement');
      const updateProfile = await this.connection.getProfile();
      this.profile.profile = new BehaviorSubject<ProfileDTO>(updateProfile as ProfileDTO);
    }
  }

  async updatePlacement(placement: PlacementDTO) {
    await this.router.navigate(['employer/update-placement'], {
      queryParams: { data: JSON.stringify(placement) }
    });
  }

  async matchingSystem(placement: PlacementDTO){
    await this.router.navigate(['employer/matching'], {
      queryParams: { data: JSON.stringify(placement) }
    });
  }

  async placementStudentList(placement: PlacementDTO){
    await this.router.navigate(['employer/placement-student-list'], {
      queryParams: { data: JSON.stringify(placement) }
    });
  }


}

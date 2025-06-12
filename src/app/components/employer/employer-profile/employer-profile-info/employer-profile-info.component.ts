import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ProfileService} from '../../../../services/profileServices/profile.service';
import {BehaviorSubject} from 'rxjs';
import {PlacementDTO, ProfileDTO} from '../../../../DTOs/ProfileDTO';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employer-profile-info',
    imports: [
        NgForOf,
        NgOptimizedImage
    ],
  templateUrl: './employer-profile-info.component.html',
  styleUrl: './employer-profile-info.component.css'
})
export class EmployerProfileInfoComponent implements OnInit{

  constructor(protected profile : ProfileService,
              private router : Router) { }

  ngOnInit(){
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

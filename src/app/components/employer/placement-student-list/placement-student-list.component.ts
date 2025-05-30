import {Component, OnInit} from '@angular/core';
import {PlacementDTO, ProfileDTO} from '../../../DTOs/ProfileDTO';
import {ActivatedRoute} from '@angular/router';
import {ConnectionService} from '../../../services/connection/connection.service';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {BehaviorSubject} from 'rxjs';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-placement-student-list',
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './placement-student-list.component.html',
  styleUrl: './placement-student-list.component.css'
})
export class PlacementStudentListComponent implements OnInit{

  constructor(private route: ActivatedRoute,
              protected connection : ConnectionService,
              protected profile : ProfileService,) { }

  placement : PlacementDTO = new PlacementDTO();
  possibleStudents: ProfileDTO[] = [];

  ngOnInit(){
    this.route.queryParams.subscribe(async params => {
      if (params['data']) {
        this.placement = JSON.parse(params['data']) as PlacementDTO;
        this.possibleStudents = this.placement.potentialCandidates;
        this.possibleStudents.forEach(student => {
        })
      }
      const updateProfile = await this.connection.getProfile();
      this.profile.profile = new BehaviorSubject<ProfileDTO>(updateProfile as ProfileDTO);
      this.selectPlacement()
    });
  }

  private selectPlacement(){
    this.profile.placement.forEach(placement => {
      if(placement.placementId === this.placement.placementId){
        this.placement = placement;
      }
    })
  }

  protected async offerPlacement(studentId: number | undefined, placementId: number | undefined){
    if(studentId === undefined || placementId === undefined){
      return;
    }
    await this.connection.postConnection({
      studentId : studentId,
      placementId : placementId
    }, 'employer/offer-placement');
  }

}

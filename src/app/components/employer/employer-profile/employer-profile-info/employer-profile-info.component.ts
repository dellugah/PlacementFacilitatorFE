import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ProfileService} from '../../../../services/profileServices/profile.service';
import {BehaviorSubject} from 'rxjs';
import {ProfileDTO} from '../../../../DTOs/ProfileDTO';

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

  constructor(protected profile : ProfileService) { }

  ngOnInit(){
  }
}

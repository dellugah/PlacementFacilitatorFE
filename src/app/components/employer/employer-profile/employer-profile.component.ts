import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../../services/connection/connection.service';
import {ProfileServiceService} from '../../../services/profileServices/profile-service.service';
import {BehaviorSubject} from 'rxjs';
import {ProfileDTO} from '../../../DTOs/ProfileDTO';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-employer-profile',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './employer-profile.component.html',
  standalone: true,
  styleUrl: './employer-profile.component.css'
})
export class EmployerProfileComponent implements OnInit {

  profile$!: BehaviorSubject<ProfileDTO>;

  constructor(private connection : ConnectionService,
              protected profile : ProfileServiceService) { }

    async ngOnInit(){
    const loginData = await this.connection.getLogIn();
    console.log(loginData);
    this.profile.profile = new BehaviorSubject<ProfileDTO>(loginData as ProfileDTO);
    this.profile$ = this.profile.profile;
  }


}

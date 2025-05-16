import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../../services/connection/connection.service';
import {ProfileService} from '../../../services/profileServices/profile.service';
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
  domestic : string = '';

  constructor(protected connection : ConnectionService,
              protected profile : ProfileService) { }

    async ngOnInit(){
    this.profile.profile = new BehaviorSubject<ProfileDTO>(await this.connection.getLogIn() as ProfileDTO);
    this.profile$ = this.profile.profile;
    this.profileStyle()
  }

  private profileStyle(){
    const mainContainer = document.querySelector('.mainContainer') as HTMLElement;
    mainContainer.style.background = 'linear-gradient(to bottom, #f1f8ff, #ffffff 20%)';
  }

}

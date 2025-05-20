import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProfileDTO} from '../../../DTOs/ProfileDTO';
import {ConnectionService} from '../../../services/connection/connection.service';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-student-profile',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './student-profile.component.html',
  standalone: true,
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit{

  profile$: BehaviorSubject<ProfileDTO> = new BehaviorSubject<ProfileDTO>(new ProfileDTO());

  constructor(private connection : ConnectionService,
              protected profile : ProfileService) { }

  async ngOnInit(){
    const loginData = await this.connection.getProfile();
    this.profile.profile = new BehaviorSubject<ProfileDTO>(loginData as ProfileDTO);
    this.profile$ = this.profile.profile;
    this.profileStyle();
  }

  private profileStyle(){
    const mainContainer = document.querySelector('.mainContainer') as HTMLElement;
    mainContainer.style.background = 'linear-gradient(to bottom, #ffd1d1, #ffffff 20%)';
  }

}

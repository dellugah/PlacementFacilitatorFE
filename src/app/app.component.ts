import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {ProfileServiceService} from './services/profileServices/profile-service.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, NgClass, NgIf, RouterLink],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  mainClass = 'mainContainer';
  loggedIn = false;


  constructor(protected router : Router,
              private profile : ProfileServiceService) {}

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if(this.router.url !== '/' && this.router.url !== '/register'){
        this.loggedIn = true;
        this.mainClass = 'mainContainer mainContainer-size';
      }else{
        this.loggedIn = false;
        this.mainClass = 'mainContainer';
      }
    })
  }
}

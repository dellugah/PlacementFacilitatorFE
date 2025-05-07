import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {ProfileServiceService} from './services/profileServices/profile-service.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, NgClass, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  mainClass = 'mainContainer';
  logedIn = false;
  name : string = '';

  constructor(protected router : Router,
              private profileService : ProfileServiceService,
              private http: HttpClient) { }
  ngOnInit(){
    this.router.events.subscribe((event) => {
      if(this.router.url !== '/' && this.router.url !== '/register'){
        this.logedIn = true;
        this.mainClass = 'mainContainer mainContainer-size';
      }else{
        this.mainClass = 'mainContainer';
      }

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest');
    })
  }
}

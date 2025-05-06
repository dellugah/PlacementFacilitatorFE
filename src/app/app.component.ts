import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, NgClass, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  mainClass = 'mainContainer';
  constructor(protected router : Router) { }
  ngOnInit(){
    this.router.events.subscribe((event) => {
      if(this.router.url !== '/'){
        this.mainClass = 'mainContainer mainContainer-size';
      }else{
        this.mainClass = 'mainContainer';
      }
    })
  }
}

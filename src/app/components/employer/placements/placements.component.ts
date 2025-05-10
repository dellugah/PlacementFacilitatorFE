import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {ProfileDTO} from '../../../DTOs/ProfileDTO';

@Component({
  selector: 'app-placements',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './placements.component.html',
  standalone: true,
  styleUrl: './placements.component.css'
})
export class PlacementsComponent implements OnInit{

  constructor(private profile : ProfileService) { }

  ngOnInit(){
    // console.log(this.profile.profile$);
  }

}

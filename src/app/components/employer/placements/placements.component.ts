import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {ProfileDTO} from '../../../DTOs/ProfileDTO';

@Component({
  selector: 'app-placements',
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './placements.component.html',
  standalone: true,
  styleUrl: './placements.component.css'
})
export class PlacementsComponent implements OnInit {

  constructor(protected profile : ProfileService) { }

  ngOnInit(){

  }

}

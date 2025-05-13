import {Component, OnInit} from '@angular/core';
import {PlacementDTO} from '../../../DTOs/ProfileDTO';
import {ActivatedRoute} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-match-student',
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './match-student.component.html',
  styleUrl: './match-student.component.css'
})
export class MatchStudentComponent implements OnInit{
  placement: PlacementDTO = new PlacementDTO();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.placement = JSON.parse(params['data']) as PlacementDTO;
      }
    });
  }

}

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlacementDTO, ProfileDTO} from '../../../DTOs/ProfileDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ConnectionService} from '../../../services/connection/connection.service';
import {ProfileService} from '../../../services/profileServices/profile.service';

@Component({
  selector: 'app-match-student',
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf
  ],
  templateUrl: './match-student.component.html',
  styleUrl: './match-student.component.css'
})

export class MatchStudentComponent implements OnInit {
  placement: PlacementDTO = new PlacementDTO();

  constructor(private route: ActivatedRoute,
              protected connection : ConnectionService,
              protected profile : ProfileService,
              private router : Router) { }

  studentList: ProfileDTO[] = new Array<ProfileDTO>();
  index : number = 0;
  endOfFile : boolean = false;
  possibleStudents: ProfileDTO[] = [];

  async ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.placement = JSON.parse(params['data']) as PlacementDTO;
        this.possibleStudents = this.placement.potentialCandidates;
        this.possibleStudents.forEach(student => {
        })
      }
    });
    await this.reset();
  }

  public async insertStudent(){
    const response = await this.connection.postConnection({
        placementId : this.placement.placementId,
        studentId : this.studentList[this.index].profileId
      }, 'employer/match-student').then(
        () => {
          this.placement.potentialCandidates.push(this.studentList[this.index]);
        }
    );
    if(this.index >= this.studentList.length - 1){
      this.endOfFile = true;
    }
    else if(this.index <= this.studentList.length - 1){
      this.index++;
    }
  }
  public previousStudent(){
    if(this.index > 0){
      this.index--;
    }
  }

  public nextStudent(){
    if(this.index >= this.studentList.length - 1){
      this.endOfFile = true;
    }

    if(this.index < this.studentList.length - 1){
      this.index++;
    }
  }

  public async reset(){
    try {
      // Get the student list
      const data = await this.connection.getStudList<ProfileDTO[]>('employer/students');

      // If we have possible students, filter out duplicates
      if (this.possibleStudents?.length > 0) {
        // Create a Set of existing profile IDs for efficient lookup
        const existingIds = new Set(
          this.possibleStudents.map(student => student.profileId)
        );
        // Filter students that aren't in possibleStudents
        this.studentList = data.filter(
          student => !existingIds.has(student.profileId)
        );
      } else {
        // If no possible students, add all students to studentList
        this.studentList = [...data];
      }

      this.endOfFile = false;
      this.index = 0;
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  }

  async placementStudentList(placement: PlacementDTO){
    await this.router.navigate(['employer/placement-student-list'], {
      queryParams: { data: JSON.stringify(placement) }
    });
  }

  @ViewChild('noOption') noOption!: ElementRef;
  @ViewChild('yesOption') yesOption!: ElementRef;
  @ViewChild('profileCard') profileCard!: ElementRef;

  // Use these methods with (mouseenter) and (mouseleave) in template
  onNoOptionEnter() {
    this.profileCard.nativeElement.style.background = 'linear-gradient(to bottom, #ffc5c5, #ffffff 50%)';
  }

  onNoOptionLeave() {
    this.profileCard.nativeElement.style.background = 'linear-gradient(to bottom, #f1f8ff, #ffffff 20%)';
  }

  onYesOptionEnter() {
    this.profileCard.nativeElement.style.background = 'linear-gradient(to bottom, #c5ffc5, #ffffff 50%)';
  }

  onYesOptionLeave() {
    this.profileCard.nativeElement.style.background = 'linear-gradient(to bottom, #f1f8ff, #ffffff 20%)';
  }

}



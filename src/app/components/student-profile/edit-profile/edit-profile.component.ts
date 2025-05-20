import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {ProfileDTO, TechnicalSkill} from '../../../DTOs/ProfileDTO';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConnectionService} from '../../../services/connection/connection.service';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})

export class EditProfileComponent implements OnInit{
  public skillClass: { skill: string, id: number, class : string }[] = [];
  public selectedSkills: { skill: string, id: number, class : string }[] = [];
  profile$: BehaviorSubject<ProfileDTO> = new BehaviorSubject<ProfileDTO>(new ProfileDTO());

  formGroup = new FormGroup({
    firstName: new FormControl('', [ Validators.minLength(3), Validators.maxLength(20)]),
    lastName: new FormControl('', [ Validators.minLength(3), Validators.maxLength(20)]),
    Bio: new FormControl('', [ Validators.maxLength(255)]),
    LinkedIn: new FormControl('', [ Validators.minLength(3), Validators.maxLength(255)]),
    GitHub: new FormControl('', [ Validators.minLength(3), Validators.maxLength(255)]),
    Skills: new FormControl<string[]>([])
  });

  constructor(private connection : ConnectionService,
              protected profile : ProfileService,
              private router : Router) { }

  async ngOnInit() {
    this.initSkillList();
    const loginData = await this.connection.getProfile();
    console.log(loginData);
    this.profile$ = new BehaviorSubject<ProfileDTO>(loginData as ProfileDTO);
  }

  public initSkillList(){
    let index = 0;
    Object.entries(TechnicalSkill).forEach(([key]) => {
      this.skillClass.push({ skill: key, id: index , class : "greyBubbles"});
      index++;
    });
  }

  public selectSkill(skillId: number){
    if(this.skillClass[skillId].class === "greyBubbles"){
      if(this.selectedSkills.length >= 5){
        return;
      }else{
        this.skillClass[skillId].class = "greyBubbles bubbleSelected";
        this.selectedSkills.push(this.skillClass[skillId]);
      }

    }else{
      this.skillClass[skillId].class = "greyBubbles";
      this.selectedSkills = this.selectedSkills.filter(skill => skill.id !== skillId);
    }
  }

  public async updateProfile(){
    if(this.formGroup.invalid){
      console.log('invalid');
      return;
    }else{
      this.selectedSkills.forEach(skill => {
        this.formGroup.get('Skills')?.setValue(this.selectedSkills.map(skill => skill.skill));
      })
      const data = JSON.stringify({
        profileId: this.profile$.value.profileId,
        bio: this.formGroup.get('Bio')?.value,
        linkOne: this.formGroup.get('LinkedIn')?.value,
        linkTwo: this.formGroup.get('GitHub')?.value,
        skills: this.selectedSkills.map(skill => skill.skill),
        placements : [],
        companyName: '',
        firstName: this.formGroup.get('firstName')?.value,
        lastName: this.formGroup.get('lastName')?.value,
        file: null
      })
      console.log(data)
      await this.connection.postConnection(data, 'generic/edit').then(response => {
        console.log(response);
        const updateProfile = response as ProfileDTO;
        this.profile.profile = new BehaviorSubject<ProfileDTO>(updateProfile as ProfileDTO);
        this.profile$.next(updateProfile as ProfileDTO);
        this.router.navigate(['student']);
      })
    }
  }
}

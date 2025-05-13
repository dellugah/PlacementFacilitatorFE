import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConnectionService} from '../../../services/connection/connection.service';
import {Router, RouterLink} from '@angular/router';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {TechnicalSkill} from '../../../DTOs/ProfileDTO';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-add-placement',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgForOf
  ],
  templateUrl: './add-placement.component.html',
  styleUrl: './add-placement.component.css'
})
export class AddPlacementComponent implements OnInit {

  formGroup = new FormGroup({
    positionName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    positionBio: new FormControl(),
    positionsAvailable: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    requiredSkills: new FormControl<string[]>([])
  });

  constructor(private connection : ConnectionService,
              private router : Router,
              protected profile : ProfileService) { }

  ngOnInit(): void {
    this.initSkillList();
  }

  public skillClass: { skill: string, id: number, class : string }[] = [];

  public async createPlacement(){
    if(this.formGroup.invalid){
      console.log('invalid');
      return;
    }else{

      this.skillClass.forEach(skill => {
        if(skill.class === "greyBubbles bubbleSelected"){
          const requiredSkills = this.formGroup.get('requiredSkills');
        }
      })

      const selectedSkills = this.getSelectedSkills();
      this.formGroup.get('requiredSkills')?.setValue(selectedSkills);

      const data = JSON.stringify({
        placementId: null,
        positionName: this.formGroup.get('positionName')?.value,
        positionBio: this.formGroup.get('positionBio')?.value,
        positionsAvailable: this.formGroup.get('positionsAvailable')?.value,
        requiredSkills: this.formGroup.get('requiredSkills')?.value,
        visible: true
      });

      console.log(data);

      //TODO EXPAND LOGIC AND SECURITY LATER
      await this.connection.postConnection(data, 'employer/create-placement')
      await this.router.navigate(['employer/placements']);
    }
  }

  public initSkillList(){
    let index = 0;
    Object.entries(TechnicalSkill).forEach(([key]) => {
      console.log(`Key: ${key}`);
      this.skillClass.push({ skill: key, id: index , class : "greyBubbles"});
      index++;
    });

    console.log(this.skillClass);
  }

  public selectSkill(skillId: number){
    if(this.skillClass[skillId].class === "greyBubbles"){
      this.skillClass[skillId].class = "greyBubbles bubbleSelected";
    }else{
      this.skillClass[skillId].class = "greyBubbles";
    }
  }

  private getSelectedSkills(): string[] {
    return this.skillClass
      .filter(skill => skill.class.includes('bubbleSelected'))
      .map(skill => skill.skill);
  }

}

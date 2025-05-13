import {Component, OnInit} from '@angular/core';
import {PlacementDTO, TechnicalSkill} from '../../../DTOs/ProfileDTO';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';
import {ProfileService} from '../../../services/profileServices/profile.service';
import {ConnectionService} from '../../../services/connection/connection.service';

@Component({
  selector: 'app-edit-placement',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './edit-placement.component.html',
  styleUrl: './edit-placement.component.css'
})
export class EditPlacementComponent implements OnInit{

  placement: PlacementDTO = new PlacementDTO();
  formGroup = new FormGroup({
    positionName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    positionDescription: new FormControl(),
    positionsAvailable: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    requiredSkills: new FormControl<string[]>([])
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              protected connection : ConnectionService,
              protected profile : ProfileService) {}

  ngOnInit(){
    this.initSkillList();
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.placement = JSON.parse(params['data']) as PlacementDTO;
      }
    });

    this.formGroup.patchValue({
      positionName: this.placement.positionName,
      positionDescription: this.placement.positionDescription,
      positionsAvailable: this.placement.positionsAvailable + '',
      requiredSkills: this.placement.requiredSkills
    });


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
        placementId: this.placement.placementId,
        positionName: this.formGroup.get('positionName')?.value,
        positionDescription: this.formGroup.get('positionDescription')?.value,
        positionsAvailable: this.formGroup.get('positionsAvailable')?.value,
        requiredSkills: this.formGroup.get('requiredSkills')?.value,
        visible: true
      });

      console.log(data);

      //TODO EXPAND LOGIC AND SECURITY LATER
      const response = await this.connection.postConnection(data, 'employer/edit-placement')
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

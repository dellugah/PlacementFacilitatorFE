import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ProfileService} from '../../../../services/profileServices/profile.service';

@Component({
  selector: 'app-student-profile-info',
    imports: [
        NgForOf,
        NgOptimizedImage
    ],
  templateUrl: './student-profile-info.component.html',
  styleUrl: './student-profile-info.component.css'
})
export class StudentProfileInfoComponent {
  constructor(protected profile : ProfileService,) { }

}

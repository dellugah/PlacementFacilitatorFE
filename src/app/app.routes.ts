import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmployerProfileComponent } from './components/employer/employer-profile/employer-profile.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import { StudentProfileComponent } from './components/student-profile/student-profile/student-profile.component';
import { PlacementsComponent } from './components/employer/placements/placements.component';
import { AddPlacementComponent } from './components/employer/add-placement/add-placement.component';
import {EditPlacementComponent} from './components/employer/edit-placement/edit-placement.component';
import {MatchStudentComponent} from './components/employer/match-student/match-student.component';
import {
  PlacementStudentListComponent
} from './components/employer/placement-student-list/placement-student-list.component';
import {EditProfileComponent} from './components/student-profile/edit-profile/edit-profile.component';
import {PlacementOffersComponent} from './components/student-profile/placement-offers/placement-offers.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'employer',
    component: EmployerProfileComponent,
    children: [
      { path: 'placements', component: PlacementsComponent },
      { path: 'add', component: AddPlacementComponent},
      { path: 'update-placement', component: EditPlacementComponent},
      { path: 'matching', component : MatchStudentComponent},
      { path: 'placement-student-list', component: PlacementStudentListComponent},
    ]
  },
  {
    path: 'register',
    component: SignInComponent
  },
  {
    path: 'student',
    component: StudentProfileComponent,
    children: [
      { path: 'edit', component: EditProfileComponent },
      {path: 'offers', component: PlacementOffersComponent},
    ]
  }
];

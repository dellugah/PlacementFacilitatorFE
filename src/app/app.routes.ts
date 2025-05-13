import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmployerProfileComponent } from './components/employer/employer-profile/employer-profile.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import { StudentProfileComponent } from './components/student-profile/student-profile/student-profile.component';
import { PlacementsComponent } from './components/employer/placements/placements.component';
import { AddPlacementComponent } from './components/employer/add-placement/add-placement.component';
import {EditPlacementComponent} from './components/employer/edit-placement/edit-placement.component';


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
    ]
  },
  {
    path: 'register',
    component: SignInComponent
  },
  {
    path: 'student',
    component: StudentProfileComponent
  }
];

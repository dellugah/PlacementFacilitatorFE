import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmployerProfileComponent } from './components/employer/employer-profile/employer-profile.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import { StudentProfileComponent } from './components/student-profile/student-profile/student-profile.component';
import { PlacementsComponent } from './components/employer/placements/placements.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'employer',
    component: EmployerProfileComponent,
    children: [
      { path: 'placements', component: PlacementsComponent }
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

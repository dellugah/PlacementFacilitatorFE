import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmployerProfileComponent } from './components/employer/employer-profile/employer-profile.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'employer-profile',
    component: EmployerProfileComponent
  }
];

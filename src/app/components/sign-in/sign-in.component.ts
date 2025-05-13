import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ConnectionService} from '../../services/connection/connection.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  standalone: true,
  styleUrl: './sign-in.component.css'
})
export class SignInComponent{

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', [Validators.maxLength(10)]),
    lastName: new FormControl('', [Validators.maxLength(10)]),
    companyName: new FormControl('', [Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required])
  })

  constructor(protected connection : ConnectionService,
              private router : Router) {
  }

  async register(){

    if(this.loginForm.invalid){
      //TODO: IMPLEMENT BETTER ERROR HANDLING
      console.log('invalid');
      return;
    }else{

      const data = JSON.stringify({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        firstName: this.loginForm.get('firstName')?.value,
        lastName: this.loginForm.get('lastName')?.value,
        companyName: this.loginForm.get('companyName')?.value,
        email: this.loginForm.get('email')?.value,
        accountType: this.loginForm.get('accountType')?.value
      })

      const session = await this.connection.postConnection(data, 'auth/signup') as { token: string; homePage: string; expiresIn: number };
      console.log(session);
      this.connection.setToken(session.token);
      this.connection.setExpiresIn(session.expiresIn);
      this.connection.setHomePage(session.homePage);

      await this.router.navigate([this.connection.getHomePage()]);
    }
  }
}

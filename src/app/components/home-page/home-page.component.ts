import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
  selector: 'app-home-page',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router : Router,
              private connection : ConnectionService) {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  async login() {
      let data = JSON.stringify({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      })
      const session = await this.connection.postConnection(data, 'auth/login') as { token: string; homePage: string; expiresIn: number }
      console.log(session);
      this.connection.setToken(session.token);
      this.connection.setExpiresIn(session.expiresIn);
      this.connection.setHomePage(session.homePage);
      console.log(this.connection.getHomePage());

      await this.router.navigate([this.connection.getHomePage()]);
  }
}

import {Component, OnInit} from '@angular/core';
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
export class HomePageComponent implements OnInit{
  constructor(private router : Router,
              protected connection : ConnectionService) {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit(){
    this.profileStyle();
  }
  async login() {

    if (this.loginForm.invalid){
      return;
    }
    let data = JSON.stringify({
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    })
    //TODO: CHANGE TOKEN HANDLING SO IT IS NOT HANDLED ON THE CLIENT SIDE
    try{
      let session = await this.connection.postConnection(data, 'auth/login') as {
        token: string;
        homePage: string;
        expiresIn: number
      }
      this.connection.setToken(session.token);
      this.connection.setExpiresIn(session.expiresIn);
      this.connection.setHomePage(session.homePage);
      await this.router.navigate([this.connection.getHomePage()]);

    }catch(e){
      console.log(e);
    }
  }

  private profileStyle(){
    const mainContainer = document.querySelector('.mainContainer') as HTMLElement;
    mainContainer.style.background = '#ffffff';
  }
}

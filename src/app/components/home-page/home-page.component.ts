import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
/**
 * Component representing the home page login form.
 * Handles user authentication and form validation.
 */
export class HomePageComponent implements OnInit{
  constructor(private router : Router,
              protected connection : ConnectionService) {
  }

  /** Background color for invalid input fields */
  redText = '#ffe0e0';
  /** Background color for valid input fields */
  blueText = '#f6f9ff';

  /** Reference to username input element */
  @ViewChild('username') styleUsername!: ElementRef;
  /** Reference to password input element */
  @ViewChild('password') stylePassword!: ElementRef;

  /** Validation message for username field */
  userNameMessage = "";
  /** Validation message for password field */
  passwordMessage = "";

  /** Information message displayed to user */
  infoMessage = "";

  /** Form group for login form controls */
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit(){
    this.profileStyle();
  }
  /**
   * Handles the login form submission.
   * Validates form inputs and attempts to authenticate user.
   */
  async login() {

    if (this.loginForm.invalid){
      if (this.loginForm.get('username')?.invalid) {
        this.userNameMessage = "*";
        this.styleUsername.nativeElement.style.backgroundColor = this.redText;
      } else {
        this.userNameMessage = "";
        this.styleUsername.nativeElement.style.backgroundColor = this.blueText;
      }

      if (this.loginForm.get('password')?.invalid) {
        this.passwordMessage = "*";
        this.stylePassword.nativeElement.style.backgroundColor = this.redText;
      } else {
        this.passwordMessage = "";
        this.stylePassword.nativeElement.style.backgroundColor = this.blueText;
      }

      return;
    }
    else {

    }

    try{
      let data = JSON.stringify({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      })
      let session = await this.connection.postConnection(data, 'auth/login') as {
        token: string;
        homePage: string;
        expiresIn: number
      }

      this.connection.setToken(session.token);
      this.connection.setExpiresIn(session.expiresIn);
      this.connection.setHomePage(session.homePage);
      await this.router.navigate([this.connection.getHomePage()]);

      this.infoMessage = "";

    }catch(e){
      this.infoMessage = "Invalid username or password";
      console.log(e);
    }
  }

  /**
   * Sets the background style for the main container.
   * @private
   */
  private profileStyle(){
    const mainContainer = document.querySelector('.mainContainer') as HTMLElement;
    mainContainer.style.background = '#ffffff';
  }
}

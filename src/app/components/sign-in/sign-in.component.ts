import {Component, ElementRef, ViewChild} from '@angular/core';
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
/**
 * Component responsible for handling user sign-in/registration functionality.
 * Manages form validation and user registration process.
 */
export class SignInComponent{

  /**
   * Form group containing user registration fields with validation rules
   */
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', [Validators.maxLength(10),
      Validators.minLength(3), Validators.required]),
    lastName: new FormControl('', [Validators.maxLength(10),
      Validators.minLength(3), Validators.required]),
    companyName: new FormControl('', [Validators.maxLength(15),
      Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[^@]*@[^@]*\.com/i)]),
    accountType: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required]),
  })

  /**
   * References to form input elements for styling purposes
   */
  @ViewChild('accountType') styleAccountType!: ElementRef;
  @ViewChild('nationality') styleNationality!: ElementRef;
  @ViewChild('email') styleEmail!: ElementRef;
  @ViewChild('companyName') styleCompanyName!: ElementRef;
  @ViewChild('firstName') styleFirstName!: ElementRef;
  @ViewChild('lastName') styleLastName!: ElementRef;
  @ViewChild('username') styleUsername!: ElementRef;
  @ViewChild('password') StylePassword!: ElementRef;

  /**
   * Color constants for form validation feedback
   */
  redText = '#ffe0e0';
  blueText = '#f6f9ff';

  /**
   * Validation message strings for form fields
   */
  userNameMessage = "";
  passwordMessage = "";
  companyNameMessage = "";
  emailMessage = "";
  firstNameMessage = "";
  lastNameMessage = "";
  nationalityMessage = "";

  /**
   * Initializes the component with required services
   * @param connection Service for handling API connections
   * @param router Angular router for navigation
   */
  constructor(protected connection : ConnectionService,
              private router : Router) {
  }

  /**
   * Handles the user registration process
   * Validates form inputs and submits data to the server
   * Updates UI with validation feedback
   * Navigates to appropriate page on successful registration
   */
  async register(){
    if (this.loginForm.get('accountType')?.value === 'EMPLOYER') {
      this.loginForm.get('nationality')?.setValue('CA');
      this.loginForm.get('firstName')?.setValue('noName');
      this.loginForm.get('lastName')?.setValue('noName');
    }
    if (this.loginForm.get('accountType')?.value === 'STUDENT') {
      this.loginForm.get('companyName')?.setValue('noComp');
    }
    if(this.loginForm.invalid){
      //TODO: IMPLEMENT BETTER ERROR HANDLING

      if (this.loginForm.get('nationality')?.invalid && this.styleNationality != undefined) {
        this.nationalityMessage = "*";
        this.styleNationality.nativeElement.style.backgroundColor = this.redText;
      } else{
        if (this.styleNationality != undefined){
          this.nationalityMessage = "";
          this.styleNationality.nativeElement.style.backgroundColor = this.blueText;
        }
      }

      if (this.loginForm.get('email')?.errors?.['pattern']) {
        this.emailMessage = '* Invalid e-mail';
      }
      else if (this.loginForm.get('email')?.invalid) {
        this.emailMessage = "*";
        this.styleEmail.nativeElement.style.backgroundColor = this.redText;
      } else{
        this.emailMessage = "";
        this.styleEmail.nativeElement.style.backgroundColor = this.blueText;
      }

      if (this.loginForm.get('companyName')?.invalid && this.styleCompanyName != undefined) {
        this.companyNameMessage = "*";
        this.styleCompanyName.nativeElement.style.backgroundColor = this.redText;
      } else {
        if (this.styleCompanyName != undefined){
          this.companyNameMessage = "";
          this.styleCompanyName.nativeElement.style.backgroundColor = this.blueText;
        }
      }
      if (this.loginForm.get('firstName')?.invalid && this.styleFirstName != undefined) {
        this.firstNameMessage = "*";
        this.styleFirstName.nativeElement.style.backgroundColor = this.redText;
      } else {
        if (this.styleFirstName != undefined){
          console.log('name valid');
          this.firstNameMessage = '';
          this.styleFirstName.nativeElement.style.backgroundColor = this.blueText;
        }
      }

      if (this.loginForm.get('lastName')?.invalid && this.styleLastName != undefined) {
        this.lastNameMessage = "*";
        this.styleLastName.nativeElement.style.backgroundColor = this.redText;
      } else {
        if (this.styleLastName != undefined){
          this.lastNameMessage = "";
          this.styleLastName.nativeElement.style.backgroundColor = this.blueText;
        }
      }

      if (this.loginForm.get('username')?.invalid) {
        this.userNameMessage = "*";
        this.styleUsername.nativeElement.style.backgroundColor = this.redText;
      } else {
        this.userNameMessage = "";
        this.styleUsername.nativeElement.style.backgroundColor = this.blueText;
      }

      if (this.loginForm.get('password')?.invalid) {
        this.passwordMessage = "*";
        this.StylePassword.nativeElement.style.backgroundColor = this.redText;
      } else {
        this.passwordMessage = "";
        this.StylePassword.nativeElement.style.backgroundColor = this.blueText;
      }
      console.log('invalid');
      return;
    }else{

      const data = JSON.stringify({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        firstName: this.loginForm.get('firstName')?.value,
        lastName: this.loginForm.get('lastName')?.value,
        domestic: (() => {
            let nationality = this.loginForm.get('nationality')?.value;
            let resident: boolean = false;
            if (nationality === 'CA') {
              resident = true;
          }
          return resident;
        })(),
        companyName: this.loginForm.get('companyName')?.value,
        email: this.loginForm.get('email')?.value,
        accountType: this.loginForm.get('accountType')?.value
      })
      console.log(data);

      const session = await this.connection.postConnection(data, 'auth/signup') as
        { token: string; homePage: string; expiresIn: number };
      this.connection.setToken(session.token);
      this.connection.setExpiresIn(session.expiresIn);
      this.connection.setHomePage(session.homePage);
      console.log(this.connection.getHomePage());

      await this.router.navigate([this.connection.getHomePage()]);
    }
  }
}

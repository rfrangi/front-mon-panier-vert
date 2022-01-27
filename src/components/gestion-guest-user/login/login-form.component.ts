import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthUserService} from '../../../services/auth-user.service';
import {Router} from '@angular/router';

@Component({
  selector:  'app-login-form',
  templateUrl: `./login-form.component.html`,
  styleUrls: ['./login-form.component.scss']

})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;
  error!: string;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authUserService: AuthUserService,
              private router: Router) {
  }

  logout(): void {
    this.authUserService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
  /*  if (this.authUserService.getUser() && this.authUserService.getToken()){
      this.router.navigate(['utilisateur', 'mon-compte']);
    }*/
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  submit(value: any): void {
    if (this.loginForm.valid) {
      this.authUserService.login(value).subscribe(
        () => {
          this.isLoginFailed = false;
          this.router.navigate(['home']);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else {
      console.log('login invalid');
    }
  }
}

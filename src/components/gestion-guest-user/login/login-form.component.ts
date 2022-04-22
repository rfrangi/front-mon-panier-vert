import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthUserService} from '../../../services/auth-user.service';

@Component({
  selector:  'app-login-form',
  templateUrl: `./login-form.component.html`,
  styleUrls: ['./login-form.component.scss']

})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;

  form: any = {};
  errorMessage = '';

  constructor(private authUserService: AuthUserService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.onParamsChange(params);
    });
  }

  private onParamsChange(params: any): any {
    this.loginForm = new FormGroup({
      email: new FormControl(params.email ? params.email : '', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      memoryMe: new FormControl(true),
    });
  }

  public logout(): void {
    this.authUserService.signOut();
    this.router.navigate(['home']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public submit(value: any): void {
    if (this.loginForm.valid) {
      this.authUserService.login(value).subscribe({
        next: () =>{
          this.router.navigate(['home']);
        },
        error: err => {
          if (err?.error?.code === 'DISABLED_ACCOUNT') {
            this.errorMessage = `Votre compte a été désactivé. Pour l'activer, veuillez prendre contact avec un administrateur.`;
          } else if(err?.error?.code === 'LOCK_ACCOUNT') {
            this.errorMessage = `Votre compte est bloqué suite à trop de tentatives de connexion en échec. Pour l'activer, veuillez changer de mot de passe.`;
          } else {
            this.errorMessage = 'Les informations saisies ne correspondent pas.';
          }
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthUserService} from "../../../services/auth-user.service";
import {ToastService} from "../../../services/toast.service";
import {User} from "../../../models/user.model";

@Component({
  selector:  'app-reset-password',
  templateUrl: `./reset-password.component.html`,
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public passwordForm!: FormGroup;
  public token!: string;
  public user!: User;
  public hide: boolean = true;
  public hide2: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authUserService: AuthUserService,
              private toast: ToastService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.onParamsChange(params);
    });

    this.initForm();
  }

  public initForm(): void {
     this.passwordForm = new FormGroup({
      password: new FormControl( { value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      passwordConfirm: new FormControl({
        value:'', disabled: false
      }, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])
    });
  }

  private onParamsChange(params: any): any {
    if (params.token) {
      this.token = params.token;
      this.authUserService.getUserByToken(this.token).subscribe({
        next: (user: User) => {
          this.user = user
        },
        error: (err: any) => console.error(err)
      })
    }
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public submit(value: any): void {
    if(this.passwordForm.invalid){
      this.toast.warning('Votre formulaire comporte des erreurs.')
      return;
    }
    if(this.passwordForm.value.passwordConfirm !== this.passwordForm.value.password) {
      this.toast.warning('Les mots de passe saisis ne correspondent pas.')
      return;
    }
    if (this.passwordForm.valid) {
      const body = {
        token: this.token,
        password: this.passwordForm.value.password,
        id: this.user.id
      }
      this.authUserService.updatePassword(body).subscribe({
        next: () => {
          this.toast.success('Votre mot de passe est enregistré.');
          this.router.navigate(['auth', 'login'],{ queryParams: {email: this.user.email }});
        },
        error: (err: any) => this.toast.genericError(err)
      });
    }
  }
}

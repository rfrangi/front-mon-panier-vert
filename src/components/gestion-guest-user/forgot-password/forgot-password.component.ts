import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector:  'app-forgot-password',
  templateUrl: `./forgot-password.component.html`,
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public passwordForm!: FormGroup;
  public isEmailSend: boolean = false;
  public emailSaisie!: string;

  constructor(private authUserService: AuthUserService) {}

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  public submit(value: any): void {
    if (this.passwordForm.valid) {
      this.emailSaisie = value.email;
      this.authUserService.sendEmailResetPassword(this.emailSaisie).subscribe({
        next: () => this.isEmailSend = true
      });
    }
  }
}

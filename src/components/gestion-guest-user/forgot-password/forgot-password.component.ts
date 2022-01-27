import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector:  'app-forgot-password',
  templateUrl: `./forgot-password.component.html`,
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  submit(value: any): void {
    console.log(this.passwordForm, value);
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthUserService} from '../../../services/auth-user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LIST_PAYS, Pays} from '../../../models/pays.model';
import {Civilite, LIST_CIVILITE} from "../../../models/civilite.model";

@Component({
  selector:  'app-signup',
  templateUrl: `./signup.component.html`,
  styleUrls: ['./signup.component.scss']

})
export class SignupComponent implements OnInit {

  public hide = true;
  public step!: number;

  public identifiantForm!: FormGroup;
  public infoPersoForm!: FormGroup;
  public adresseForm!: FormGroup;

  public listPays: Array<Pays> = Object.values(LIST_PAYS);
  public listCivilite: Array<Civilite> = Object.values(LIST_CIVILITE);

  constructor(private authService: AuthUserService) { }

  ngOnInit(): void  {
    this.step = 1;

    this.identifiantForm = new FormGroup({
      email: new FormControl('test@test.com', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      password: new FormControl('oijoijoijoguyiytfuyfy', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])
    });

    this.infoPersoForm = new FormGroup({
      civilite: new FormControl('MONSIEUR', [
        Validators.required,
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });

    this.adresseForm = new FormGroup({
      adresse: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      complement: new FormControl('', [
        Validators.maxLength(100)
      ]),
      codePostal: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]),
      ville: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]),
      pays: new FormControl(LIST_PAYS.FRANCE, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl('', [
        Validators.maxLength(200)
      ])
    });
  }

  submitStep1(): void {
    if (this.identifiantForm.valid) {
      this.step++;
    }
  }

  submitStep2(): void {
    if (this.infoPersoForm.valid) {
      this.step++;
    }
  }

  submitStep3(): void {
    if (this.adresseForm.valid) {
      const data = {
        adresse: {}
      };
      Object.assign(data, this.identifiantForm.value);
      Object.assign(data, this.infoPersoForm.value);
      Object.assign(data.adresse, this.adresseForm.value);
    }
  }

  changeStep(stepForm: number): void {
    if (this.step >= stepForm) {
      this.step = stepForm;
    }
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { LIST_PAYS, Pays } from "../../../../models/pays.model";
import {Adresse } from "../../../../models/adresse.model";

@Component({
  selector:  'app-adresse-form',
  templateUrl: `./adresse-form.component.html`,
  styleUrls: ['./adresse-form.component.scss']
})
export class AdresseFormComponent implements OnInit {

  @Input() public adresse: Adresse = new Adresse();
  @Input() public form!: FormGroup;
  @Input() public disabled: boolean = false;
  public adresseform!: FormGroup;
  public listPays: Array<Pays> = Object.values(LIST_PAYS);

  constructor() {}

  public ngOnInit(): void {
    this.initForm(this.disabled);
  }

  public initForm(disabled: boolean = true): void {
    this.disabled = disabled;
    this.adresseform = new FormGroup({
      adresse: new FormControl({value: this.adresse.adresse, disabled: disabled }, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      complement: new FormControl({value: this.adresse.complement, disabled: disabled }, [
        Validators.maxLength(100)
      ]),
      codePostal: new FormControl({value: this.adresse.codePostal, disabled: disabled }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]),
      ville: new FormControl({value: this.adresse.ville, disabled: disabled }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]),
      pays: new FormControl({value: this.adresse.pays.code, disabled: disabled }, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl({value: this.adresse.description, disabled: disabled })
    });
    this.form.addControl('adresse', this.adresseform);
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}


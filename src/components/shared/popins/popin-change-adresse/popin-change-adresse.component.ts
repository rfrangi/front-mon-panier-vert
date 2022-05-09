import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Site} from "../../../../models/site.model";
import {Adresse} from "../../../../models/adresse.model";
import {AdresseFormComponent} from "../../adresse/adresse-form/adresse-form.component";
import { FormGroup } from '@angular/forms';

export interface DialogData { adresse: Adresse; title: string; }

@Component({
  selector:  'app-popin-change-adresse',
  templateUrl: `./popin-change-adresse.component.html`,
  styleUrls: ['./popin-change-adresse.component.scss']
})
export class PopinChangeAdresseComponent implements OnInit {

  public adresseForm!: FormGroup;

  @ViewChild('adresseFormComponent')
  public adresseFormComponent!: AdresseFormComponent;

  constructor(public dialogRef: MatDialogRef<PopinChangeAdresseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.adresseForm = new FormGroup({});
  }

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }

  public submit(): void {
    if (this.adresseFormComponent.adresseform.invalid) {
      //this.toast.warning('Votre formulaire comporte des erreurs.')
      return;
    }
    let adr: Adresse = new Adresse(this.adresseFormComponent.adresseform.value);
    this.dialogRef.close({ result: true, adresse: adr });
  }
}

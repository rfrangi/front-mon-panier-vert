import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {LIST_TYPE_RETRAIT, TypeRetrait} from "../../../../models/type-retrait.model";
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {Site} from "../../../../models/site.model";

export interface DialogData {
  typeSelected: TypeRetrait,
  site: Site
}

@Component({
  selector:  'app-popin-select-type-retrait',
  templateUrl: `./popin-select-type-retrait.component.html`,
  styleUrls: ['./popin-select-type-retrait.component.scss']

})
export class PopinSelectTypeRetraitComponent {

  public listTypeRetrait: Array<TypeRetrait> = Object.values(LIST_TYPE_RETRAIT);
  public typeRetraitForm!: FormGroup;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<PopinSelectTypeRetraitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    this.typeRetraitForm = new FormGroup({
      type: new FormControl({value: this.data.typeSelected || LIST_TYPE_RETRAIT.LIVRAISON, disabled: false}, [ Validators.required ]),
    });
  }

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }

  public submit(): void {
    this.dialogRef.close({
      result: true,
      modeSelected: this.typeRetraitForm.value.type
    });
  }
}


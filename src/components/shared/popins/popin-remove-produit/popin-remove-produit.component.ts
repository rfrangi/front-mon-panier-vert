import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {ToastService} from "../../../../services/toast.service";
import {Produit} from "../../../../models/produit.model";

export interface DialogData {
  produit: Produit
}
@Component({
  selector:  'app-popin-remove-produit',
  templateUrl: `./popin-remove-produit.component.html`,
  styleUrls: ['./popin-remove-produit.component.scss']

})
export class PopinRemoveProduitComponent {

  constructor(public dialog: MatDialog,
              private toast: ToastService,
              public dialogRef: MatDialogRef<PopinRemoveProduitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }

  public submit(): void {
    this.dialogRef.close({
      result: true
    });
  }
}


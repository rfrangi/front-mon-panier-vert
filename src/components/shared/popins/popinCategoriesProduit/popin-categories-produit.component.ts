import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {ToastService} from "../../../../services/toast.service";
import {LIST_PRODUIT_CATEGORIE, ProduitCategorie} from "../../../../models/produit-categorie.model";
import {Site} from "../../../../models/site.model";
export interface DialogData {
  site: Site;
}
@Component({
  selector:  'app-popin-message-during',
  templateUrl: `./popin-categories-produit.component.html`,
  styleUrls: ['./popin-categories-produit.component.scss']

})
export class PopinCategoriesProduitComponent {


  public listCategorie: Array<ProduitCategorie> = Object.values(LIST_PRODUIT_CATEGORIE);

  constructor(public dialog: MatDialog,
              private toast: ToastService,
              public dialogRef: MatDialogRef<PopinCategoriesProduitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  cancel(): void {
    this.dialogRef.close({ result: false });
  }

  submit(): void {
    this.dialogRef.close({
      result: true
    });
  }
}

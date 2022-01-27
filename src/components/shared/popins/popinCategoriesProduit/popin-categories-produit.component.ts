import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {finalize, tap} from "rxjs/operators";
import {ToastService} from "../../../../services/toast.service";
import {DialogData} from "../popinMessageDuring/popin-message-during.component";
import {LIST_PRODUIT_CATEGORIE, ProduitCategorie} from "../../../../models/produit-categorie.model";

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

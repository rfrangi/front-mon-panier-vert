import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup,  Validators} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {Compagnie} from "../../../../models/compagnie.model";
import {ProduitService} from "../../../../services/produit.service";
import { Produit } from 'src/models/produit.model';
import {LIST_PRODUIT_CATEGORIE, ProduitCategorie} from "../../../../models/produit-categorie.model";

export interface DialogData {
  compagnie: Compagnie;
  produit: Produit;
}


@Component({
  selector:  'app-popin-produit',
  templateUrl: `./popin-produit.component.html`,
  styleUrls: ['./popin-produit.component.scss']

})
export class PopinProduitComponent  implements OnInit {
  public produitForm!: FormGroup;
  public listCategorie: Array<ProduitCategorie> = Object.values(LIST_PRODUIT_CATEGORIE);

  constructor(public dialog: MatDialog,
              private toast: ToastService,
              public dialogRef: MatDialogRef<PopinProduitComponent>,
              private produitService: ProduitService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    console.log(this.data)
    this.produitForm = new FormGroup({
      name: new FormControl({value: this.data.produit.name ? this.data.produit.name : '', disabled: false}, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      quantite: new FormControl({value: this.data.produit.quantite || '', disabled: false}, [
        Validators.required
      ]),
      categorie: new FormControl({value: this.data.produit.categorie, disabled: false }, [
        Validators.required,
      ]),
      tarif: new FormControl({value:  this.data.produit.tarif ?  this.data.produit.tarif : '', disabled: false}, [
        Validators.required,
      ]),
      typeTarif: new FormControl({value: this.data.produit.typeTarif ? this.data.produit.typeTarif : '', disabled: false }, [
        Validators.required,
      ])
    });
  }

  cancel(): void {
    this.dialogRef.close({ result: false });
  }

  submit(): void {
    console.log(this.data)
    this.produitService.add(this.data.compagnie.id).subscribe({
      next: (result: any) => console.log(result)
    })
    this.dialogRef.close({
      result: true
    });
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

}

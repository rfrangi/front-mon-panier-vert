import { Component,  Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup,  Validators} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {ProduitService} from "../../../../services/produit.service";

import {Compagnie} from "../../../../models/compagnie.model";
import {LIST_CATEGORIES, LIST_SOUS_CATEGORIES, ProduitCategorie} from "../../../../models/produit-categorie.model";
import {Produit} from "../../../../models/produit.model";
import {LIST_TYPE_TARIF, TypeTarif} from "../../../../models/type-tarif.model";

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
  public listCategories: Array<ProduitCategorie> = Object.values(LIST_CATEGORIES);
  public listSSCategories: Array<ProduitCategorie> = Object.values(LIST_SOUS_CATEGORIES);
  public listTypeTarif: Array<TypeTarif> = Object.values(LIST_TYPE_TARIF);

  constructor(private toast: ToastService,
              public dialogRef: MatDialogRef<PopinProduitComponent>,
              private produitService: ProduitService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    this.produitForm = new FormGroup({
      name: new FormControl({value: this.data.produit.name ? this.data.produit.name : '', disabled: false}, [
        Validators.required, Validators.minLength(3), Validators.maxLength(100),
      ]),
      quantite: new FormControl({value: this.data.produit.quantite || '', disabled: false}, [Validators.required]),
      categorie: new FormControl({value: this.data.produit.categorie.code, disabled: false }, []),
      ssCategorie: new FormControl({value: this.data.produit.ssCategorie.code, disabled: false }, []),
      tarif: new FormControl({value:  this.data.produit.tarif ?  this.data.produit.tarif : '', disabled: false}, [Validators.required,]),
      typeTarif: new FormControl({value: this.data.produit.typeTarif.code, disabled: false }, []),
      description: new FormControl({value: this.data.produit.description ? this.data.produit.description : '', disabled: false }, []),
      poidsMin: new FormControl({value: this.data.produit.poidsMin ? this.data.produit.poidsMin : '', disabled: false }, []),
      poidsMax: new FormControl({value: this.data.produit.poidsMax ? this.data.produit.poidsMax : '', disabled: false }, []),
      nbPieceLot: new FormControl({value: this.data.produit.nbPieceLot ? this.data.produit.nbPieceLot : 1, disabled: false }, []),
    });

    this.produitForm?.get('categorie')?.valueChanges.subscribe((val => {
      this.listSSCategories = LIST_CATEGORIES[val].ssCategories;
      if (this.listSSCategories.length > 0) {
        this.produitForm?.get("ssCategorie")?.setValue(this.listSSCategories[0].code, {emitEvent: false});
      }
    }));
  }

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }

  public submit(): void {
    const produit = this.produitForm.value;
    produit.idCompagnie = this.data.compagnie.id;
    this.produitService.save(produit).subscribe({
      next: () => this.dialogRef.close({ result: true })
    })
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from "../../../services/user.service";
import {ToastService} from "../../../services/toast.service";
import {PopinService} from "../../../services/popin.service";

import {User} from "../../../models/user.model";
import {LIST_CATEGORIES, LIST_SOUS_CATEGORIES, ProduitCategorie} from "../../../models/produit-categorie.model";
import {LIST_TYPE_TARIF, TypeTarif} from "../../../models/type-tarif.model";
import {ProduitService} from "../../../services/produit.service";
import {DialogData} from "../../shared/popins/popin-produit/popin-produit.component";
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Compagnie } from 'src/models/compagnie.model';
import { Produit } from 'src/models/produit.model';
import {CompagnieService} from "../../../services/compagnie.service";
import {expand, forkJoin, merge, of, pluck, reduce, takeWhile } from 'rxjs';

@Component({
  selector:  'app-gestion-admin-details-produit',
  templateUrl: `./details-produit.component.html`,
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {

  public produitForm!: FormGroup;
  public listCategories: Array<ProduitCategorie> = Object.values(LIST_CATEGORIES);
  public listSSCategories: Array<ProduitCategorie> = Object.values(LIST_SOUS_CATEGORIES);
  public listTypeTarif: Array<TypeTarif> = Object.values(LIST_TYPE_TARIF);

  public produit!: Produit;
  public compagnie!: Compagnie;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private compagnieService: CompagnieService,
              private produitService: ProduitService) {

  }


  ngOnInit(): void {
    this.route.params.subscribe( paramMap => this.onParamsChange(paramMap));
  }

  private onParamsChange(params: any): any {
    console.log(params);
    if (params.id && params.idProduit) {
      forkJoin(this.compagnieService.getById(params.id), this.produitService.getById(params.idProduit)).subscribe(
        (result: any) => {
          this.compagnie = result[0];
          this.produit = result[1];
          console.log(this.compagnie, this.produit);
          this.initForm();
        },
        err => this.toast.genericError(err)
      );
    } else if (params.id && !params.idProduit) {
      this.compagnieService.getById(params.id).subscribe(
        (compagnie: Compagnie) => {
          this.compagnie = compagnie;
          this.produit = new Produit({ idCompagnie: this.compagnie.id });
          console.log(this.compagnie, this.produit);
          this.initForm();
        },
        err => this.toast.genericError(err)
      );
    }
  }

  public initForm(): void {
    this.produitForm = new FormGroup({
      name: new FormControl({value: this.produit.name ? this.produit.name : '', disabled: false}, [
        Validators.required, Validators.minLength(3), Validators.maxLength(100),
      ]),
      quantite: new FormControl({value: this.produit.quantite || '', disabled: false}, [Validators.required]),
      categorie: new FormControl({value: this.produit.categorie.code, disabled: false }, []),
      ssCategorie: new FormControl({value: this.produit.ssCategorie.code, disabled: false }, []),
      tarif: new FormControl({value:  this.produit.tarif ?  this.produit.tarif : '', disabled: false}, [Validators.required,]),
      typeTarif: new FormControl({value: this.produit.typeTarif.code, disabled: false }, []),
      description: new FormControl({value: this.produit.description ? this.produit.description : '', disabled: false }, []),
      poidsMin: new FormControl({value: this.produit.poidsMin ? this.produit.poidsMin : '', disabled: false }, []),
      poidsMax: new FormControl({value: this.produit.poidsMax ? this.produit.poidsMax : '', disabled: false }, []),
      nbPieceLot: new FormControl({value: this.produit.nbPieceLot ? this.produit.nbPieceLot : 1, disabled: false }, []),
    });

    this.produitForm?.get('categorie')?.valueChanges.subscribe((val => {
      console.log(val, LIST_CATEGORIES[val]);
      this.listSSCategories = LIST_CATEGORIES[val].ssCategories;
      if (this.listSSCategories.length > 0) {
        this.produitForm?.get("ssCategorie")?.setValue(this.listSSCategories[0].code, {emitEvent: false});
      }

      console.log(this.listSSCategories);
    }));
  }

  public submit(): void {
    const produit = this.produitForm.value;
    produit.idCompagnie = this.compagnie.id;
    this.produitService.save(produit).subscribe({
      next: () => { console.log('save produit')}
    })
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}


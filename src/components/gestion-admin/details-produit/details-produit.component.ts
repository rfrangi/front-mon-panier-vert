import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ToastService} from "../../../services/toast.service";

import {
  LIST_CATEGORIES,
  LIST_SOUS_CATEGORIES,
  ProduitCategorie,
  SousCategorie
} from "../../../models/produit-categorie.model";
import {LIST_TYPE_TARIF, TypeTarif} from "../../../models/type-tarif.model";
import {ProduitService} from "../../../services/produit.service";
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Compagnie } from 'src/models/compagnie.model';
import { Produit } from 'src/models/produit.model';
import {CompagnieService} from "../../../services/compagnie.service";
import { forkJoin } from 'rxjs';

@Component({
  selector:  'app-gestion-admin-details-produit',
  templateUrl: `./details-produit.component.html`,
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {

  public produitForm!: FormGroup;
  public listCategories!: Array<ProduitCategorie>;
  public listSSCategories!: Array<SousCategorie>;
  public listTypeTarif: Array<TypeTarif> = Object.values(LIST_TYPE_TARIF);

  public produit!: Produit;
  public compagnie!: Compagnie;
  private file!: File;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private router: Router,
              private compagnieService: CompagnieService,
              private produitService: ProduitService) {}

  ngOnInit(): void {
    this.route.params.subscribe( paramMap => this.onParamsChange(paramMap));
  }

  private onParamsChange(params: any): any {
    if (params.id && params.idProduit) {
      forkJoin(this.compagnieService.getById(params.id), this.produitService.getById(params.idProduit)).subscribe(
        (result: any) => {
          this.compagnie = result[0];
          this.listCategories = this.compagnie.categories && this.compagnie.categories.length > 0 ? this.compagnie.categories : Object.values(LIST_CATEGORIES);
          this.listSSCategories = this.listCategories.flatMap((cat: ProduitCategorie) => cat.ssCategories) || Object.values(LIST_SOUS_CATEGORIES);
          this.produit = result[1];
          this.initForm();
        },
        err => this.toast.genericError(err)
      );
    } else if (params.id && !params.idProduit) {
      this.compagnieService.getById(params.id).subscribe(
        (compagnie: Compagnie) => {
          this.compagnie = compagnie;
          this.listCategories = this.compagnie.categories && this.compagnie.categories.length > 0 ? this.compagnie.categories : Object.values(LIST_CATEGORIES);
          this.listSSCategories = this.listCategories[0].ssCategories || Object.values(LIST_SOUS_CATEGORIES);
          this.produit = new Produit({
            idCompagnie: this.compagnie.id,
            categorie: this.listCategories[0].code,
            ssCategorie: this.listCategories[0].ssCategories.map((cat : SousCategorie) => cat.code)[0]});
          this.initForm();
        },
        err => this.toast.genericError(err)
      );
    }
  }

  public initForm(): void {
    this.produitForm = new FormGroup({
      name: new FormControl({value: this.produit.name ? this.produit.name : '', disabled: false}, [
        Validators.required, Validators.minLength(3), Validators.maxLength(50),
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
      isBio: new FormControl({value: this.produit.isBio, disabled: false }, []),
      isPromo: new FormControl({value: this.produit.isPromo, disabled: false }, []),
    });

    this.produitForm?.get('categorie')?.valueChanges.subscribe((val => {
      this.listSSCategories = LIST_CATEGORIES[val].ssCategories;
      if (this.listSSCategories.length > 0) {
        this.produitForm?.get("ssCategorie")?.setValue(this.listSSCategories[0].code, {emitEvent: false});
      }
    }));
  }

  public changeQuantite(event: any): void {
    if (event.checked) {
      this.produitForm.controls['quantite'].disable();
      this.produitForm.controls['quantite'].patchValue(null);
    } else {
      this.produitForm.controls['quantite'].enable();
    }

  }

  public submit(): void {
    const produit = this.produitForm.value;
    produit.idCompagnie = this.compagnie.id;
    produit.id = this.produit.id;
    produit.img = this.produit.img;
    this.produitService.save(produit, true, this.file).subscribe({
      next: () => {
        this.toast.success('Le produit est enregistré.')
        this.goToUrl(['administration', 'compagnie', this.compagnie.id, 'produits'])
      }
    })
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public changeImg($event: any): void {
    this.file = $event;
  }

  goToUrl(urls: Array<string>): void {
    this.router.navigate(urls);
  }
}


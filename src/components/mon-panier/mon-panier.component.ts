import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProduitService} from "../../services/produit.service";
import {Produit} from "../../models/produit.model";
import {PanierService} from "../../services/panier.service";
import {Panier} from "../../models/panier.model";
import { Subscription } from 'rxjs';
import {
  PopinCategoriesProduitComponent
} from "../shared/popins/popin-categories-produit/popin-categories-produit.component";
import {PopinRemoveProduitComponent} from "../shared/popins/popin-remove-produit/popin-remove-produit.component";
import {PopinService} from "../../services/popin.service";
import {Compagnie} from "../../models/compagnie.model";
import {Site} from "../../models/site.model";
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector:  'app-home',
  templateUrl: `./mon-panier.component.html`,
  styleUrls: ['./mon-panier.component.scss']
})
export class MonPanierComponent implements OnInit, OnDestroy {

  public produits: Array<Produit> = [];
  public panier!: Panier;
  public panierSub$!: Subscription;

  isLinear = false;
  secondFormGroup!: FormGroup;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private popinService: PopinService,
              private panierService: PanierService,
              private _formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.panierSub$ = this.panierService.panierSubject.subscribe({
      next: (panier: Panier) => {
        this.panier = panier;
        this.produits = Array.from(this.panier.produits.values());
      }
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  public ngOnDestroy(): void {
    this.panierSub$.unsubscribe();
  }

  public getTotalPrixByProduit(produit: Produit): number {
    return produit.tarif * produit.quantiteCommande;
  }

  public addBasket(produit: Produit): void {
    this.panierService.updateProduit(produit);
  }

  public addQuantiteBasket(produit: Produit): void {
    const quantite = this.getQuantiteCommade(produit);
    this.panierService.updateProduit(produit, (quantite + 1));
  }

  public removeQuantiteBasket(produit: Produit): void {
    const quantite = this.getQuantiteCommade(produit);
    if ((quantite - 1) === 0) {
      this.showPopinRemoveProduit(produit);
    } else {
      this.panierService.updateProduit(produit, (quantite - 1));
    }
  }

  public getQuantiteCommade(produit: Produit): number {
    return this.produits.find((p: Produit) => p.id === produit.id)?.quantiteCommande || 0;
  }

  public getlabelPoids(produit: Produit): string {
    let result = '';
    if (produit.poidsMin && produit.poidsMax) {
      if (produit.poidsMin !== produit.poidsMax) {
        result = `${produit.poidsMin} à ${produit.poidsMax} g`;
      } else {
        result = `${produit.poidsMin} g`;
      }
    } else if (produit.poidsMin) {
      result = `${produit.poidsMin} g`;
    }
    return result;
  }

  public showPopinRemoveProduit(produit: Produit): void {
    this.popinService.openPopin(PopinRemoveProduitComponent, {
      data: {
        produit: produit
      }
    }).subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this.panierService.updateProduit(produit, 0);
      }
    });
  }
}

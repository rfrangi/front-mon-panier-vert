import { Component, OnInit, Input } from '@angular/core';

import {Produit} from "../../../models/produit.model";
import {PanierService} from "../../../services/panier.service";
import {Panier} from "../../../models/panier.model";

@Component({
  selector:  'app-list-produit',
  templateUrl: `./list-produit.component.html`,
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {

  public panier!: Panier;
  @Input() produits: Array<Produit> = [];
  public produitsCommande: Array<Produit> = [];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.panierSubject.subscribe({
      next: (panier: Panier) => {
        this.panier = panier;
        this.produitsCommande = Array.from(this.panier.produits.values());
        console.log(this.panier, this.produitsCommande);
      }
    });
  }

  public getIdProduitCommande(): Array<string> {
    return this.produitsCommande.map((p: Produit) => p.id);
  }

  public getlabelPoids(produit: Produit): string {
    let result = '';
    if(produit.poidsMin && produit.poidsMax) {
      if (produit.poidsMin !== produit.poidsMax) {
        result = `${produit.poidsMin} à ${produit.poidsMax} g`;
      } else {
        result =  `${produit.poidsMin} g`;
      }
    } else if (produit.poidsMin) {
      result =  `${produit.poidsMin} g`;
    }
    return result;
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
    this.panierService.updateProduit(produit, (quantite - 1));
  }

  public getQuantiteCommade(produit: Produit): number {
    return this.produitsCommande.find((p: Produit) => p.id === produit.id)?.quantiteCommande || 0;
  }
}


import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {Produit} from "../../../models/produit.model";
import {PanierService} from "../../../services/panier.service";
import {Panier} from "../../../models/panier.model";

import {PopinRemoveProduitComponent} from "../popins/popin-remove-produit/popin-remove-produit.component";
import {PopinService} from "../../../services/popin.service";

@Component({
  selector:  'app-list-produit',
  templateUrl: `./list-produit.component.html`,
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {

  public panier!: Panier;
  @Input() produits: Array<Produit> = [];
  public produitsCommande: Array<Produit> = [];

  @Output() onClickAfficherPlus: EventEmitter<void> = new EventEmitter();

  constructor(private panierService: PanierService, private popinService: PopinService) {
  }

  ngOnInit(): void {
    this.panierService.panierSubject.subscribe({
      next: (panier: Panier) => {
        this.panier = panier;
        this.produitsCommande = Array.from(this.panier.produits.values());
      }
    });
  }

  public afficherPlus(): void {
    this.onClickAfficherPlus.emit();
  }

  public getIdProduitCommande(): Array<string> {
    return this.produitsCommande.map((p: Produit) => p.id);
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
    return this.produitsCommande.find((p: Produit) => p.id === produit.id)?.quantiteCommande || 0;
  }

  public showPopinRemoveProduit(produit: Produit): void {
    this.popinService.openPopin(PopinRemoveProduitComponent, {
      data: {
        produit: produit
      }
    }).subscribe((data: any) => {
      if (data.result) {
        this.panierService.updateProduit(produit, 0);
      }
    });
  }
}

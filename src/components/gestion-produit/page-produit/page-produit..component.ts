import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {ProduitService} from "../../../services/produit.service";
import {Produit} from "../../../models/produit.model";
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {PanierService} from "../../../services/panier.service";

@Component({
  selector:  'app-page-produit',
  templateUrl: `./page-produit.component.html`,
  styleUrls: ['./page-produit..component.scss']
})
export class PageProduitComponent {

  public produit!: Produit;
  public produitForm!: FormGroup;
  public breadcrumbItems: Array<{label: string, urls: Array<string>, queryParams: {}}> = [];

  constructor(private panierService: PanierService,
              private produitService: ProduitService,
              private router: Router,
              private route: ActivatedRoute) {
    this.produit = this.route.snapshot.data['produit'];
    this.produitForm = new FormGroup({
      quantite: new FormControl("1", [Validators.required])
    });
    this.breadcrumbItems.push({ label: this.produit.categorie.label, urls: [this.produit.categorie.code], queryParams: {}})
    this.breadcrumbItems.push({ label: this.produit.ssCategorie.label, urls: [this.produit.categorie.code], queryParams: {ssCat: this.produit.ssCategorie.code}})

  }

  public addPanier(): void {
    const quantitePanier = this.panierService.getQuantite(this.produit);
    this.panierService.updateProduit(this.produit, Number(this.produitForm.value.quantite) + quantitePanier);
  }
}

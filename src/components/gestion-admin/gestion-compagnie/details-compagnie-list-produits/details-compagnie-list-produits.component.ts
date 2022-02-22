import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PopinService} from "../../../../services/popin.service";
import {CompagnieService} from "../../../../services/compagnie.service";
import {ToastService} from "../../../../services/toast.service";
import {ProduitService} from "../../../../services/produit.service";

import {PopinProduitComponent} from "../../../shared/popins/popin-produit/popin-produit.component";

import {Pagination} from "../../../../models/pagination.model";
import {Produit} from "../../../../models/produit.model";
import {Compagnie} from "../../../../models/compagnie.model";
import {LIST_PRODUIT_CATEGORIE, ProduitCategorie} from "../../../../models/produit-categorie.model";

@Component({
  selector:  'app-produits-compagnie',
  templateUrl: `./details-compagnie-list-produits.component.html`,
  styleUrls: ['./details-compagnie-list-produits.component.scss']
})
export class DetailsCompagnieListProduitsComponent implements OnInit {

  public compagnie!: Compagnie;
  public produits: Array<Produit> = [];
  public pagination!: Pagination;
  public listCategorie: Array<ProduitCategorie> = Object.values(LIST_PRODUIT_CATEGORIE);

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private compagnieService: CompagnieService,
              private produitService: ProduitService,
              private router: Router,
              private popinService: PopinService) {}

  ngOnInit(): void {
    this.route?.parent?.params.subscribe(params => {
      this.onParamsChange(params);
    });
  }

  private onParamsChange(params: any): any {
    if (params.id) {
      this.compagnieService.getById(params.id).subscribe(
        (compagnie: Compagnie) => {
          this.compagnie = compagnie;
          this.search();
        },
        err => this.toast.genericError(err)
      );
    }
  }

  public search(): void {
    const params = {
      searchTerm: '',
      idCompagnie: this.compagnie.id,
      categories: this.listCategorie.map((cat: ProduitCategorie) => cat.code)
    };

    this.produitService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.produits = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
    })
  }

  public showPopinAddProduit(): void {
    this.popinService.openPopin(PopinProduitComponent, { data: {
        compagnie: this.compagnie,
        produit: new Produit()
      }})
  }
}


import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CompagnieService} from "../../../../services/compagnie.service";
import {ToastService} from "../../../../services/toast.service";
import {ProduitService} from "../../../../services/produit.service";

import {Pagination} from "../../../../models/pagination.model";
import {Produit} from "../../../../models/produit.model";
import {Compagnie} from "../../../../models/compagnie.model";
import {LIST_CATEGORIES, ProduitCategorie} from "../../../../models/produit-categorie.model";
import {PopinConfirmComponent} from "../../../shared/popins/popin-confirm/popin-confirm.component";
import {PopinService} from "../../../../services/popin.service";

@Component({
  selector:  'app-produits-compagnie',
  templateUrl: `./details-compagnie-list-produits.component.html`,
  styleUrls: ['./details-compagnie-list-produits.component.scss']
})
export class DetailsCompagnieListProduitsComponent implements OnInit {

  public compagnie!: Compagnie;
  public produits: Array<Produit> = [];
  public pagination!: Pagination;
  public listCategorie: Array<ProduitCategorie> = Object.values(LIST_CATEGORIES);

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private compagnieService: CompagnieService,
              private produitService: ProduitService,
              private popinService: PopinService,
              private router: Router) {}

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

  public goToUrl(urls: Array<string>): void {
    this.router.navigate(urls);
  }

  public removeProduit(produit: Produit) {
    this.popinService.openPopin(PopinConfirmComponent, {
      data: {
        description: `Voulez-vous supprimer cette compagnie`,
        hasBtnBack: true,
        hasTitle: true,
        title: 'Confirmation',
        hasBtnConfirm: true,
        textConfirm: 'Valider',
        textBack: 'Annuler',
      }
    }).subscribe((result: any) => {
      if (result) {
        this.popinService.showLoader('Suppression en cours...');
        this.produitService.delete(produit.id).subscribe({
          next: () => {
            this.toast.success(`Le produit est supprimé`);
            this.popinService.closeLoader();
            this.search();
          },
          error: (err: any) => this.toast.genericError(err),
        })
      }
    });
  }

  public getSrc(img: string | undefined): string {
    return 'http://d11mhhwvxnv6xf.cloudfront.net/' + img;

  }
}


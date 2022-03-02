import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";
import {ProduitService} from "../../../../services/produit.service";

import {Site} from "../../../../models/site.model";
import {Produit} from "../../../../models/produit.model";
import {Pagination} from "../../../../models/pagination.model";
import {LIST_CATEGORIES, ProduitCategorie} from "../../../../models/produit-categorie.model";

@Component({
  selector:  'app-details-site-produits',
  templateUrl: `./details-site-produits.component.html`,
  styleUrls: ['./details-site-produits.component.scss']
})
export class DetailsSiteProduitsComponent implements OnInit {

  public site!: Site;
  public produits: Array<Produit> = [];
  public pagination!: Pagination;
  public listCategorie: Array<ProduitCategorie> = Object.values(LIST_CATEGORIES);

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private siteService: SiteService,
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
      this.siteService.getById(params.id).subscribe(
        (site: Site) => {
          this.site = site;
          this.search();
        },
        err => this.toast.genericError(err)
      );
    }
  }

  public search(): void {
    const params = {
      searchTerm: '',
      idSite: this.site.id,
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
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthUserService} from '../../services/auth-user.service';
import {Site} from "../../models/site.model";
import {
  LIST_CATEGORIES,
  LIST_SOUS_CATEGORIES,
  ProduitCategorie,
  SousCategorie
} from "../../models/produit-categorie.model";
import {ProduitService} from "../../services/produit.service";
import {PopinSelectSiteComponent} from "../shared/popins/popin-select-site/popin-select-site.component";
import {PopinService} from "../../services/popin.service";
import {Produit} from "../../models/produit.model";
import {Pagination} from "../../models/pagination.model";

import { combineLatest } from 'rxjs';

@Component({
  selector:  'app-gestion-gestion-categorie',
  templateUrl: `./gestion-categorie.component.html`,
  styleUrls: ['./gestion-categorie.component.scss']
})
export class GestionCategorieComponent implements OnInit {

  public categorieSelected!: ProduitCategorie;
  public ssCategorieSelected!: SousCategorie;
  public siteSelected!: Site;
  public produits: Array<Produit> = [];
  public pagination!: Pagination;

  constructor(private authService: AuthUserService,
              private produitService: ProduitService,
              private popinService: PopinService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    combineLatest(this.route.params, this.route.queryParams).subscribe({
      next: (data: any) => {
        this.categorieSelected = LIST_CATEGORIES[data[0].categorie];
        this.ssCategorieSelected = data[1].ssCat ? LIST_SOUS_CATEGORIES[data[1].ssCat] : null;
        const val = localStorage.getItem('site-selected');
        if (val) {
          this.siteSelected = new Site(JSON.parse(val));
          this.loadProduit(data[1].init);
        } else {
          this.popinService.openPopin(PopinSelectSiteComponent, {width: '80%'})
        }
      }
    })
  }

  private loadProduit(init?: boolean): void {
    const params = {
      idSite: this.siteSelected.id,
      categories: [ this.categorieSelected.code ],
      ssCategories:/* this.ssCategorieSelected ? [ this.ssCategorieSelected.code ] : */this.categorieSelected.ssCategories.map((cat: SousCategorie) => cat.code),
      searchTerm: ''
    };
    this.produitService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.pagination = data.pagination;
        this.produits = this.ssCategorieSelected ? data.result.filter((p: Produit) => p.ssCategorie === this.ssCategorieSelected): data.result;
         const arraySSCat = data.result.map((p: Produit) => p.ssCategorie);
         this.categorieSelected.ssCategories.forEach((cat: SousCategorie) => {
           cat.nbArticle = arraySSCat.filter((ssCat: SousCategorie) => ssCat === cat).length
         });

      }
    })
  }

  public filterBySSCategorie(ssCat: SousCategorie): void {
    this.router.navigate([this.categorieSelected.code],{ queryParams: {ssCat: ssCat.code }})
  }

  public initCat(): void {
    this.router.navigate([this.categorieSelected.code]);

  }
}


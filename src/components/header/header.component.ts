import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Observable, startWith,map, Subscription, debounceTime, distinctUntilChanged, switchMap, mergeMap } from 'rxjs';

import {AuthUserService} from "../../services/auth-user.service";

import {UserToken} from "../../models/user-token.model";

import {
  PopinCategoriesProduitComponent
} from "../shared/popins/popin-categories-produit/popin-categories-produit.component";
import {PopinService} from "../../services/popin.service";
import {PopinSelectSiteComponent} from "../shared/popins/popin-select-site/popin-select-site.component";
import {Site} from "../../models/site.model";
import {Compagnie} from "../../models/compagnie.model";
import {SiteService} from "../../services/site.service";
import {PanierService} from "../../services/panier.service";
import {Panier} from "../../models/panier.model";
import {Produit} from "../../models/produit.model";
import {FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  ProduitCategorie,
  SousCategorie
} from "../../models/produit-categorie.model";
import {ProduitService} from "../../services/produit.service";

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public searchTerm!: string;
  public labelUsername: string = 'Mon compte';
  public labelSite: string = 'Sélectionner un site';

  private userToken!: UserToken;
  private authUser$!: Subscription;

  public panier!: Panier;
  private panier$!: Subscription;

  public siteSelected!: Site;
  private siteSelected$!: Subscription;

  @ViewChild('formSearch') formSearch!: ElementRef;
  @ViewChild('blockLogo') blockLogo!: ElementRef;
  @ViewChild('blockProduit') blockProduit!: ElementRef;
  @ViewChild('blockSearch') blockSearch!: ElementRef;
  @ViewChild('blockProducteurs') blockProducteurs!: ElementRef;
  @ViewChild('blockBasket') blockBasket!: ElementRef;

  stateGroupOptions!: Observable<CategorieGroup[]>;

  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });
  catGroups: CategorieGroup[] = [];

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private popinService: PopinService,
              private authUserService: AuthUserService,
              private siteService: SiteService,
              private produitService: ProduitService,
              private panierService: PanierService
  ) {}


  private _filterGroup(value: string): Observable<any> {
     return this.produitService.search(value, this.siteSelected.id).pipe(
       map((produits: Array<Produit>) =>{
         return this.catGroups
           .map(group => ({
               categorie: group.categorie,
               sousCategories: _filter(group.sousCategories, value, produits),
             })
           )
           .filter(group => group.sousCategories.length > 0);
         }
       ));
  }

  public ngOnInit(): void {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val: string) => {
        return this._filterGroup(val)
      })
    );

    this.authUser$ = this.authUserService.userTokenSubject.subscribe({
      next: (userToken: UserToken) => {
        this.userToken = userToken;
        this.labelUsername = (this.authUserService.isValid() ? this.userToken.user.firstname : 'Mon compte');
      }
    });

    this.panier$ = this.panierService.panierSubject.subscribe({
      next: (panier: Panier) => this.panier = panier
    });

    this.siteSelected$ = this.siteService.siteSubject.subscribe({
      next: (site: Site) => {
        this.siteSelected = site;
        this.labelSite = this.siteSelected && this.siteSelected.id ? this.siteSelected.name : 'Sélectionner un site';
        if (this.siteSelected?.id) {
          this.siteService.getById(site.id).subscribe({
            next: (site: Site) => this.loadCategorieSite(site)
          })
        }
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.authUser$) { this.authUser$.unsubscribe(); }
    if (this.panier$) {  this.panier$.unsubscribe(); }
    if (this.siteSelected$) { this.siteSelected$.unsubscribe(); }
  }

  public displayZoneSearch(): void {
    this.blockLogo.nativeElement.classList.add('remove-block');
    this.blockProduit.nativeElement.classList.add('remove-block');
    this.blockProducteurs.nativeElement.classList.add('remove-block');
    this.blockSearch.nativeElement.classList.add('remove-block');
    this.blockBasket.nativeElement.classList.add('remove-block');
    this.formSearch.nativeElement.classList.add('display-block-search');
  }

  public removeZoneSearch(): void {
    this.blockLogo.nativeElement.classList.remove('remove-block');
    this.blockProduit.nativeElement.classList.remove('remove-block');
    this.blockProducteurs.nativeElement.classList.remove('remove-block');
    this.blockSearch.nativeElement.classList.remove('remove-block');
    this.blockBasket.nativeElement.classList.remove('remove-block');
    this.formSearch.nativeElement.classList.remove('display-block-search');
  }

  public checkLogin(): void {
    if(!this.authUserService.isValid()) {
      this.router.navigate(['auth', 'login']);
    }
  }

  public logout(): void {
    this.authUserService.logout();
    this.router.navigate(['home']);
  }

  public goToUrls(urls: Array<string> = []): void {
    this.router.navigate(urls);
  }

  public goToCategorieSelected(cat: ProduitCategorie, ssCat: SousCategorie): void {
    this.router.navigate([cat.code],{ queryParams: {ssCat: ssCat.code }})
  }

  public goToProduitSelected(produit: Produit): void {
    this.router.navigate(['produits', produit.reference]);
  }

  public checkSiteSelected(): void {
    if (!this.siteSelected?.id) {
      this.popinService.openPopin(PopinSelectSiteComponent, {
        width: '100%',
      }).subscribe();
    }
  }

  private loadCategorieSite(site: Site): void {
    const categories = new Set(site.compagnies.flatMap((c: Compagnie) => c.categories));
    this.catGroups = Array.from(categories).map((cat: any) => { return {
      categorie: cat,
      sousCategories: cat.ssCategories
    }});
  }

  public showPopinSelectedSite(): void {
    this.popinService.openPopin(PopinSelectSiteComponent, {width: '100%'});
  }

  public initPopinCategorie(): void {
    if(!localStorage.getItem('site-selected')) {
      this.popinService.openPopin(PopinSelectSiteComponent, {
        width: '100%',
      }).subscribe((data: any) => {
        if (data?.result) {
          this.showPopinCategorie();
        }
      });
    } else {
      this.showPopinCategorie();
    }
  }

  private showPopinCategorie(): void {
    const val = localStorage.getItem('site-selected');
    if (val) {
      const site = new Site(JSON.parse(val));
      this.siteService.getById(site.id).subscribe({
        next: (site: Site) => {
          const categories = new Set(site.compagnies.flatMap((c: Compagnie) => c.categories));
          this.popinService.openPopin(PopinCategoriesProduitComponent, {
            data: {
              site: site,
              categories: categories
            }
          });
        }
      })
    }
  }

  public getBadge(): number {
    return this.panier?.produits ? Array.from(this.panier.produits.values()).map((p: Produit) => p.quantiteCommande).reduce((a, b) => a + b, 0) : 0;
  }
}

export interface CategorieGroup {
  categorie: ProduitCategorie;
  sousCategories: SousCategorie[];
}

export const _filter = (opt: SousCategorie[], value: string, produits: Array<Produit>): SousCategorie[] => {
  const filterValue = (value || '').toLowerCase();
  return opt.map(item => {
    item.produits = produits.filter(p => p.ssCategorie === item);
    return item;
  }).filter(item => item.label.toLowerCase().includes(filterValue) || item.produits?.length > 0);
};

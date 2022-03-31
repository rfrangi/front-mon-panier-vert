import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public searchTerm!: string;
  public labelUsername: string = 'Mon compte';

  private userToken!: UserToken;
  private authUser$!: Subscription;

  public panier!: Panier;
  private panier$!: Subscription;
  @ViewChild('formSearch') formSearch!: ElementRef;
  @ViewChild('blockLogo') blockLogo!: ElementRef;
  @ViewChild('blockProduit') blockProduit!: ElementRef;
  @ViewChild('blockSearch') blockSearch!: ElementRef;
  @ViewChild('blockProducteurs') blockProducteurs!: ElementRef;
  @ViewChild('blockBasket') blockBasket!: ElementRef;

  constructor(private router: Router,
              private popinService: PopinService,
              private authUserService: AuthUserService,
              private siteService: SiteService,
              private panierService: PanierService
  ) {}

  public ngOnInit(): void {
    this.authUser$ = this.authUserService.userTokenSubject.subscribe({
      next: (userToken: UserToken) => {
        this.userToken = userToken;
        this.labelUsername = (this.authUserService.isValid() ? this.authUserService.getUser().firstname : 'Mon compte');
      }
    });

    this.panier$ = this.panierService.panierSubject.subscribe({
      next: (panier: Panier) => {
        this.panier = panier
        console.log('subcription panier header', panier)
      }
    })
  }

  public ngOnDestroy(): void {
      this.authUser$.unsubscribe();
      this.panier$.unsubscribe();
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

  public initPopinCategorie(): void {
    if(!localStorage.getItem('site-selected')) {
      this.popinService.openPopin(PopinSelectSiteComponent, {
        width: '80%',
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
    return Array.from(this.panier.produits.values()).map((p: Produit) => p.quantiteCommande).reduce((a, b) => a + b, 0);


   // return Array.from(this.panier.produits.keys()).map((key: string) => ).length;
  }
}

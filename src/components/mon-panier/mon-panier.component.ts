import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Produit} from "../../models/produit.model";
import {PanierService} from "../../services/panier.service";
import {Panier} from "../../models/panier.model";
import { Subscription } from 'rxjs';
import {PopinRemoveProduitComponent} from "../shared/popins/popin-remove-produit/popin-remove-produit.component";
import {PopinService} from "../../services/popin.service";
import {Site} from "../../models/site.model";
import {FormBuilder } from '@angular/forms';
import {ToastService} from "../../services/toast.service";
import {SiteService} from "../../services/site.service";
import {UserToken} from "../../models/user-token.model";
import {AuthUserService} from "../../services/auth-user.service";
import {PopinDetailsSiteComponent} from "../shared/popins/popin-details-site/popin-details-site.component";

@Component({
  selector:  'app-mon-panier',
  templateUrl: `./mon-panier.component.html`,
  styleUrls: ['./mon-panier.component.scss']
})
export class MonPanierComponent implements OnInit, OnDestroy {

  public produits: Array<Produit> = [];
  public panier!: Panier;
  public panierSub$!: Subscription;
  public siteSelected!: Site;
  public siteSub$!: Subscription;
  public todoDate: string = 'mercerdi 20 avril 2022';
  public userToken!: UserToken;
  private authUser$!: Subscription;

  constructor(private toast: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              private popinService: PopinService,
              private siteService: SiteService,
              private authUserService: AuthUserService,
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

    this.siteSub$ = this.siteService.siteSubject.subscribe({
      next: (site: Site) => {
        this.siteSelected = site;
      }
    });

    this.authUser$ = this.authUserService.userTokenSubject.subscribe({
      next: (userToken: UserToken) => {
        this.userToken = userToken;
      }
    });
  }

  public ngOnDestroy(): void {
    this.panierSub$.unsubscribe();
    this.siteSub$.unsubscribe();
    this.authUser$.unsubscribe();
  }

  public goToUrl(urls: Array<string>): void {
    this.router.navigate(urls);
  }

  public getTotalPrixByProduit(produit: Produit): number {
    return produit.tarif * produit.quantiteCommande;
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

  public showStatusDev(): void {
    this.toast.info();
  }

  public showInformationSite(): void {
    this.popinService.openPopin(PopinDetailsSiteComponent, {
      data: {
        site: this.siteSelected
      }
    });
  }
}

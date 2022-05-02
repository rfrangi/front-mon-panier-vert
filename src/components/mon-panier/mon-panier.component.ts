import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Produit} from "../../models/produit.model";
import {PanierService} from "../../services/panier.service";
import {Panier} from "../../models/panier.model";
import { Subscription } from 'rxjs';
import {PopinRemoveProduitComponent} from "../shared/popins/popin-remove-produit/popin-remove-produit.component";
import {PopinService} from "../../services/popin.service";
import {Site} from "../../models/site.model";
import {FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ToastService} from "../../services/toast.service";
import {SiteService} from "../../services/site.service";
import {UserToken} from "../../models/user-token.model";
import {AuthUserService} from "../../services/auth-user.service";
import {PopinDetailsSiteComponent} from "../shared/popins/popin-details-site/popin-details-site.component";
import {PopinSelectTypeRetraitComponent} from "../shared/popins/popin-select-type-retrait/popin-select-type-retrait.component";

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
  public dateRetraitSelected: Date = new Date();
  public minDateRetrait: Date = new Date();

  public userToken!: UserToken;
  private authUser$!: Subscription;

  public retraitForm!: FormGroup;

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
    this.initDateRetrait();
    this.initForm();
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

  public changeModeRetrait(): void {
    this.popinService.openPopin(PopinSelectTypeRetraitComponent, {
      data: {}
    }).subscribe({
      next: (data: any) => console.log(data)
    });
  }

  public changeDateRetrait(): void {
    console.log(this.retraitForm.value);
  }

  public myFilterDate = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  public getDateRetrait(): Date {
    return this.retraitForm.value.dateRetraitSelected;
  }

  public initDateRetrait(): void {
    this.minDateRetrait.setDate(this.minDateRetrait.getDate() + 1);
    this.dateRetraitSelected = new Date();
    this.dateRetraitSelected.setHours(0,0,0);
    this.dateRetraitSelected.setDate(this.dateRetraitSelected.getDate() + 1);
    while(this.dateRetraitSelected.getDay() === 6 || this.dateRetraitSelected.getDay() === 0) {
      this.dateRetraitSelected.setDate(this.dateRetraitSelected.getDate() + 1);
    }
  }

  public initForm(): void {
    this.retraitForm = new FormGroup({
      dateRetraitSelected: new FormControl(this.dateRetraitSelected),
    });
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

  public goNextStep(): void {
    this.dateRetraitSelected = new Date();
  }
}

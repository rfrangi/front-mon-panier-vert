import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Produit} from "../../models/produit.model";
import {PanierService} from "../../services/panier.service";
import {Panier} from "../../models/panier.model";
import {combineLatest, forkJoin, map, Subscription } from 'rxjs';
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
import {LIST_TYPE_RETRAIT} from "../../models/type-retrait.model";
import {Adresse} from "../../models/adresse.model";
import {PopinChangeAdresseComponent} from "../shared/popins/popin-change-adresse/popin-change-adresse.component";
import {CommandeService} from "../../services/commande.service";

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

  public dateRetraitSelected: Date = new Date();
  public minDateRetrait: Date = new Date();

  public userToken!: UserToken;
  private subscription$!: Subscription;

  public retraitForm!: FormGroup;

  public listModeRetrait = LIST_TYPE_RETRAIT;

  public changeCreneauRetrait: boolean = false;

  public accepteTerm: boolean = false;

  constructor(private toast: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              private popinService: PopinService,
              private siteService: SiteService,
              private commandeService: CommandeService,
              private authUserService: AuthUserService,
              private panierService: PanierService,
              private _formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initDateRetrait();
    this.initForm();

    this.subscription$ = combineLatest([this.panierService.panierSubject, this.authUserService.userTokenSubject, this.siteService.siteSubject]).pipe(
      map(([panier, userToken, site]) => ({
        panier: panier,
        userToken: userToken,
        site: site
      }))).subscribe({
      next: (data: any) => {
        this.userToken = data.userToken;
        this.siteSelected = data.site;
        this.panier = data.panier;
        this.panier.dateRetrait = this.dateRetraitSelected;
        this.panier.userId = this.userToken.user.id;
        this.produits = Array.from(this.panier.produits.values());
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public changeModeRetrait(): void {
    this.popinService.openPopin(PopinSelectTypeRetraitComponent, {
      data: { typeSelected: this.panier.modeRetrait, site: this.siteSelected },
      width: '25em',
    }).subscribe({
      next: (data: any) => {
        if (data.result) {
          this.panier.modeRetrait = data.modeSelected;
          if(this.panier.modeRetrait === LIST_TYPE_RETRAIT.LIVRAISON) {
            this.panier.adresseLivraison = new Adresse(this.userToken.user.adresse.serialize());
          }
          console.log(this.panier);
        }
      }
    });
  }

  public changeDateRetrait(): void {
    this.panier.dateRetrait = this.retraitForm.value;
    console.log(this.panier);
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
    this.panier.adresseFacturation = new Adresse(this.siteSelected.adresse.serialize());
    this.panier.adresseLivraison = new Adresse(this.siteSelected.adresse.serialize());
  }

  public showChangeAdresse(facturation: boolean = false): void {
    this.popinService.openPopin(PopinChangeAdresseComponent, {
      data: {
        title: `Modifier l'adresse de ${facturation ? 'facturation' : 'lirvaison'}`,
        adresse: facturation ? this.panier.adresseFacturation : this.panier.adresseLivraison
      }
    }).subscribe((res: any) => {
      if (res.result) {
        if(facturation) {
          this.panier.adresseFacturation = res.adresse
        } else {
          this.panier.adresseLivraison = res.adresse
        }
      }
    });
  }

  public goToPaiement(): void {
    if(this.panier.modeRetrait === this.listModeRetrait.SITE) {
      this.panier.adresseLivraison = new Adresse(this.siteSelected.adresse.serialize());
    }
  }

  public submitPanier(): void {
    console.log(this.panier);
    this.commandeService.save(this.panier.serialize()).subscribe({
      next: (data) => {
        console.log(data);
        this.toast.info('Votre commande est en cours de préparation.')
      },
      error: (err: any) => this.toast.genericError(err)
    })
  }

  public savePanier(): void {
    this.panierService.save(this.panier).subscribe({
      next: () => this.toast.success('Votre panier est enregistrer.')
    })
  }
}

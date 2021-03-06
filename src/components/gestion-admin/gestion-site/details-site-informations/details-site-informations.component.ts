import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";

import {LIST_PAYS, Pays} from "../../../../models/pays.model";
import {Site} from "../../../../models/site.model";
import {LIST_SITE_STATUS, SiteStatus} from "../../../../models/site-status.model";

import {AdresseFormComponent} from "../../../shared/adresse/adresse-form/adresse-form.component";
import {Adresse} from "../../../../models/adresse.model";
import {AdresseService} from "../../../../services/adresse.service";
import {Compagnie} from "../../../../models/compagnie.model";

@Component({
  selector:  'app-gestion-admin-details-site-informations',
  templateUrl: `./details-site-informations.component.html`,
  styleUrls: ['./details-site-informations.component.scss']
})
export class DetailsSiteInformationsComponent implements OnInit {

  public site!: Site;
  public siteForm!: FormGroup;
  public listPays: Array<Pays> = Object.values(LIST_PAYS);
  public listStatus: Array<SiteStatus> = Object.values(LIST_SITE_STATUS);
  public step: number = 0;
  public adresseForm!: FormGroup;
  public isCreated: boolean = false;
  public updateInfo: boolean = false;
  public updateAdresse: boolean = false;
  public updateCoordonnee: boolean = false;

  @ViewChild('adresseFormComponent')
  public adresseFormComponent!: AdresseFormComponent;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private adresseService: AdresseService,
              private router: Router,
              private popinService: PopinService) {}

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.onParamsChange(params);
      });
    }
  }

  onParamsChange(params: any): any {
    if (params.id) {
      this.siteService.getById(params.id).subscribe({
        next: (site: Site) => {
          this.site = site;
          this.initForm(!this.updateInfo);
        },
        error: (err: any) => this.toast.genericError(err)
      });
    } else {
      this.isCreated = true;
      this.updateAdresse = true;
      this.updateInfo = true;
      this.site = new Site();
      this.initForm(false);
    }
  }

  public onUpdateCoordonnee(): void {
    this.updateCoordonnee = !this.updateCoordonnee;
    this.initForm();
  }

  public saveCoordonnee(): void {
    this.site.telephone = this.siteForm.value.telephone;
    this.site.email = this.siteForm.value.email;
    this.siteService.save(this.site.serialize(), true).subscribe({
      next: (site: Site) => {
        this.toast.success('Les informations sont ?? jours');
        this.site = site;
        this.resetForm();
      },
      error: (err: any) =>  this.toast.genericError(err),
    })
  }

  public initForm(disabled: boolean = false): void {
    this.siteForm = new FormGroup({
      name: new FormControl({value: this.site.name ? this.site.name : '', disabled: disabled}, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      status: new FormControl({value: this.site.status.code, disabled: disabled}, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      email: new FormControl({value: this.site.email, disabled: !this.updateCoordonnee }, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      telephone: new FormControl({value: this.site.telephone, disabled: !this.updateCoordonnee }, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ])
    });
  }


  public goToListSite(): void {
    this.router.navigate(['administration', 'sites'])
  }

  submitForm(): void {
    if (this.siteForm.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs');
      return;
    }
    const data = this.siteForm.value;
    Object.assign(data, {id: this.site.id ? this.site.id : undefined })
    this.popinService.showLoader();
    this.siteService.save(data, true).subscribe({
      next: (site: Site) => {
        this.toast.success(this.site.id ? 'Les informations sont ?? jours' : `Votre entreprise est ajout??e`);
        this.site = site;
        this.popinService.closeLoader();
        this.goToListSite();
      },
      error: (err: any) => {
        this.toast.genericError(err);
        this.popinService.closeLoader();
      },
      complete: () => this.popinService.closeLoader()
    })
  }

  public saveInfo(): void {
    if (this.siteForm.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs');
    }
    this.site.name = this.siteForm.value.name;
    this.site.status = LIST_SITE_STATUS[this.siteForm.value.status];
    this.siteService.save(this.site.serialize(), true).subscribe({
      next: (site: Site) => {
        this.toast.success('Les informations sont ?? jours');
        this.site = site;
        this.resetForm();
      },
      error: (err: any) => this.toast.genericError(err)
    });
  }

  public saveAdresse(): void {
    if (this.siteForm.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs');
    }
    const adresse = this.adresseFormComponent.adresseform.value
    adresse.idAdresse = this.site.adresse.idAdresse;

    this.adresseService.update(new Adresse(adresse), true).subscribe({
       next: (adr: Adresse) => {
         this.toast.success( 'Les informations sont ?? jours');
         this.site.adresse = adr;
         this.adresseFormComponent.adresse = adr;
         this.resetFormAdresse();
       },
       error: (err: any) => this.toast.genericError(err)

     });
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public resetForm(): void {
    this.updateAdresse = false;
    this.updateInfo = false;
    this.updateCoordonnee = false;
    this.initForm(true);
  }

  public onUpdateInfo(): void {
    this.updateInfo = !this.updateInfo;
    this.initForm(false)
  }

  public resetFormAdresse(): void {
    this.updateAdresse = false;
    this.updateInfo = false;
    this.initForm(true);
    this.adresseFormComponent.initForm(!this.updateAdresse);
  }

  public onUpdateAdresse(): void {
    this.updateAdresse = !this.updateAdresse;
    this.adresseFormComponent.initForm(!this.updateAdresse);
  }
}


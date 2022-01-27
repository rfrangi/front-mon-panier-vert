import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";

import {LIST_PAYS, Pays} from "../../../../models/pays.model";
import {Site} from "../../../../models/site.model";
import {LIST_SITE_STATUS, SiteStatus} from "../../../../models/site-status.model";

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

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private router: Router,
              private popinService: PopinService) {}

  ngOnInit(): void {
    if (this.route.parent) {
      console.log(this.route.parent.params);
      this.route.parent.params.subscribe(params => {
        this.onParamsChange(params);
      });
    }
  }

  onParamsChange(params: any): any {
    console.log(params);
    if (params.id) {
      this.siteService.getById(params.id).subscribe({
        next: (site: Site) => {
          this.site = site;
          this.initForm();
        },
        error: (err: any) => this.toast.genericError(err)
      });
    } else {
      this.site = new Site();
      console.log(this.site);
      this.initForm();
    }
  }

  initForm(): void {
    this.siteForm = new FormGroup({
      name: new FormControl({value: this.site.name ? this.site.name : '', disabled: false}, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      status: new FormControl({value: this.site.status.code, disabled: false}, [
        Validators.required,
        Validators.maxLength(30)
      ])
    })
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
    console.log(data);
    this.popinService.showLoader();
    this.siteService.save(data, true).subscribe({
      next: (site: Site) => {
        this.toast.success(this.site.id ? 'Les informations sont à jours' : `Votre entreprise est ajoutée`);
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

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}


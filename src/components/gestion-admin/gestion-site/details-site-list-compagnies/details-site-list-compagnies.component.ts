import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";

import {LIST_PAYS, Pays} from "../../../../models/pays.model";
import {Site} from "../../../../models/site.model";
import {Compagnie} from "../../../../models/compagnie.model";
import {PopinConfirmComponent} from "../../../shared/popins/popin-confirm/popin-confirm.component";
import {PopinAddCompagnieOnSiteComponent} from "../popin-add-compagnie-on-site/popin-add-compagnie-on-site.component";
import { forkJoin } from 'rxjs';

@Component({
  selector:  'app-gestion-admin-details-site-list-compagnies',
  templateUrl: `./details-site-list-compagnies.component.html`,
  styleUrls: ['./details-site-list-compagnies.component.scss']
})
export class DetailsSiteListCompagniesComponent implements OnInit {


  public searchForm!: FormGroup;
  private idSite!: string;
  public site!: Site;

  constructor(private toast: ToastService,
              private popinService: PopinService,
              private siteService: SiteService,
              private router: Router,
              private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.onParamsChange(params);
      });
    }
  }

  onParamsChange(params: any): any {
    if (params.id) {
      this.idSite = params.id;
      forkJoin([this.siteService.getById(this.idSite), this.siteService.getCompagnies(this.idSite)]).subscribe({
        next: (result: any) => {
          this.site = result[0];
          this.site.compagnies = result[1];
        },
        error: (err: any) => this.toast.genericError(err)
      });
    }
  }


  public search(): void {
    this.siteService.getCompagnies(this.idSite).subscribe({
      next: (compagnies: Array<Compagnie>) => this.site.compagnies = compagnies,
      error: (err: any) => this.toast.genericError(err)
    });

  }

  public removeCompagnie(compagnie: Compagnie): void {
    this.popinService.openPopin(PopinConfirmComponent, {
      data: {
        description: `Voulez-vous supprimer cette compagnie du site`,
        hasBtnBack: true,
        hasTitle: true,
        title: 'Confirmation',
        hasBtnConfirm: true,
        textConfirm: 'Valider',
        textBack: 'Annuler',
      }
    }).subscribe((result: any) => {
      if (result) {
        this.siteService.deleteCompagnie(this.idSite, compagnie.id).subscribe({
          next: () => {
            this.search();
            this.toast.success(`La compagnie est supprimée`)
          },
          error: (err: any) => this.toast.genericError(err),
          complete: () => this.search()
        })
      }
    });
  }

  public addCompagnie(): void {
    this.popinService.openPopin(PopinAddCompagnieOnSiteComponent, {
      data: {
        site: this.site,
      }
    }).subscribe((result: Array<Compagnie>) => {
      console.log(result)
      if (result) {
        this.siteService.addCompagnies(this.idSite, result).subscribe({
          next: (site: Site) => this.site = site,
          error: (err: any) => this.toast.genericError(err),
        });
      }
    });
  }
}


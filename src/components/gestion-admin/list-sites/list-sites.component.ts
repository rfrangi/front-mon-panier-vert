import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../../../services/toast.service";
import {SiteService} from "../../../services/site.service";
import {Site} from "../../../models/site.model";
import {PopinService} from "../../../services/popin.service";
import {PopinConfirmComponent} from "../../shared/popins/popin-confirm/popin-confirm.component";
import {Pagination} from "../../../models/pagination.model";


@Component({
  selector:  'app-list-sites',
  templateUrl: `./list-sites.component.html`,
  styleUrls: ['./list-sites.component.scss']
})
export class ListSitesComponent implements OnInit {

  public searchForm!: FormGroup;
  public sites: Array<Site> = [];
  public pagination: Pagination = new Pagination({});

  constructor(private toast: ToastService,
              private siteService: SiteService,
              private popinService: PopinService,
              private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
    this.search();
  }

  public search(): void {
    const params = Object.assign({
      page: this.pagination.currentPage,
      searchTerm: this.searchForm.value.searchTerm
    });
    this.popinService.showLoader();
    this.siteService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.sites = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.popinService.closeLoader()
    })
  }

  public goToEditSite(site: Site): void {
    this.router.navigate(['administration', 'site', site.id]);
  }

  public removeSite(id: string): void {
    this.popinService.openPopin(PopinConfirmComponent, {
      data: {
        description: `Voulez-vous supprimer ce site`,
        hasBtnBack: true,
        hasTitle: true,
        title: 'Confirmation',
        hasBtnConfirm: true,
        textConfirm: 'Valider',
        textBack: 'Annuler',
      }
    }).subscribe((result: any) => {
      if (result) {
        this.popinService.showLoader('Suppression en cours...');
        this.siteService.delete(id).subscribe({
          next: () => this.toast.success(`Le site est supprimé`),
          error: (err: any) => this.toast.genericError(err),
          complete: () => this.search()
        })
      }
    });
  }

  public goToAddSite(): void {
    this.router.navigate(['administration', 'site',]);
  }
}


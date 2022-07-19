import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Site} from "../../../models/site.model";
import {SiteService} from "../../../services/site.service";
import {ToastService} from "../../../services/toast.service";
import {Compagnie} from "../../../models/compagnie.model";
import {CompagnieService} from "../../../services/compagnie.service";
import {Pagination} from "../../../models/pagination.model";
import {LIST_COMPAGNIE_STATUS} from "../../../models/compagnie-status.model";

@Component({
  selector:  'app-list-producteur',
  templateUrl: `./list-producteurs.component.html`,
  styleUrls: ['./list-producteurs.component.scss']
})
export class ListProducteursComponent implements OnInit {
  public breadcrumbItems: Array<{label: string, urls: Array<string>, queryParams: {}}> = [];

  public sites: Array<Site> = [];
  public siteSelected!: Site;

  public compagnies: Array<Compagnie> = [];
  public pagination!: Pagination;

  constructor(private siteService: SiteService,
              private compagnieService: CompagnieService,
              private router: Router, private toast: ToastService) {
  }

  ngOnInit(): void {
    this.siteService.getSiteActif().subscribe({
      next: (sites: Site[]) => {
        this.sites = sites;
        this.showCompagnieToSite(this.sites[0]);
      },
      error: (err: any) => {
        this.toast.genericError(err);
      }
    });
  }

  showCompagnieToSite(site: Site) {
    this.siteSelected = site;
    this.siteService.getById(this.siteSelected.id).subscribe({
      next: (site: Site) => {
        this.siteSelected = site;
        this.compagnies = site.compagnies;
        console.log(this.compagnies);
      },
      error: (err: any) => this.toast.genericError(err),
    });
  }
}


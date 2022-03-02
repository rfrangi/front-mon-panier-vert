import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";
import {CommandeService} from "../../../../services/commande.service";

import {Site} from "../../../../models/site.model";
import {Compagnie} from "../../../../models/compagnie.model";
import {Commande} from "../../../../models/commande.model";
import {Pagination} from "../../../../models/pagination.model";


@Component({
  selector:  'app-details-site-list-commandes',
  templateUrl: `./details-site-list-commandes.component.html`,
  styleUrls: ['./details-site-list-commandes.component.scss']
})
export class DetailsSiteListCommandesComponent implements OnInit {
  public site!: Site;
  public commandes: Array<Commande> = [];
  public pagination!: Pagination;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private commandeService: CommandeService,
              private router: Router,
              private popinService: PopinService) {}

  ngOnInit(): void {
    this.route?.parent?.params.subscribe(params => {
      this.onParamsChange(params);
    });
  }

  private onParamsChange(params: any): any {
    if (params.id) {
      this.siteService.getById(params.id).subscribe(
        (site: Site) => {
          this.site = site;
          this.search();
        },
        err => this.toast.genericError(err)
      );
    }
  }

  public search(): void {
    const params = {
      searchTerm: '',
      idSite: this.site.id,
    };

    this.commandeService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.commandes = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
    })
  }

}


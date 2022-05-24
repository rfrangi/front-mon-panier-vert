import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";
import {CommandeService} from "../../../../services/commande.service";

import {Site} from "../../../../models/site.model";

import {CommandeClient} from "../../../../models/commande-client.model";
import {Pagination} from "../../../../models/pagination.model";

import {LIST_COMMANDE_STATUS} from "../../../../models/commande-status.model";


@Component({
  selector:  'app-details-site-list-commandes',
  templateUrl: `./details-site-list-commandes.component.html`,
  styleUrls: ['./details-site-list-commandes.component.scss']
})
export class DetailsSiteListCommandesComponent implements OnInit {
  public site!: Site;

  public commandes: Array<CommandeClient> = [];
  public pagination!: Pagination;

  public step!: number;

  constructor(private popinService: PopinService,
              private siteService: SiteService,
              private route: ActivatedRoute,
              private commandeService: CommandeService,
              private toast: ToastService) {}

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
          this.search();
        },
        error: (err: any) => this.toast.genericError(err)
      });
    }
  }

  public search(): void {

    const params = Object.assign({
      page: this.pagination?.currentPage || 1,
      siteId: this.site.id,
      status: [
        LIST_COMMANDE_STATUS.VALIDE.code,
        LIST_COMMANDE_STATUS.EN_PREPARATION.code,
        LIST_COMMANDE_STATUS.EN_COURS_LIVRAISON.code,
        /* LIST_COMMANDE_STATUS.LIVRE.code,

         LIST_COMMANDE_STATUS.ANNULE.code,
         LIST_COMMANDE_STATUS.SUPPRIMER.code,
         LIST_COMMANDE_STATUS.BLOQUE.code,
         LIST_COMMANDE_STATUS.ERREUR.code,*/
      ]
    });
    this.popinService.showLoader();
    this.commandeService.getAllByParams(params, true, false).subscribe({
      next: (data: any) => {
        this.commandes = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.popinService.closeLoader()
    })
  }
}



import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PopinService} from "../../../../services/popin.service";
import {CompagnieService} from "../../../../services/compagnie.service";
import {ToastService} from "../../../../services/toast.service";
import {CommandeService} from "../../../../services/commande.service";

import {Compagnie} from "../../../../models/compagnie.model";
import {Pagination} from "../../../../models/pagination.model";
import {CommandeClient} from "../../../../models/commande-client.model";
import {Site} from "../../../../models/site.model";
import {SiteService} from "../../../../services/site.service";
import {LIST_COMMANDE_STATUS} from "../../../../models/commande-status.model";

@Component({
  selector:  'app-details-compagnie-list-commandes',
  templateUrl: `./details-compagnie-list-commandes.component.html`,
  styleUrls: ['./details-compagnie-list-commandes.component.scss']
})
export class DetailsCompagnieListCommandesComponent implements OnInit {

  public compagnie!: Compagnie;
  public commandes: Array<CommandeClient> = [];
  public pagination!: Pagination;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private compagnieService: CompagnieService,
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
      this.compagnieService.getById(params.id).subscribe(
        (compagnie: Compagnie) => {
          this.compagnie = compagnie;
          this.search();
        },
        err => this.toast.genericError(err)
      );
    }
  }

  public search(): void {

    const params = Object.assign({
      page: this.pagination?.currentPage || 1,
      compagnieId: this.compagnie.id,
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


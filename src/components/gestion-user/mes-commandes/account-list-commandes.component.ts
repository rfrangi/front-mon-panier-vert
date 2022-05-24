import { Component } from '@angular/core';

import {Pagination} from "../../../models/pagination.model";
import {CommandeClient} from "../../../models/commande-client.model";
import {LIST_COMMANDE_STATUS} from "../../../models/commande-status.model";

import {PopinService} from "../../../services/popin.service";
import {CommandeService} from "../../../services/commande.service";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector:  'app-account-list-commandes',
  templateUrl: `./account-list-commandes.component.html`,
  styleUrls: ['./account-list-commandes.component.scss']

})
export class AccountListCommandesComponent {

  public commandes: Array<CommandeClient> = [];
  public pagination!: Pagination;

  public step!: number;

  constructor(private popinService: PopinService,
              private commandeService: CommandeService,
              private toast: ToastService) {}

  ngOnInit(): void {

    const params = Object.assign({
      page: this.pagination?.currentPage || 1,
      status: [
        LIST_COMMANDE_STATUS.EN_COURS_LIVRAISON.code,
      ]
    });
    this.popinService.showLoader();
    this.commandeService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.commandes = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.popinService.closeLoader()
    })
  }
}

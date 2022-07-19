import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {Produit} from "../../../models/produit.model";
import {PanierService} from "../../../services/panier.service";
import {Panier} from "../../../models/panier.model";

import {PopinRemoveProduitComponent} from "../popins/popin-remove-produit/popin-remove-produit.component";
import {PopinService} from "../../../services/popin.service";
import {CommandeClient} from "../../../models/commande-client.model";
import {Pagination} from "../../../models/pagination.model";
import {CommandeService} from "../../../services/commande.service";
import {ToastService} from "../../../services/toast.service";
import {LIST_COMMANDE_STATUS} from "../../../models/commande-status.model";

@Component({
  selector:  'app-list-commande',
  templateUrl: `./list-commande.component.html`,
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent {

  @Input() public commandes: Array<CommandeClient> = [];
  @Input() public pagination!: Pagination;
  @Input() public title: string = 'Mes commandes';

  public cmdSelected!: CommandeClient;

  public step!: number;

  constructor(private popinService: PopinService,
              private commandeService: CommandeService,
              private toast: ToastService) {}

  public showDetailsCommande(idCmd: string): void {
    this.popinService.showLoader();
    this.commandeService.getById(idCmd).subscribe({
      next: (cmdClient: CommandeClient) => {
        this.cmdSelected = cmdClient;
      },
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.popinService.closeLoader()
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PopinService} from "../../../../services/popin.service";
import {CompagnieService} from "../../../../services/compagnie.service";
import {ToastService} from "../../../../services/toast.service";
import {CommandeService} from "../../../../services/commande.service";

import {Compagnie} from "../../../../models/compagnie.model";
import {Pagination} from "../../../../models/pagination.model";
import {Commande} from "../../../../models/commande.model";

@Component({
  selector:  'app-details-compagnie-list-commandes',
  templateUrl: `./details-compagnie-list-commandes.component.html`,
  styleUrls: ['./details-compagnie-list-commandes.component.scss']
})
export class DetailsCompagnieListCommandesComponent implements OnInit {
  public compagnie!: Compagnie;
  public commandes: Array<Commande> = [];
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
    const params = {
      searchTerm: '',
      idCompagnie: this.compagnie.id,
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


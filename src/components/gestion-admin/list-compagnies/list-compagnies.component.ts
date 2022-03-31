import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";

import {ToastService} from "../../../services/toast.service";
import {CompagnieService} from "../../../services/compagnie.service";
import {PopinService} from "../../../services/popin.service";

import {Compagnie} from "../../../models/compagnie.model";
import {PopinConfirmComponent} from "../../shared/popins/popin-confirm/popin-confirm.component";
import {LIST_COMPAGNIE_STATUS} from "../../../models/compagnie-status.model";
import {Pagination} from "../../../models/pagination.model";

@Component({
  selector:  'app-list-compagnies',
  templateUrl: `./list-compagnies.component.html`,
  styleUrls: ['./list-compagnies.component.scss']
})
export class ListCompagniesComponent implements OnInit {

  public searchForm!: FormGroup;

  public compagnies: Array<Compagnie> = [];
  public pagination!: Pagination;


  constructor(private toast: ToastService,
              private popinService: PopinService,
              private compagnieService: CompagnieService,
              private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
    this.search();
  }

  search(): void {

    const params = Object.assign({
      page: this.pagination?.currentPage || 1,
      searchTerm: this.searchForm.value.searchTerm,
      status: [
        LIST_COMPAGNIE_STATUS.VALIDE.code,
        LIST_COMPAGNIE_STATUS.BLOQUE.code,
        LIST_COMPAGNIE_STATUS.EN_ATTENTE_VALIDATION.code,
        LIST_COMPAGNIE_STATUS.NON_VALIDE.code,
      ]
    });
    this.popinService.showLoader();
    this.compagnieService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.compagnies = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.popinService.closeLoader()
    })
  }

  goToEditCompagnie(compagnie: Compagnie): void {
    this.router.navigate(['administration', 'compagnie', compagnie.id]);
  }

  removeCompagnie(compagnie: Compagnie): void {
    this.popinService.openPopin(PopinConfirmComponent, {
      data: {
        description: `Voulez-vous supprimer cette compagnie`,
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
        this.compagnieService.delete(compagnie.id).subscribe({
          next: () => this.toast.success(`La compagnie est supprimée`),
          error: (err: any) => this.toast.genericError(err),
          complete: () => this.search()
        })
      }
    });
  }

  goToAddCompagnie(): void {
    this.router.navigate(['administration', 'compagnie',]);
  }
}


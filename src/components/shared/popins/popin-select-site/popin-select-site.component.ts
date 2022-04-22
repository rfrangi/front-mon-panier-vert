import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {SiteService} from "../../../../services/site.service";

import {Compagnie} from "../../../../models/compagnie.model";
import {Produit} from "../../../../models/produit.model";
import {Site} from "../../../../models/site.model";
import {Pagination} from "../../../../models/pagination.model";
import {LIST_SITE_STATUS} from "../../../../models/site-status.model";
import {PanierService} from "../../../../services/panier.service";
import {PopinService} from "../../../../services/popin.service";
import {PopinConfirmComponent} from "../popin-confirm/popin-confirm.component";

export interface DialogData {
  compagnie: Compagnie;
  produit: Produit;
}

@Component({
  selector:  'app-popin-select-site',
  templateUrl: `./popin-select-site.component.html`,
  styleUrls: ['./popin-select-site.component.scss']
})
export class PopinSelectSiteComponent implements OnInit {

  public sites: Array<Site> = [];
  public pagination: Pagination = new Pagination({});

  public searchForm!: FormGroup;
  public siteSelected!: Site;

  constructor(private toast: ToastService,
              public dialogRef: MatDialogRef<PopinSelectSiteComponent>,
              private siteService: SiteService,
              private panierService: PanierService,
              private popinService: PopinService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
    this.search();
  }

  public changeSite(site: Site): void {
    this.siteSelected = site;
    if(this.siteService.site.id && this.siteService.site.id !== site.id && this.panierService.panier.produits.size > 0) {
      this.popinService.openPopin(PopinConfirmComponent, {
        data: {
          description: `Vous êtes sur le point de changer de site. Ce changement va supprimer vos achats en cours. Voulez-vous continuer ? `,
          hasBtnBack: true,
          hasTitle: true,
          title: 'Confirmation',
          hasBtnConfirm: true,
          textConfirm: 'Valider',
          textBack: 'Annuler',
        }
      }).subscribe((result: any) => {
        if (result) {
          this.panierService.removeAll();
          this.updateSite(site);
        }
      });
    } else {
      this.updateSite(site);
    }
  }

  private updateSite(site: Site): void {
    this.siteService.updateSiteSelected(site);
    this.toast.success(`Vous venez de choisir le '${this.siteSelected.name}'.`)
    this.dialogRef.close({result: true});
  }

  public search(): void {
    const params = Object.assign({
      page: this.pagination?.currentPage || 1,
      searchByAdresse: this.searchForm.value.searchTerm || '',
      status: [
        LIST_SITE_STATUS.ACTIF.code
      ]
    });
    this.siteService.getAllByParams(params, false).subscribe({
      next: (data: any) => {
        this.sites = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
    });
  }

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }
}

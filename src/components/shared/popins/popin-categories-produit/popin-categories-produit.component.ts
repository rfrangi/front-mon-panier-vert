import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router} from '@angular/router';

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";

import { ProduitCategorie} from "../../../../models/produit-categorie.model";
import {Site} from "../../../../models/site.model";
import {Compagnie} from "../../../../models/compagnie.model";
import {PopinSelectSiteComponent} from "../popin-select-site/popin-select-site.component";

export interface DialogData {
  categories: Array<ProduitCategorie>,
  site: Site
}
@Component({
  selector:  'app-popin-categories-produit',
  templateUrl: `./popin-categories-produit.component.html`,
  styleUrls: ['./popin-categories-produit.component.scss']

})
export class PopinCategoriesProduitComponent {

  constructor(public dialog: MatDialog,
              private toast: ToastService,
              private router: Router,
              private popinService: PopinService,
              private siteService: SiteService,
              public dialogRef: MatDialogRef<PopinCategoriesProduitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }

  public submit(): void {
    this.dialogRef.close({
      result: true
    });
  }

  public goToCategorieProduit(cat: ProduitCategorie): void {
    this.cancel();
    this.router.navigate([cat.code]);
  }

  public showPopinSelectedSite(): void {
    localStorage.removeItem('site-selected');
    this.popinService.openPopin(PopinSelectSiteComponent, {
      width: '80%',
    }).subscribe((data: any) => {
      if (data?.result) {
        this.cancel();
        this.showPopinCategorie();
      }
    });
  }

  private showPopinCategorie(): void {
    const val = localStorage.getItem('site-selected');
    if (val) {
      const site = new Site(JSON.parse(val));
      this.siteService.getById(site.id).subscribe({
        next: (site: Site) => {
          const categories = new Set(site.compagnies.flatMap((c: Compagnie) => c.categories));
          this.popinService.openPopin(PopinCategoriesProduitComponent, {
            data: {
              site: site,
              categories: categories
            }
          });
        }
      })
    }
  }
}


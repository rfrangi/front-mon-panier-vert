
import {Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import {Compagnie} from "../../../../models/compagnie.model";
import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {CompagnieService} from "../../../../services/compagnie.service";
import {FormControl, FormGroup } from '@angular/forms';
import {Site} from "../../../../models/site.model";
import {CompagnieStatus, LIST_COMPAGNIE_STATUS} from "../../../../models/compagnie-status.model";
import {Pagination} from "../../../../models/pagination.model";

export interface DialogData {
  site: Site;
}

@Component({
  selector: 'app-popin-add-compagnie-on-site',
  templateUrl: `./popin-add-compagnie-on-site.component.html`,
  styleUrls: ['./popin-add-compagnie-on-site.component.scss'],
})
export class PopinAddCompagnieOnSiteComponent {

  public compagnieSite: Array<Compagnie> = [];
  public compagniesSearch: Array<Compagnie> = [];

  public searchForm!: FormGroup;

  public pagination: Pagination = new Pagination();

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<PopinAddCompagnieOnSiteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private toast: ToastService,
              private popinService: PopinService,
              private compagnieService: CompagnieService) {
    this.compagnieSite = data.site.compagnies.map((c: Compagnie) => new Compagnie(c.serialize()));
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
    this.search();
  }

  public search(): void {
    const params = Object.assign({
      page: this.pagination.currentPage,
      searchTerm: this.searchForm.value.searchTerm,
      status: [ LIST_COMPAGNIE_STATUS.VALIDE.code ]
    });

    this.compagnieService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.compagniesSearch = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
    })
  }

  public changeListSelected(matCheckboxChange: any, compagnie: Compagnie): void {
      if(matCheckboxChange.checked) {
        this.compagnieSite.push(compagnie);
      } else {
        const index = this.compagnieSite.map((c: Compagnie) => c.id).indexOf(compagnie.id, 0);
        this.compagnieSite.splice(index, 1);
      }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public valider(): void {
    this.dialogRef.close(this.compagnieSite);
  }

  public check(compagnie: Compagnie): boolean {
    return this.compagnieSite.map((c: Compagnie) => c.id).includes(compagnie.id);
  }

}


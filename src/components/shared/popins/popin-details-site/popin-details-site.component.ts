import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Site} from "../../../../models/site.model";

export interface DialogData { site: Site;}

@Component({
  selector:  'app-popin-details-site',
  templateUrl: `./popin-details-site.component.html`,
  styleUrls: ['./popin-details-site.component.scss']
})
export class PopinDetailsSiteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopinDetailsSiteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }
}

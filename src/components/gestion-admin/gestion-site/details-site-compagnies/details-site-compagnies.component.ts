import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {PopinService} from "../../../../services/popin.service";
import {SiteService} from "../../../../services/site.service";

import {LIST_PAYS, Pays} from "../../../../models/pays.model";
import {Site} from "../../../../models/site.model";
import {LIST_SITE_STATUS, SiteStatus} from "../../../../models/site-status.model";

@Component({
  selector:  'app-gestion-admin-details-site-compagnies',
  templateUrl: `./details-site-compagnies.component.html`,
  styleUrls: ['./details-site-compagnies.component.scss']
})
export class DetailsSiteCompagniesComponent implements OnInit {

  public site!: Site;
  public siteForm!: FormGroup;
  public listPays: Array<Pays> = Object.values(LIST_PAYS);
  public listStatus: Array<SiteStatus> = Object.values(LIST_SITE_STATUS);
  public step: number = 0;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private router: Router,
              private popinService: PopinService) {}

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        console.log(params);
      });
    }
  }
}


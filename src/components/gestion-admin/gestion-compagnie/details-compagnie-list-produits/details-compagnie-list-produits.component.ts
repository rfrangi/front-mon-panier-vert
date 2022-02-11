import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PopinService} from "../../../../services/popin.service";
import {CompagnieService} from "../../../../services/compagnie.service";
import {ToastService} from "../../../../services/toast.service";
import {Compagnie} from "../../../../models/compagnie.model";

@Component({
  selector:  'app-produits-compagnie',
  templateUrl: `./details-compagnie-list-produits.component.html`,
  styleUrls: ['./details-compagnie-list-produits.component.scss']
})
export class DetailsCompagnieListProduitsComponent implements OnInit {

  public compagnie!: Compagnie;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private compagnieService: CompagnieService,
              private router: Router,
              private popinService: PopinService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.onParamsChange(params);
    });
  }

  onParamsChange(params: any): any {
    if (params.id) {
      this.compagnieService.getById(params.id).subscribe(
        (compagnie: Compagnie) => {
          this.compagnie = compagnie;
        },
        err => this.toast.genericError(err)
      );
    } else {
      this.compagnie = new Compagnie();
    }
  }
}


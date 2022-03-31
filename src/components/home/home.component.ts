import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProduitService} from "../../services/produit.service";
import {Produit} from "../../models/produit.model";

@Component({
  selector:  'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public produits: Array<Produit> = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private produitService: ProduitService) {
    this.router = router;
    this.route = route;
  }

  public ngOnInit(): void {
    this.produitService.getAllByParams({}).subscribe({
      next: (result: any) => {
        console.log(result);
      }
    })
  }
}

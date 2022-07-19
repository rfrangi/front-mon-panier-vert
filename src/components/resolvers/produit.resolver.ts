import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {Site} from "../../models/site.model";
import {SiteService} from "../../services/site.service";
import {Produit} from "../../models/produit.model";
import {ProduitService} from "../../services/produit.service";
import { take, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProduitResolver implements Resolve<Produit> {

  constructor(private produitService: ProduitService, private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const ref: any = route?.params?.['ref'];
  /*  return this.produitService.getByRef(ref).subscribe({
      next: (produit: Produit) => {
        return produit;
      }
    });*/

    return this.produitService.getByRef(ref).pipe(
      take(1),
      map((p: any) => {
        return p;
      }));
  }
}

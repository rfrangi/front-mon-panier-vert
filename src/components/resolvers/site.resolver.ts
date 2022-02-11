import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {Site} from "../../models/site.model";
import {SiteService} from "../../services/site.service";

@Injectable({providedIn: 'root'})
export class SiteResolver implements Resolve<Site> {

  constructor(private siteService: SiteService, private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
   // console.log(route, this.route, state);
    const idSite: any = route?.params?.['id'];
    return idSite;
    /*  return this.siteService.getById(idSite).subscribe({
        next: (site: Site) => {
          console.log(site);
          return site;
        }
      });*/
  }
}

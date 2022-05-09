import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {AuthUserService} from "../services/auth-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthUserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.authService.isValid()) {
      this.router.navigateByUrl('/auth/login?pastURL=mon-panier');
    }
    return true;
  }
}

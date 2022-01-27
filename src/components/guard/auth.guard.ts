import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthUserService} from "../../services/auth-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private userTokenService: AuthUserService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    console.log('guard', this.userTokenService.getUser(), this.userTokenService.isTokenExpired());
    if (this.userTokenService.getUser()) {
      if (this.userTokenService.isTokenExpired()) {

        // Should Redirect Sig-In Page
      } else {
        return true;
      }
    } else {
      return new Promise((resolve) => {
        /*this.loginService.signIncallBack().then((e) => {
          resolve(true);
        }).catch((e) => {
          // Should Redirect Sign-In Page
        });*/
      });
    }
  }
}

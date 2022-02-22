import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {AuthUserService} from "../../services/auth-user.service";

import {UserToken} from "../../models/user-token.model";
import {
  PopinAddCompagnieOnSiteComponent
} from "../gestion-admin/gestion-site/popin-add-compagnie-on-site/popin-add-compagnie-on-site.component";
import {Compagnie} from "../../models/compagnie.model";
import {Site} from "../../models/site.model";
import {
  PopinCategoriesProduitComponent
} from "../shared/popins/popin-categories-produit/popin-categories-produit.component";
import {PopinService} from "../../services/popin.service";

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public searchTerm!: string;
  public labelUsername: string = 'Mon compte';

  private userToken!: UserToken;
  private authUser$!: Subscription;

  @ViewChild('formSearch') formSearch!: ElementRef;
  @ViewChild('blockLogo') blockLogo!: ElementRef;
  @ViewChild('blockProduit') blockProduit!: ElementRef;
  @ViewChild('blockSearch') blockSearch!: ElementRef;
  @ViewChild('blockProducteurs') blockProducteurs!: ElementRef;
  @ViewChild('blockBasket') blockBasket!: ElementRef;

  constructor(private router: Router,
              private popinService: PopinService,
              private authUserService: AuthUserService
  ) {}

  public ngOnInit(): void {
    this.authUser$ = this.authUserService.userTokenSubject.subscribe({
      next: (userToken: UserToken) => {
        this.userToken = userToken;
        this.labelUsername = (this.authUserService.isValid() ? this.authUserService.getUser().firstname : 'Mon compte');
      }
    });
  }

  public ngOnDestroy(): void {
      this.authUser$.unsubscribe();
  }

  public displayZoneSearch(): void {
    this.blockLogo.nativeElement.classList.add('remove-block');
    this.blockProduit.nativeElement.classList.add('remove-block');
    this.blockProducteurs.nativeElement.classList.add('remove-block');
    this.blockSearch.nativeElement.classList.add('remove-block');
    this.blockBasket.nativeElement.classList.add('remove-block');
    this.formSearch.nativeElement.classList.add('display-block-search');
  }

  public removeZoneSearch(): void {
    this.blockLogo.nativeElement.classList.remove('remove-block');
    this.blockProduit.nativeElement.classList.remove('remove-block');
    this.blockProducteurs.nativeElement.classList.remove('remove-block');
    this.blockSearch.nativeElement.classList.remove('remove-block');
    this.blockBasket.nativeElement.classList.remove('remove-block');
    this.formSearch.nativeElement.classList.remove('display-block-search');
  }

  public checkLogin(): void {
    if(!this.authUserService.isValid()) {
      this.router.navigate(['auth', 'login']);
    }
  }

  public logout(): void {
    this.authUserService.logout();
    this.router.navigate(['home']);
  }

  public goToUrls(urls: Array<string> = []): void {
    this.router.navigate(urls);
  }

  public showPopinCategorie(): void {
    this.popinService.openPopin(PopinCategoriesProduitComponent, {})
  }
}

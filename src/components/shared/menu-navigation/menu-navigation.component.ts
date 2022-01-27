import { Component, Input, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthUserService} from "../../../services/auth-user.service";
import {ItemNavigation} from "../../../models/item-navigation.model";

@Component({
  selector:  'app-menu-navigation',
  templateUrl: `./menu-navigation.component.html`,
  styleUrls: ['./menu-navigation.component.scss']
})
export class MenuNavigationComponent implements OnInit {

  @Input() items: Array<ItemNavigation> = [];

  constructor(private authService: AuthUserService, private router: Router) {}

  ngOnInit(): void {}

  public isActive(path: string): boolean {
    return this.router.routerState.snapshot.url.includes(path);
  }

  goToUrl(urls: Array<string> = []): void {
    this.router.navigate(urls);
  }

}


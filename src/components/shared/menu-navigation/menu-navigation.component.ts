import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthUserService} from "../../../services/auth-user.service";
import {ItemNavigation} from "../../../models/item-navigation.model";

@Component({
  selector:  'app-menu-navigation',
  templateUrl: `./menu-navigation.component.html`,
  styleUrls: ['./menu-navigation.component.scss']
})
export class MenuNavigationComponent implements OnInit {
  showFiller = false;
  @Input() items: Array<ItemNavigation> = [];
  @Input() ongletSelected!: string;


  constructor(private authService: AuthUserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ongletSelected = this.items[0].label;
  }

  public isActive(path: string): boolean {
    return this.router.routerState.snapshot.url.includes(path);
  }

  goToUrl(items: ItemNavigation): void {
    this.ongletSelected = items.label;
    this.router.navigate(items.urls);
  }

  get isMobile(): boolean {
    return window.innerWidth < 993;
  }
}


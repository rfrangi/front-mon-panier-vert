import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ItemNavigation} from "../../../models/item-navigation.model";
import {User} from "../../../models/user.model";

import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector:  'app-my-account',
  templateUrl: `./my-account.component.html`,
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  public user!: User;

  constructor(private authUserService: AuthUserService,
              private router: Router) {}

  ngOnInit(): void {
    this.user = this.authUserService.getUser();
  }

  public goTo(urls: Array<string> = []): void {
    this.router.navigate(urls);
  }
}

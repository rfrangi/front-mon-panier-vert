import { Component, Input } from '@angular/core';
import { Router} from '@angular/router';
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector:  'app-fil-ariane',
  templateUrl: `./fil-ariane.component.html`,
  styleUrls: ['./fil-ariane.component.scss']
})
export class FilArianeComponent {

  @Input() breadcrumbItems: Array<{ label: string, urls: Array<string>, queryParams: {} }> = [];

  public linkAccueil = {label: 'Accueil', urls: [''], queryParams: {}} as any;

  constructor(private authService: AuthUserService,
              private router: Router) {}

  public goToUrls(breadcrumbItem :{ label: string, urls: Array<string>, queryParams: {} }): void {
    console.log(breadcrumbItem);
    this.router.navigate(breadcrumbItem.urls, { queryParams: breadcrumbItem.queryParams });
  }
}


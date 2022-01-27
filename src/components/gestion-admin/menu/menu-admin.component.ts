import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector:  'app-menu-gestion-admin',
  templateUrl: `./menu-admin.component.html`,
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {

  items: Array<any> = [
    { name: 'Utilisateurs', icon: 'supervisor_account', urls: [ 'administration', 'utilisateurs' ]},
    { name: 'Compagnies', icon: 'account_balance', urls: [ 'administration', 'compagnies' ]},
    { name: 'Commandes', icon: 'work', urls: [ 'administration', 'commandes' ]},
    { name: 'Sites', icon: 'group_work', urls: [ 'administration', 'sites' ]},
    { name: 'Paramètres', icon: 'settings', urls: [ 'administration', 'parametres' ]},
    { name: 'Email', icon: 'mail', urls: [ 'administration', 'emails' ]},
  ];

  constructor(private router: Router) {}

  goToUrl(urls: Array<string>): void {
    this.router.navigate(urls);
  }
}

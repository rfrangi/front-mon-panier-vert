import { Component } from '@angular/core';

import {ItemNavigation} from "../../models/item-navigation.model";

@Component({
  selector:  'app-gestion-user',
  templateUrl: `./gestion-user.component.html`,
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent {

  public items: Array<ItemNavigation> = [
    new ItemNavigation({code: 'COMPTE', label: `Mon compte`, urls: ['utilisateur', 'mon-compte'], icon: '', active: 'mon-compte'}),
    new ItemNavigation({code: 'COMMANDES', label: 'Mes commandes', urls: ['utilisateur', 'commandes'], icon: '', active: 'commandes'}),
    new ItemNavigation({code: 'FACTURES', label: 'Mes Factures', urls: ['utilisateur', 'factures'], icon: '', active: 'factures'})
  ]
}

import { Component,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ItemNavigation} from "../../../models/item-navigation.model";

@Component({
  selector:  'app-gestion-compagnie',
  templateUrl: `./gestion-compagnie.component.html`,
  styleUrls: ['./gestion-compagnie.component.scss']
})
export class GestionCompagnieComponent  {

  private id!: string;
  public items: Array<ItemNavigation> = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route) {
      this.route.params.subscribe(params => {
        this.id = params['id']
        this.items = [
          new ItemNavigation({code: 'INFORMATIONS', label: `Informations`, urls: ['administration', 'compagnie', this.id, 'informations'], icon: '', active: 'informations'}),
          new ItemNavigation({code: 'COMMANDES', label: 'Commandes', urls: ['administration', 'compagnie', this.id, 'commandes'], icon: '', active: 'commandes'}),
          new ItemNavigation({code: 'PRODUITS', label: 'Produits', urls: ['administration', 'compagnie', this.id, 'produits'], icon: '', active: 'produits'})
        ]
      });
    }
  }
}


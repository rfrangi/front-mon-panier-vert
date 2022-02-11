import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ItemNavigation} from "../../../models/item-navigation.model";

@Component({
  selector:  'app-gestion-site',
  templateUrl: `./gestion-site.component.html`,
  styleUrls: ['./gestion-site.component.scss']
})
export class GestionSiteComponent {

  private id!: string;
  public items: Array<ItemNavigation> = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route) {
      this.route.params.subscribe(params => {
        this.id = params['id']
        this.items = [
          new ItemNavigation({
            code: 'INFORMATIONS',
            label: `Informations`,
            urls: ['administration', 'site', this.id, 'informations'],
            icon: '',
            active: 'informations'
          }),
          new ItemNavigation({
            code: 'COMMANDES',
            label: 'Commandes',
            urls: ['administration', 'site', this.id, 'commandes'],
            icon: '',
            active: 'commandes'
          }),
          new ItemNavigation({
            code: 'COMPAGNIES',
            label: 'Compagnies',
            urls: ['administration', 'site', this.id, 'compagnies'],
            icon: '',
            active: 'compagnies'
          }),
          new ItemNavigation({
            code: 'PRODUITS',
            label: 'Produits',
            urls: ['administration', 'site', this.id, 'produits'],
            icon: '',
            active: 'produits'
          })
        ]
      });
    }
  }
}

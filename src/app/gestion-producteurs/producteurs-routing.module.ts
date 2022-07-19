
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionProducteurComponent} from '../../components/gestion-producteur/gestion-producteur.component';
import {
  ListProducteursComponent
} from "../../components/gestion-producteur/list-producteurs/list-producteurs.component";
import {
  DetailsProducteursComponent
} from "../../components/gestion-producteur/details-producteur/details-producteurs.component";

export const routes: Routes = [
  { path: '', component: GestionProducteurComponent, children: [
      { path: '', component: ListProducteursComponent },
      { path: ':id', component: DetailsProducteursComponent }
      ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProducteursRoutingModule { }

import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProducteursRoutingModule} from './producteurs-routing.module';
import {GestionProducteurComponent} from '../../components/gestion-producteur/gestion-producteur.component';
import {SharedModule} from '../shared/shared.module';
import {
  DetailsProducteursComponent
} from "../../components/gestion-producteur/details-producteur/details-producteurs.component";
import {
  ListProducteursComponent
} from "../../components/gestion-producteur/list-producteurs/list-producteurs.component";

@NgModule({
  declarations: [
    GestionProducteurComponent,
    DetailsProducteursComponent,
    ListProducteursComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProducteursRoutingModule
  ]
})
export class ProducteursModule { }


import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {GestionPanierRoutingModule} from './gestion-panier-routing.module';
import {SharedModule} from '../shared/shared.module';

import {MonPanierComponent} from "../../components/gestion-panier/mon-panier/mon-panier.component";
import {
  CommandeStatusComponent
} from "../../components/gestion-panier/commande-success/commande-status..component";

@NgModule({
  declarations: [
    MonPanierComponent,
    CommandeStatusComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GestionPanierRoutingModule
  ]
})
export class GestionPanierModule { }

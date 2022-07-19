import { NgModule } from '@angular/core';
import {GestionProduitRoutingModule} from './gestion-produit-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {PageProduitComponent} from "../../components/gestion-produit/page-produit/page-produit..component";

@NgModule({
  declarations: [
    PageProduitComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GestionProduitRoutingModule
  ]
})
export class GestionProduitModule { }

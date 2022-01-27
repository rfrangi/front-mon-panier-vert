
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProducteursComponent} from '../../components/producteurs/producteurs.component';

export const routes: Routes = [
  { path: '', component: ProducteursComponent},


];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProducteursRoutingModule { }

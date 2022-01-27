import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProducteursRoutingModule} from './producteurs-routing.module';
import {ProducteursComponent} from '../../components/producteurs/producteurs.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ProducteursComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProducteursRoutingModule
  ]
})
export class ProducteursModule { }


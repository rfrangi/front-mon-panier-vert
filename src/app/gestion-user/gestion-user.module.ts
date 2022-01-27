import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {GestionUserRoutingModule} from './gestion-user-routing.module';
import {SharedModule} from '../shared/shared.module';

import {MyAccountComponent} from '../../components/gestion-user/my-account/my-account.component';
import {GestionUserComponent} from '../../components/gestion-user/gestion-user.component';
import { ListCommandesComponent } from "../../components/gestion-user/mes-commandes/list-commandes.component";
import { ListFacturesComponent} from "../../components/gestion-user/list-factures/list-factures.component";

@NgModule({
  declarations: [
    MyAccountComponent,
    GestionUserComponent,
    ListCommandesComponent,
    ListFacturesComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GestionUserRoutingModule
  ]
})
export class GestionUserModule { }

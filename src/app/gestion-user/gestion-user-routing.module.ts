
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionUserComponent} from '../../components/gestion-user/gestion-user.component';
import {MyAccountComponent} from '../../components/gestion-user/my-account/my-account.component';
import {AccountListCommandesComponent} from "../../components/gestion-user/mes-commandes/account-list-commandes.component";
import {ListFacturesComponent} from "../../components/gestion-user/list-factures/list-factures.component";

export const routes: Routes = [
  { path: '', component: GestionUserComponent, children: [
      { path: 'mon-compte', component: MyAccountComponent },
      { path: 'commandes', component: AccountListCommandesComponent },
      { path: 'factures', component: ListFacturesComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionUserRoutingModule { }


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionUserComponent} from '../../components/gestion-user/gestion-user.component';
import {LoginFormComponent} from '../../components/gestion-guest-user/login/login-form.component';
import {SignupComponent} from '../../components/gestion-guest-user/signup/signup.component';
import {MyAccountComponent} from '../../components/gestion-user/my-account/my-account.component';
import {ForgotPasswordComponent} from '../../components/gestion-guest-user/forgot-password/forgot-password.component';
import {ListCommandesComponent} from "../../components/gestion-user/mes-commandes/list-commandes.component";
import {ListFacturesComponent} from "../../components/gestion-user/list-factures/list-factures.component";

export const routes: Routes = [
  { path: '', component: GestionUserComponent, children: [
      { path: 'mon-compte', component: MyAccountComponent },
      { path: 'commandes', component: ListCommandesComponent },
      { path: 'factures', component: ListFacturesComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionUserRoutingModule { }

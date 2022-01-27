
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionUserComponent} from '../../components/gestion-user/gestion-user.component';
import {LoginFormComponent} from '../../components/gestion-guest-user/login/login-form.component';
import {SignupComponent} from '../../components/gestion-guest-user/signup/signup.component';
import {MyAccountComponent} from '../../components/gestion-user/my-account/my-account.component';
import {ForgotPasswordComponent} from '../../components/gestion-guest-user/forgot-password/forgot-password.component';
import {GestionGuestUserComponent} from "../../components/gestion-guest-user/gestion-guest-user.component";

export const routes: Routes = [
  { path: '', component: GestionGuestUserComponent, children: [
      { path: '',  redirectTo: 'login', pathMatch: 'full' },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionGuestUserRoutingModule { }

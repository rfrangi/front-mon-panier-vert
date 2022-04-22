
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent} from '../../components/gestion-guest-user/login/login-form.component';
import {SignupComponent} from '../../components/gestion-guest-user/signup/signup.component';
import {ForgotPasswordComponent} from '../../components/gestion-guest-user/forgot-password/forgot-password.component';
import {GestionGuestUserComponent} from "../../components/gestion-guest-user/gestion-guest-user.component";
import {ResetPasswordComponent} from "../../components/gestion-guest-user/reset-password/reset-password.component";

export const routes: Routes = [
  { path: '', component: GestionGuestUserComponent, children: [
      { path: '',  redirectTo: 'login', pathMatch: 'full' },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent },

    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionGuestUserRoutingModule { }

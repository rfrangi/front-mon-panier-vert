import { NgModule } from '@angular/core';
import {GestionGuestUserRoutingModule} from './gestion-guest-user-routing.module';
import {LoginFormComponent} from '../../components/gestion-guest-user/login/login-form.component';
import {SignupComponent} from '../../components/gestion-guest-user/signup/signup.component';
import {SharedModule} from '../shared/shared.module';
import {ForgotPasswordComponent} from '../../components/gestion-guest-user/forgot-password/forgot-password.component';
import {CommonModule} from '@angular/common';
import { HeaderGuestUserComponent } from '../../components/gestion-guest-user/header-gestion-user/header-gestion-user.component';
import {GestionGuestUserComponent} from "../../components/gestion-guest-user/gestion-guest-user.component";

@NgModule({
  declarations: [
    LoginFormComponent,
    SignupComponent,
    HeaderGuestUserComponent,
    ForgotPasswordComponent,
    GestionGuestUserComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GestionGuestUserRoutingModule
  ]
})
export class GestionGuestUserModule { }

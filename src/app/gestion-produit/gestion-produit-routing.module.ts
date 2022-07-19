
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent} from '../../components/gestion-guest-user/login/login-form.component';
import {SignupComponent} from '../../components/gestion-guest-user/signup/signup.component';
import {ForgotPasswordComponent} from '../../components/gestion-guest-user/forgot-password/forgot-password.component';
import {GestionGuestUserComponent} from "../../components/gestion-guest-user/gestion-guest-user.component";
import {ResetPasswordComponent} from "../../components/gestion-guest-user/reset-password/reset-password.component";
import {PageProduitComponent} from "../../components/gestion-produit/page-produit/page-produit..component";
import {SiteResolver} from "../../components/resolvers/site.resolver";
import {ProduitResolver} from "../../components/resolvers/produit.resolver";

export const routes: Routes = [
  { path: ':ref', component: PageProduitComponent, resolve: { produit: ProduitResolver } },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionProduitRoutingModule { }

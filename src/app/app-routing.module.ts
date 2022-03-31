
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {ForgotPasswordComponent} from "../components/gestion-guest-user/forgot-password/forgot-password.component";
import {LoginFormComponent} from "../components/gestion-guest-user/login/login-form.component";
import {SignupComponent} from "../components/gestion-guest-user/signup/signup.component";
import {GestionCategorieComponent} from "../components/gestion-categorie/gestion-categorie.component";
import {MonPanierComponent} from "../components/mon-panier/mon-panier.component";

export const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'mon-panier', component: MonPanierComponent},
  { path: 'produits', component: HomeComponent},
  { path: 'producteurs', loadChildren: () => import('./producteurs/producteurs.module').then(p => p.ProducteursModule)},
  { path: 'utilisateur', loadChildren: () => import('./gestion-user/gestion-user.module').then(p => p.GestionUserModule)},
  { path: 'auth', loadChildren: () => import('./gestion-guest-user/gestion-guest-user.module').then(p => p.GestionGuestUserModule)},
  { path: 'administration', loadChildren: () => import('./admin/admin.module').then(p => p.AdminModule)},
  { path: ':categorie', component: GestionCategorieComponent },

];
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  useHash: true
};


@NgModule({
  imports: [ RouterModule.forRoot(routes, routingConfiguration) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {GestionCategorieComponent} from "../components/gestion-categorie/gestion-categorie.component";

export const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'mon-panier', loadChildren: () => import('./gestion-panier/gestion-panier.module').then(p => p.GestionPanierModule)},
  { path: 'produits', loadChildren: () => import('./gestion-produit/gestion-produit.module').then(p => p.GestionProduitModule)},
  { path: 'producteurs', loadChildren: () => import('./gestion-producteurs/producteurs.module').then(p => p.ProducteursModule)},
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

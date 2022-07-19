
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonPanierComponent} from "../../components/gestion-panier/mon-panier/mon-panier.component";
import {AuthGuard} from "../../guards/auth.guard";
import {CommandeStatusComponent} from "../../components/gestion-panier/commande-success/commande-status..component";

export const routes: Routes = [
  { path: '', children: [
      { path: '', component: MonPanierComponent, canActivate: [AuthGuard] },
      { path: ':ref/success', component: CommandeStatusComponent },
      { path: 'error', component: CommandeStatusComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionPanierRoutingModule { }

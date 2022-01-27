
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GestionAdminComponent} from "../../components/gestion-admin/gestion-admin.component";
import {MenuAdminComponent} from "../../components/gestion-admin/menu/menu-admin.component";
import {ListUsersComponent} from "../../components/gestion-admin/list-users/list-users.component";
import {ListCompagniesComponent} from "../../components/gestion-admin/list-compagnies/list-compagnies.component";
import {ListSitesComponent} from "../../components/gestion-admin/list-sites/list-sites.component";
import {ListEmailsComponent} from "../../components/gestion-admin/list-emails/list-emails.component";
import { DetailsSiteInformationsComponent } from "../../components/gestion-admin/gestion-site/details-site-informations/details-site-informations.component";
import {DetailsUsersComponent} from "../../components/gestion-admin/details-user/details-users.component";
import {
  DetailsCompagniesComponent
} from "../../components/gestion-admin/gestion-compagnie/details-compagnie/details-compagnies.component";
import {GestionCompagnieComponent} from "../../components/gestion-admin/gestion-compagnie/gestion-compagnie.component";
import {
  ListCommandesCompagnieComponent
} from "../../components/gestion-admin/gestion-compagnie/list-commandes-compagnie/list-commandes-compagnie.component";
import {
  ListProduitsCompagnieComponent
} from "../../components/gestion-admin/gestion-compagnie/list-produits-compagnie/list-produits-compagnie.component";

export const routes: Routes = [
  { path: '', component: GestionAdminComponent, children: [
      { path: '', component: MenuAdminComponent },
      { path: 'utilisateurs', children: [
          { path: '', component: ListUsersComponent },
          { path: ':id', component: DetailsUsersComponent },

        ], },
      { path: 'compagnies', component: ListCompagniesComponent },
      { path: 'compagnie', children: [
          { path: '', component: DetailsCompagniesComponent },
          { path: ':id',  component: GestionCompagnieComponent, children: [
              { path: '',  redirectTo: 'informations', pathMatch: 'full' },
              { path: 'informations', component: DetailsCompagniesComponent },
              { path: 'commandes', component: ListCommandesCompagnieComponent },
              { path: 'produits', component: ListProduitsCompagnieComponent },
            ]
          },
        ]
      },
      { path: 'sites', component: ListSitesComponent },
      { path: 'site', children: [
          { path: '', component: DetailsSiteInformationsComponent },
          { path: ':id', children: [
              { path: '',  redirectTo: 'informations', pathMatch: 'full' },
              { path: 'informations',  component: DetailsSiteInformationsComponent  },
            ],},

        ]
      },
      { path: 'emails', component: ListEmailsComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }

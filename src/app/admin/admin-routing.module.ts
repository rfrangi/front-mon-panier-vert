
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GestionAdminComponent} from "../../components/gestion-admin/gestion-admin.component";
import {MenuAdminComponent} from "../../components/gestion-admin/menu/menu-admin.component";
import {ListUsersComponent} from "../../components/gestion-admin/list-users/list-users.component";
import {ListCompagniesComponent} from "../../components/gestion-admin/list-compagnies/list-compagnies.component";
import {ListSitesComponent} from "../../components/gestion-admin/list-sites/list-sites.component";
import {ListEmailsComponent} from "../../components/gestion-admin/list-emails/list-emails.component";
import { DetailsSiteInformationsComponent } from "../../components/gestion-admin/gestion-site/details-site-informations/details-site-informations.component";
import {DetailsProduitComponent} from "../../components/gestion-admin/details-produit/details-produit.component";
import {
  DetailsCompagniesInformationsComponent
} from "../../components/gestion-admin/gestion-compagnie/details-compagnie-informations/details-compagnies-informations.component";
import {GestionCompagnieComponent} from "../../components/gestion-admin/gestion-compagnie/gestion-compagnie.component";
import {
  DetailsCompagnieListCommandesComponent
} from "../../components/gestion-admin/gestion-compagnie/details-compagnie-list-commandes/details-compagnie-list-commandes.component";
import {
  DetailsCompagnieListProduitsComponent
} from "../../components/gestion-admin/gestion-compagnie/details-compagnie-list-produits/details-compagnie-list-produits.component";
import {GestionSiteComponent} from "../../components/gestion-admin/gestion-site/gestion-site.component";
import {
  DetailsSiteListCompagniesComponent
} from "../../components/gestion-admin/gestion-site/details-site-list-compagnies/details-site-list-compagnies.component";
import {
  DetailsSiteProduitsComponent
} from "../../components/gestion-admin/gestion-site/details-site-produits/details-site-produits.component";
import {
  DetailsSiteListCommandesComponent
} from "../../components/gestion-admin/gestion-site/details-site-list-commandes/details-site-list-commandes.component";
import {SiteResolver} from "../../components/resolvers/site.resolver";

export const routes: Routes = [
  { path: '', component: GestionAdminComponent, children: [
      { path: '', component: MenuAdminComponent },
      { path: 'utilisateurs', children: [
          { path: '', component: ListUsersComponent },
          { path: ':id', component: DetailsProduitComponent },

        ], },
      { path: 'compagnies', component: ListCompagniesComponent },
      { path: 'compagnie', children: [
          { path: '', component: DetailsCompagniesInformationsComponent },
          { path: ':id',  component: GestionCompagnieComponent, children: [
              { path: '',  redirectTo: 'informations', pathMatch: 'full' },
              { path: 'informations', component: DetailsCompagniesInformationsComponent },
              { path: 'commandes', component: DetailsCompagnieListCommandesComponent },
              { path: 'produits', component: DetailsCompagnieListProduitsComponent },
              { path: 'produit', children: [
                  { path: '',  component: DetailsProduitComponent },
                  { path: ':idProduit',  component: DetailsProduitComponent }
                ]
              },
            ]
          },
        ]
      },
      { path: 'sites', component: ListSitesComponent },
      { path: 'site',  children: [
          { path: '', component: DetailsSiteInformationsComponent },
          { path: ':id',  resolve: { idSite: SiteResolver }, component: GestionSiteComponent, children: [
              { path: '',  redirectTo: 'informations', pathMatch: 'full' },
              { path: 'informations',  component: DetailsSiteInformationsComponent  },
              { path: 'commandes',  component: DetailsSiteListCommandesComponent  },
              { path: 'produits',  component: DetailsSiteProduitsComponent  },
              { path: 'compagnies',  component: DetailsSiteListCompagniesComponent  },
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

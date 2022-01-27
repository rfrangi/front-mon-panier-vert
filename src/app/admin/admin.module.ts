import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from "../shared/shared.module";

import {MenuAdminComponent} from "../../components/gestion-admin/menu/menu-admin.component";
import {GestionAdminComponent} from "../../components/gestion-admin/gestion-admin.component";
import {ListSitesComponent} from "../../components/gestion-admin/list-sites/list-sites.component";
import {ListUsersComponent} from "../../components/gestion-admin/list-users/list-users.component";
import {ListEmailsComponent} from "../../components/gestion-admin/list-emails/list-emails.component";
import {ListCompagniesComponent} from "../../components/gestion-admin/list-compagnies/list-compagnies.component";
import {DetailsUsersComponent} from "../../components/gestion-admin/details-user/details-users.component";
import { DetailsSiteCompagniesComponent } from "../../components/gestion-admin/gestion-site/details-site-compagnies/details-site-compagnies.component";
import { DetailsCompagniesComponent } from "../../components/gestion-admin/gestion-compagnie/details-compagnie/details-compagnies.component";
import {
  DetailsSiteInformationsComponent
} from "../../components/gestion-admin/gestion-site/details-site-informations/details-site-informations.component";
import {GestionSiteComponent} from "../../components/gestion-admin/gestion-site/gestion-site.component";
import {MenuSiteComponent} from "../../components/gestion-admin/gestion-site/menu-site/menu-site.component";
import {GestionCompagnieComponent} from "../../components/gestion-admin/gestion-compagnie/gestion-compagnie.component";
import {
  MenuCompagnieComponent
} from "../../components/gestion-admin/gestion-compagnie/menu-compagnie/menu-compagnie.component";
import {
  ListCommandesCompagnieComponent
} from "../../components/gestion-admin/gestion-compagnie/list-commandes-compagnie/list-commandes-compagnie.component";
import {
  ListProduitsCompagnieComponent
} from "../../components/gestion-admin/gestion-compagnie/list-produits-compagnie/list-produits-compagnie.component";

@NgModule({
  declarations: [
    MenuAdminComponent,
    GestionAdminComponent,

    ListSitesComponent,
    ListUsersComponent,
    ListEmailsComponent,
    ListCompagniesComponent,

    DetailsUsersComponent,

    GestionSiteComponent,
    MenuSiteComponent,
    DetailsSiteInformationsComponent,

    GestionCompagnieComponent,
    DetailsCompagniesComponent,
    MenuCompagnieComponent,
    ListProduitsCompagnieComponent,
    ListCommandesCompagnieComponent,
    DetailsSiteCompagniesComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }

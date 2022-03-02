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
import {DetailsProduitComponent} from "../../components/gestion-admin/details-produit/details-produit.component";
import { DetailsSiteListCompagniesComponent } from "../../components/gestion-admin/gestion-site/details-site-list-compagnies/details-site-list-compagnies.component";
import { DetailsCompagniesInformationsComponent } from "../../components/gestion-admin/gestion-compagnie/details-compagnie-informations/details-compagnies-informations.component";
import {
  DetailsSiteInformationsComponent
} from "../../components/gestion-admin/gestion-site/details-site-informations/details-site-informations.component";
import {GestionSiteComponent} from "../../components/gestion-admin/gestion-site/gestion-site.component";
import {GestionCompagnieComponent} from "../../components/gestion-admin/gestion-compagnie/gestion-compagnie.component";
import {
  DetailsCompagnieListCommandesComponent
} from "../../components/gestion-admin/gestion-compagnie/details-compagnie-list-commandes/details-compagnie-list-commandes.component";
import {
  DetailsCompagnieListProduitsComponent
} from "../../components/gestion-admin/gestion-compagnie/details-compagnie-list-produits/details-compagnie-list-produits.component";
import {
  DetailsSiteProduitsComponent
} from "../../components/gestion-admin/gestion-site/details-site-produits/details-site-produits.component";
import {
  DetailsSiteListCommandesComponent
} from "../../components/gestion-admin/gestion-site/details-site-list-commandes/details-site-list-commandes.component";
import {
  PopinAddCompagnieOnSiteComponent
} from "../../components/gestion-admin/gestion-site/popin-add-compagnie-on-site/popin-add-compagnie-on-site.component";
import {PopinProduitComponent} from "../../components/shared/popins/popin-produit/popin-produit.component";
import {DetailsUsersComponent} from "../../components/gestion-admin/details-user/details-users.component";

@NgModule({
  declarations: [
    MenuAdminComponent,
    GestionAdminComponent,

    ListSitesComponent,
    ListUsersComponent,
    ListEmailsComponent,
    ListCompagniesComponent,

    DetailsProduitComponent,

    GestionSiteComponent,
    DetailsSiteInformationsComponent,
    DetailsSiteListCompagniesComponent,
    DetailsSiteProduitsComponent,
    DetailsSiteListCommandesComponent,
    PopinAddCompagnieOnSiteComponent,

    GestionCompagnieComponent,
    DetailsCompagniesInformationsComponent,
    DetailsCompagnieListProduitsComponent,
    DetailsCompagnieListCommandesComponent,

    PopinProduitComponent,
    DetailsUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }

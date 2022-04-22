import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

import {AdresseFormComponent} from "../../components/shared/adresse/adresse-form/adresse-form.component";
import {DetailsUtilisateurComponent} from "../../components/shared/details-utilisateur/details-utilisateur.component";
import {
  PopinMessageDuringComponent
} from "../../components/shared/popins/popin-message-during/popin-message-during.component";
import {HeaderComponent} from "../../components/header/header.component";
import {MenuNavigationComponent} from "../../components/shared/menu-navigation/menu-navigation.component";
import {PopinConfirmComponent} from "../../components/shared/popins/popin-confirm/popin-confirm.component";
import {
  PopinCategoriesProduitComponent
} from "../../components/shared/popins/popin-categories-produit/popin-categories-produit.component";
import {PaginationComponent} from "../../components/shared/pagination/pagination.component";
import {UploadFileComponent} from "../../components/shared/core/upload-file/upload-file.component";
import {PopinSelectSiteComponent} from "../../components/shared/popins/popin-select-site/popin-select-site.component";
import {FilArianeComponent} from "../../components/shared/fil-ariane/fil-ariane.component";
import {ListProduitComponent} from "../../components/shared/list-produit/list-produit.component";
import {
  PopinRemoveProduitComponent
} from "../../components/shared/popins/popin-remove-produit/popin-remove-produit.component";
import {MatStepperModule} from '@angular/material/stepper';
import {
  PopinDetailsSiteComponent
} from "../../components/shared/popins/popin-details-site/popin-details-site.component";

const materialModules = [
  MatBadgeModule,
  MatDialogModule,
  MatSlideToggleModule,
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatStepperModule
];

const components = [
  AdresseFormComponent,
  DetailsUtilisateurComponent,
  HeaderComponent,
  MenuNavigationComponent,
  PaginationComponent,
  UploadFileComponent,
  FilArianeComponent,
  ListProduitComponent
];

const popins = [
  PopinMessageDuringComponent,
  PopinConfirmComponent,
  PopinSelectSiteComponent,
  PopinCategoriesProduitComponent,
  PopinRemoveProduitComponent,
  PopinDetailsSiteComponent,
]
@NgModule({
  declarations: [
    ...components,
    ...popins
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...materialModules,
    ...components,
    ...popins
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...materialModules,
  ]
})
export class SharedModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {HomeComponent} from '../components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {AuthInterceptor, authInterceptorProviders} from "../interceptors/auth.interceptor";
import {GestionCategorieComponent} from "../components/gestion-categorie/gestion-categorie.component";
import {MonPanierComponent} from "../components/mon-panier/mon-panier.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GestionCategorieComponent,
    MonPanierComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }

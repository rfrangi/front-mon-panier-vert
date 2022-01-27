import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map, Observable} from 'rxjs';

import {environment} from "../environments/environment";

import {Adresse} from "../models/adresse.model";


const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({ providedIn: 'root' })
export class AdresseService {

  constructor(private http: HttpClient) { }

  public update(adresse: Adresse, isModeAdmin = false): Observable<Adresse> {
    const url = isModeAdmin ?  `admin/adresses/${adresse.idAdresse}` : `adresses/${adresse.idAdresse}`;
    return this.http.put<Adresse>(environment.urlAPI + url, adresse.serialize(), HTTP_OPTIONS)
      .pipe(map((x: any) => new Adresse(x)));
  }
}

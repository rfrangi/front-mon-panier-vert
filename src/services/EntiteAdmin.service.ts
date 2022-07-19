
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {Compagnie} from "../models/compagnie.model";
import {Pagination} from "../models/pagination.model";
import {CommandeClient} from "../models/commande-client.model";
import {User} from "../models/user.model";
import {Site} from "../models/site.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class EntiteAdminService {

  constructor(private http: HttpClient) {}

  getAdminForEntite(id: string, type: string): Observable<Array<User>> {
    let url = environment.urlAPI +  `admin/administrateur/entite/user/${id}/type/${type}`;
    return this.http.get(url, HTTP_OPTIONS)
      .pipe(map((response: any) => response.map((val: any) => new User(val))));
  }

  create(body: any): Observable<User> {
    return this.http.post(environment.urlAPI +  `admin/administrateur/entite`, body, HTTP_OPTIONS)
      .pipe(map((response: any) =>  response.map((val: any) => new User(val))))
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/compagnies/${id}`, HTTP_OPTIONS);
  }
}


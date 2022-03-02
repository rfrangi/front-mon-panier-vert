import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map, Observable} from 'rxjs';

import {environment} from "../environments/environment";

import {Pagination} from "../models/pagination.model";
import {Commande} from "../models/commande.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({ providedIn: 'root' })
export class CommandeService {

  constructor(private http: HttpClient) {}

  getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/commande/paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Commande(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  public save(commande: any, isModeAdmin = false): Observable<Commande> {
    return commande.id ? this.update(commande, isModeAdmin) : this.create(commande, isModeAdmin);
  }

  public create(commande: any, isModeAdmin = false): Observable<Commande> {
    const url = `admin/commande`;
    return this.http.post<Commande>(environment.urlAPI + url, commande)
      .pipe(map((x: any) => new Commande(x)));
  }

  public update(commande: any, isModeAdmin = false): Observable<Commande> {
    const url = `admin/commande/${commande.id}`;
     return this.http.put(environment.urlAPI + url, commande).pipe(map((x: any) => new Commande(x)));
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/commande/${id}`, HTTP_OPTIONS);
  }

  public getById(id: string): Observable<Commande> {
    return this.http.get(environment.urlAPI + `admin/commande/${id}`, HTTP_OPTIONS).pipe(
      map((data:any) => new Commande(data))
    );
  }
}

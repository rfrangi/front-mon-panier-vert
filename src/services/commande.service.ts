import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from '../models/user.model';
import {environment} from "../environments/environment";
import {Pagination} from "../models/pagination.model";
import {Commande} from "../models/commande.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({ providedIn: 'root' })
export class CommandeService {

  constructor(private http: HttpClient) { }

  getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/commandes/paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Commande(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  save(commande: any, isModeAdmin = false): Observable<Commande> {
    return commande.id ? this.update(commande, isModeAdmin) : this.create(commande, isModeAdmin);
  }

  create(commande: any, isModeAdmin = false): Observable<Commande> {
    const url = isModeAdmin ?  `admin/commandes` : 'commandes';
    return this.http.post<Commande>(environment.urlAPI + url, commande, HTTP_OPTIONS)
      .pipe(map((x: any) => new Commande(x)));
  }


  update(commande: Commande, isModeAdmin = false): Observable<any> {
    const url = (isModeAdmin ?  `admin/commandes` : 'commandes') + (commande.id ? ('/' + commande.id) : '');
    return this.http.put(environment.urlAPI + url, commande.serialize(), HTTP_OPTIONS).pipe(map((x: any) => new Commande(x)));
  }

 /* updateStatus(commande: Commande): Observable<any> {
    return this.http.put(environment.urlAPI + `admin/commandes/${commande.id}/status`, commande.status.code, HTTP_OPTIONS);
  }
*/

  delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/commandes/${id}`, HTTP_OPTIONS);
  }

  getAll(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/commandes/paginated`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Commande(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  getById(id: any): Observable<Commande>  {
    return this.http.get(environment.urlAPI + `admin/commandes/${id}`, HTTP_OPTIONS)
      .pipe(map((response: any) => new Commande(response)));
  }

  count(): Observable<any>  {
    return this.http.get(environment.urlAPI + `admin/commandes/count`, HTTP_OPTIONS);
  }
}

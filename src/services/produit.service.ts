import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map, Observable} from 'rxjs';

import {environment} from "../environments/environment";

import {Produit} from "../models/produit.model";
import {Pagination} from "../models/pagination.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) {}

  getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/produit/paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Produit(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  getProduitByCat(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `produit/sscat/paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.result.content || []).map((p: any) => new Produit(p)),
          pagination: new Pagination(response.result),
          nbProduitByCat: response.mapNbSSCategorie
        };
      }));
  }

  public save(produit: any, isModeAdmin = false, file?: File): Observable<Produit> {
    return produit.id ? this.update(produit, isModeAdmin, file) : this.create(produit, isModeAdmin, file);
  }

  public create(produit: any, isModeAdmin = false, file?: File): Observable<Produit> {
    const url = `admin/produit`;
    const formData = new FormData();
    if(file) {
      formData.append('files', file);
    }
    formData.append('produit', JSON.stringify(produit));
    return this.http.post<Produit>(environment.urlAPI + url, formData)
      .pipe(map((x: any) => new Produit(x)));
  }

  public update(produit: any, isModeAdmin = false, file?: File): Observable<Produit> {
    const url = `admin/produit/${produit.id}`;
    const formData = new FormData();
    if(file) {
      formData.append('files', file);
    }
    formData.append('produit', JSON.stringify(produit));
    return this.http.put(environment.urlAPI + url, formData).pipe(map((x: any) => new Produit(x)));
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/produit/${id}`, HTTP_OPTIONS);
  }

  public getById(id: string): Observable<Produit> {
    return this.http.get(environment.urlAPI + `admin/produit/${id}`, HTTP_OPTIONS).pipe(
      map((data:any) => new Produit(data))
    );
  }

  public getByRef(ref: string): Observable<Produit> {
    return this.http.get(environment.urlAPI + `produit/reference/${ref}`, HTTP_OPTIONS).pipe(
      map((data:any) => new Produit(data))
    );
  }

  public search(val: string, idSite: string): Observable<Array<Produit>> {
    const url = `produit/search`;
    return this.http.post<Array<Produit>>(environment.urlAPI + url, { searchTerm: val, idSite: idSite })
      .pipe(map((x: any) => x.map((val: any) => new Produit(val))));
  }
}

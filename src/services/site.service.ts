
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PaginationService} from "./pagination.service";
import {environment} from "../environments/environment";
import {Site} from "../models/site.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }

  getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/sites/paginated`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Site(p)),
          pagination: new PaginationService(response)
        };
      }));
  }

  save(site: any, isModeAdmin = false): Observable<Site> {
    return site.id ? this.update(site, isModeAdmin) : this.create(site, isModeAdmin);
  }

  create(site: any, isModeAdmin = false): Observable<Site> {
    const url = isModeAdmin ?  `admin/sites` : 'sites';
    return this.http.post<Site>(environment.urlAPI + url, site, HTTP_OPTIONS)
      .pipe(map((x: any) => new Site(x)));
  }

  update(site: any, isModeAdmin = false): Observable<any> {
    const url = (isModeAdmin ?  `admin/sites/${site.id}` : `sites/${site.id}`);
    return this.http.put(environment.urlAPI + url, site, HTTP_OPTIONS);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/sites/${id}`, HTTP_OPTIONS);
  }

  getById(id: string): Observable<Site> {
    return this.http.get(environment.urlAPI + `admin/sites/${id}`, HTTP_OPTIONS).pipe(
      map((data: any) => new Site(data))
    );
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {Site} from "../models/site.model";
import {Compagnie} from "../models/compagnie.model";
import {Pagination} from "../models/pagination.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
const KEY_STORAGE_SITE_SELECTED = 'site-selected';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  public siteSubject = new BehaviorSubject<Site>(new Site({}));
  public site!: Site;

  constructor(private http: HttpClient) {
    let siteStorage = localStorage.getItem(KEY_STORAGE_SITE_SELECTED);
    siteStorage = siteStorage ? JSON.parse(siteStorage) :  {};
    this.site = new Site(siteStorage);
    this.siteSubject.next(this.site);
  }

  public updateSiteSelected(site: Site): void {
    if(site) {
      localStorage.setItem(KEY_STORAGE_SITE_SELECTED, JSON.stringify(site.serialize()));
      this.site = site;
      this.siteSubject.next(this.site);
    } else {
      this.site = new Site({});
      this.siteSubject.next(this.site);
      localStorage.removeItem(KEY_STORAGE_SITE_SELECTED);
    }
  }

  public getAllByParams(params: any, isModeAdmin = false,): Observable<any> {
    const url = isModeAdmin ?  `admin/sites` : 'sites';

    return this.http.post(environment.urlAPI + `${url}/paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Site(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  public getCompagnies(idSite: string): Observable<Compagnie[]> {
    return this.http.get(environment.urlAPI + `admin/sites/${idSite}/compagnies`, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return (response || []).map((c: any) => new Compagnie(c))
      }));
  }

  public save(site: any, isModeAdmin = false, file?: File): Observable<Site> {
    return site.id ? this.update(site, isModeAdmin, file) : this.create(site, isModeAdmin, file);
  }

  public create(site: any, isModeAdmin = false, file?: File): Observable<Site> {
    const url = isModeAdmin ?  `admin/sites` : 'sites';
    const formData = new FormData();
    if(file) {
      formData.append('files', file);
    }
    formData.append('site', JSON.stringify(site));
    return this.http.post<Site>(environment.urlAPI + url, formData)
      .pipe(map((x: any) => new Site(x)));
  }

  public update(site: any, isModeAdmin = false, file?: File): Observable<any> {
    const url = (isModeAdmin ?  `admin/sites/${site.id}` : `sites/${site.id}`);
    const formData = new FormData();
    if (file) {
      formData.append('files', file);
    }
    formData.append('site', JSON.stringify(site));
    return this.http.put(environment.urlAPI + url, formData).pipe(map((x: any) => new Site(x)));
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/sites/${id}`, HTTP_OPTIONS);
  }

  public getById(id: string): Observable<Site> {
    return this.http.get(environment.urlAPI + `admin/sites/${id}`, HTTP_OPTIONS).pipe(
      map((data: any) => new Site(data))
    );
  }

  public addCompagnie(id: string, idCompagnie: number): Observable<Site> {
    return this.http.post(environment.urlAPI + `admin/sites/${id}/compagnie/${idCompagnie}`, {},HTTP_OPTIONS)
      .pipe(map((response: any) =>  new Site(response)));
  }

  public addCompagnies(id: string, compagnies: Array<Compagnie>): Observable<Site> {
    return this.http.post(environment.urlAPI + `admin/sites/${id}/compagnies`, compagnies.map((c: Compagnie) => c.serialize()),HTTP_OPTIONS)
      .pipe(map((response: any) =>  new Site(response)));
  }

  public deleteCompagnie(id: string, idCompagnie: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/sites/${id}/compagnie/${idCompagnie}`, HTTP_OPTIONS);
  }
}

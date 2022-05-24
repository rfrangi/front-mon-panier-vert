
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {Compagnie} from "../models/compagnie.model";
import {Pagination} from "../models/pagination.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {

  constructor(private http: HttpClient) {}

  getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/compagnies/paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Compagnie(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  save(compagnie: any, isModeAdmin = false, file?: File): Observable<Compagnie> {
    return compagnie.id ? this.update(compagnie, isModeAdmin, file) : this.create(compagnie, isModeAdmin, file);
  }

  create(compagnie: any, isModeAdmin = false, file?: File): Observable<Compagnie> {
    const url = isModeAdmin ?  `admin/compagnies` : 'compagnies';
    const formData = new FormData();
    if(file) {
      formData.append('files', file);
    }
    formData.append('compagnie', JSON.stringify(compagnie));
    return this.http.post<Compagnie>(environment.urlAPI + url, formData)
      .pipe(map((x: any) => new Compagnie(x)));
  }

  update(compagnie: any, isModeAdmin = false, file?: File): Observable<any> {
    const url = (isModeAdmin ?  `admin/compagnies/${compagnie.id}` : `compagnies/${compagnie.id}`);
    const formData = new FormData();
    if(file) {
      formData.append('files', file);
    }
    formData.append('compagnie', JSON.stringify(compagnie));
    return this.http.put(environment.urlAPI + url, formData).pipe(map((x: any) => new Compagnie(x)));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/compagnies/${id}`, HTTP_OPTIONS);
  }

  getById(id: string): Observable<Compagnie> {
    return this.http.get(environment.urlAPI + `admin/compagnies/${id}`, HTTP_OPTIONS).pipe(
      map((data:any) => new Compagnie(data))
    );
  }
}


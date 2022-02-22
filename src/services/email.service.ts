
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {Email} from "../models/email.model";
import {Pagination} from "../models/pagination.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  public getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/emails/paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Email(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  public tesMailText(): Observable<any> {
    return this.http.get(environment.urlAPI + `admin/emails/mailSimpleText`, HTTP_OPTIONS)
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/emails/${id}`, HTTP_OPTIONS);
  }
}

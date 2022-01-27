
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PaginationService} from "./pagination.service";
import {environment} from "../environments/environment";
import {Site} from "../models/site.model";
import {Email} from "../models/email.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  public getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/emails/paginated`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new Email(p)),
          pagination: new PaginationService(response)
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

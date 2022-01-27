import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {PaginationService} from './pagination.service';

import { User } from '../models/user.model';
import {environment} from "../environments/environment";
import {Compagnie} from "../models/compagnie.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  getAllByParams(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/users/paginated`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new User(p)),
          pagination: new PaginationService(response)
        };
      }));
  }

  save(user: any, isModeAdmin = false): Observable<User> {
    return user.id ? this.update(user, isModeAdmin) : this.create(user, isModeAdmin);
  }

  create(user: any, isModeAdmin = false): Observable<User> {
    const url = isModeAdmin ?  `admin/users` : 'users';
    return this.http.post<User>(environment.urlAPI + url, user, HTTP_OPTIONS)
      .pipe(map((x: any) => new User(x)));
  }

  saveLogo(user: User, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('files', file);
    const url = `users/${user.id}/logo`;
    return this.http.put<User>(environment.urlAPI + url, formData)
      .pipe(map(x => new User(x)));
  }

  update(user: User, isModeAdmin = false): Observable<any> {
    const url = (isModeAdmin ?  `admin/users` : 'users') + (user.id ? ('/' + user.id) : '');
    return this.http.put(environment.urlAPI + url, user.serialize(), HTTP_OPTIONS).pipe(map((x: any) => new User(x)));
  }

  updateEmail(user: User, email: String, isModeAdmin = false): Observable<any> {
    const url = (isModeAdmin ?  `admin/users/${user.id}/email/${email}` : `users/emails/${user.id}/email/${email}`);
    return this.http.put(environment.urlAPI + url, user.serialize(), HTTP_OPTIONS).pipe(map((x: any) => new User(x)));
  }

  updatePassword(user: User,oldPassword: string, newPassword: string, isModeAdmin = false): Observable<any> {
    const url = (isModeAdmin ?  `admin/users` : 'users') + (user.id ? ('/' + user.id) : '');
    return this.http.put(environment.urlAPI + url, user.serialize(), HTTP_OPTIONS).pipe(map((x: any) => new User(x)));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/users/${id}`, HTTP_OPTIONS);
  }

  getAll(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/users/paginated`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new User(p)),
          pagination: new PaginationService(response)
        };
      }));
  }

  changePassword(id: string, password: string, isAdmin = false): Observable<any> {
    return this.http.get(environment.urlAPI + (isAdmin ? `admin/users/${id}/` : `users/`) + `password/${password}`, HTTP_OPTIONS);
  }


  getById(id: any): Observable<any>  {
    return this.http.get(environment.urlAPI + `admin/users/${id}`, HTTP_OPTIONS)
      .pipe(map((response: any) => new User(response)));
  }

  signup(user: any): Observable<User> {
    return this.http.post(environment.urlAPI + `signup`, user, HTTP_OPTIONS)
      .pipe(map((response: any) => new User(response)));
  }

  count(): Observable<any>  {
    return this.http.get(environment.urlAPI + `admin/users/count`, HTTP_OPTIONS);
  }


}

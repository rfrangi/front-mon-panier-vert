
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, map, Observable, Subject } from 'rxjs';
import {UserToken} from "../models/user-token.model";
import {Compagnie} from "../models/compagnie.model";
import {User} from "../models/user.model";
import jwt_decode from "jwt-decode";

const AUTH_API = 'http://localhost:8888/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-gestion-user';

@Injectable({ providedIn: 'root'})
export class AuthUserService {

  public userTokenSubject = new BehaviorSubject<UserToken>(new UserToken());
  public decodedToken!: { [key: string]: string };

  constructor(private http: HttpClient) { }

  public login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.email,
      password: credentials.password
    }, httpOptions).pipe(map((data: any) => {
      const userToken = new UserToken({ user: data.user, token: data.token})
      this.userTokenSubject.next(userToken);
      this.saveInfo(data);
    }));
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  signOut(): void {
    window.localStorage.clear();
  }

  saveInfo(data: any = {}): void {
    this.saveToken(data.token);
    this.saveUser(data.user);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User, emit: boolean = false): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    if(emit) {
      this.userTokenSubject.next({token: this.getToken(), user: user})
    }
  }

  public getUser(): User {
    const data: any = localStorage.getItem(USER_KEY);
    const json = data ? JSON.parse(data) : {};
    return new User(json);
  }

  public logout(): void {
    this.signOut();
    this.userTokenSubject.next(new UserToken());
  }

  public isValid(): boolean {
    return !!this.getUser() && !!this.getToken() && !this.isTokenExpired();
  }

  public decodeToken(): void {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
  }

  public getDecodeToken(): void {
    const token = this.getToken();
    return jwt_decode(token);
  }

  public getExpiryTime(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken["exp"] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: string | null = this.getExpiryTime();
    if (expiryTime) {
      // @ts-ignore
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}

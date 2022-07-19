
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, map, Observable } from 'rxjs';
import {UserToken} from "../models/user-token.model";
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
  public userToken!: UserToken;
  public decodedToken!: { [key: string]: string };

  constructor(private http: HttpClient) {
    let userStorage = localStorage.getItem(USER_KEY);
    userStorage = userStorage ? JSON.parse(userStorage) :  {};
    this.userToken = new UserToken ({ user: userStorage, token: localStorage.getItem(TOKEN_KEY)});
    if(this.userToken.token && !this.isValid()) {
      this.logout();
    } else {
      this.userTokenSubject.next(this.userToken);
    }
  }

  public login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.email,
      password: credentials.password
    }, httpOptions).pipe(map((data: any) => {
      this.userToken = new UserToken({ user: data.user, token: data.token})
      this.userTokenSubject.next(this.userToken);
      this.saveInfo(data, credentials.memoryMe);
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
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  }

  saveInfo(data: any = {}, memoryMe: boolean): void {
    if(memoryMe) {
      this.saveToken(data.token);
      this.saveUser(data.user);
    }
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return this.userToken.token;
  }

  public saveUser(user: User, emit: boolean = false): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    if(emit) {
      this.userToken = new UserToken({token: this.userToken.token, user: user});
      this.userTokenSubject.next(this.userToken);
    }
  }

  public getUser(): User {
    return this.userToken.user;
  }

  public logout(): void {
    this.userToken = new UserToken();
    this.signOut();
    this.userTokenSubject.next(this.userToken);
  }

  public isValid(): boolean {
    return this.userToken
      && this.userToken.user
      && !!this.userToken.user.id
      && !!this.userToken.token && !this.isTokenExpired();
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

  public sendEmailResetPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'reset', email, httpOptions);
  }

  public getUserByToken(token: string): Observable<any> {
    return this.http.post(AUTH_API + 'token', token, httpOptions)
      .pipe(map((x: any) => new User(x)));
  }

  public updatePassword(body: object): Observable<any> {
    return this.http.post(AUTH_API + 'change-password', body, httpOptions);
  }
}

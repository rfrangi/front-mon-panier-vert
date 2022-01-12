import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-gestion-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    console.log(sessionStorage.getItem(USER_KEY));
    // @ts-ignore
    return sessionStorage.getItem(USER_KEY) ? new User( sessionStorage.getItem(USER_KEY) ? JSON.parse(sessionStorage.getItem(USER_KEY)) : null) : new User();
  }
}

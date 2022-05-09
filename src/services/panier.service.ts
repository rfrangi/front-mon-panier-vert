import { Injectable } from '@angular/core';

import {BehaviorSubject, map, Observable} from 'rxjs';


import {Produit} from "../models/produit.model";
import {Panier} from "../models/panier.model";
import {User} from "../models/user.model";
import {environment} from "../environments/environment";
import { HttpClient } from '@angular/common/http';

const KEY_STORAGE_PANIER = 'panier';

@Injectable({ providedIn: 'root' })
export class PanierService {

  public panierSubject = new BehaviorSubject<Panier>(new Panier({}));
  public panier!: Panier;

  constructor(private http: HttpClient) {
    let panierStorage = localStorage.getItem(KEY_STORAGE_PANIER);
    panierStorage = panierStorage ? JSON.parse(panierStorage) :  {};
    this.panier = new Panier(panierStorage);
    this.panierSubject.next(this.panier);
  }

  public updateProduit(produit: Produit, quantite: number = 1): void {
    const newProduitCommande = produit
    newProduitCommande.quantiteCommande = quantite;
    if(quantite > 0) {
      this.panier.produits.set(newProduitCommande.id, newProduitCommande);
    } else {
      this.panier.produits.delete(produit.id);
    }
    localStorage.setItem(KEY_STORAGE_PANIER, JSON.stringify(this.panier.serialize()));
    this.panierSubject.next(this.panier);
  }

  public removeAll(): void {
    localStorage.removeItem(KEY_STORAGE_PANIER);
    this.panier = new Panier({});
    this.panierSubject.next(this.panier);
  }

  public save(panier: Panier): Observable<Panier> {
    const url = 'panier';
    return this.http.post<User>(environment.urlAPI + url, panier.serialize())
      .pipe(map((x: any) => new Panier(x)));
  }
}

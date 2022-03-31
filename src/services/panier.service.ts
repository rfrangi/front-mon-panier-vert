import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {BehaviorSubject, map, Observable} from 'rxjs';

import {environment} from "../environments/environment";

import {Produit} from "../models/produit.model";
import {Pagination} from "../models/pagination.model";
import {UserToken} from "../models/user-token.model";
import {Panier} from "../models/panier.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  public panierSubject = new BehaviorSubject<Panier>(new Panier({}));
  public panier!: Panier;

  constructor() {
    let panierStorage = localStorage.getItem('panier');
    panierStorage = panierStorage ? JSON.parse(panierStorage) :  {};
    console.log(panierStorage);
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
    localStorage.setItem('panier', JSON.stringify(this.panier.serialize()));
    this.panierSubject.next(this.panier);
  }

  public removeAll(): void {

  }

  public removeProduit(): void {

  }
}

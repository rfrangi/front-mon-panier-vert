import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from "../environments/environment";
import {Pagination} from "../models/pagination.model";
import {Panier} from "../models/panier.model";
import {Produit} from "../models/produit.model";
import {LIST_COMMANDE_STATUS} from "../models/commande-status.model";
import {CommandeClient} from "../models/commande-client.model";

const HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({ providedIn: 'root' })
export class CommandeService {

  constructor(private http: HttpClient) { }

  getAllByParams(params: any, sitePage: boolean = false, compagniePage: boolean = false): Observable<any> {
    let url: string = '';
    if (sitePage) {
      url = url + 'admin/commandes/site/'
    } else if (compagniePage) {
      url = url + 'admin/commandes/compagnie/'
    } else {
      url = url + 'commandesClient/';
    }
    url = url + `paginated?page=${(params.page > 0 ? params.page - 1 : 0)}`
    return this.http.post(environment.urlAPI +  url, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new CommandeClient(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  save(panier: Panier, isModeAdmin = false): Observable<CommandeClient> {

    panier.dateRetrait.setHours(panier.creneauRetrait.start);
    const data = {
      status: LIST_COMMANDE_STATUS.EN_PREPARATION.code,
      ref: '',
      userId: panier.userId,
      siteId: panier.siteId,
      adresseLivraison: panier.adresseLivraison?.serialize(),
      adresseFacturation: panier.adresseFacturation?.serialize(),
      creationDate: new Date(),
      montant: panier.montantTotal(),
      dateRetrait: panier.dateRetrait,
      modeRetrait: panier.modeRetrait.code,
      commandesCompagnie: []
    }

    const produitsArray = Array.from(panier.produits.values());
    const idsCompagnie = new Set(produitsArray.map((p: Produit) => p.idCompagnie));
    const cmdCompagnie: any = [];
    idsCompagnie.forEach((id: string) => {
      const val = {
        status: LIST_COMMANDE_STATUS.EN_PREPARATION.code,
        compagnieId: id,
        creationDate: new Date(),
        produitsCommande: produitsArray.filter((produit: Produit) => produit.idCompagnie === id).map((p: Produit) => p.transformCmd())
      }
      cmdCompagnie.push(val);
    });
    data.commandesCompagnie = cmdCompagnie;
    return this.create(data, isModeAdmin);
  }

  create(commande: any, isModeAdmin = false): Observable<CommandeClient> {
    return this.http.post<CommandeClient>(environment.urlAPI + 'commandesClient', commande, HTTP_OPTIONS)
      .pipe(map((x: any) => new CommandeClient(x)));
  }


  delete(id: string): Observable<any> {
    return this.http.delete(environment.urlAPI + `admin/commandesClient/${id}`, HTTP_OPTIONS);
  }

  getAll(params: any): Observable<any> {
    return this.http.post(environment.urlAPI + `admin/commandesClient/paginated`, params, HTTP_OPTIONS)
      .pipe(map((response: any) =>  {
        return {
          result: (response.content || []).map((p: any) => new CommandeClient(p)),
          pagination: new Pagination(response)
        };
      }));
  }

  getById(id: any): Observable<CommandeClient>  {
    return this.http.get(environment.urlAPI + `commandesClient/${id}`, HTTP_OPTIONS)
      .pipe(map((response: any) => new CommandeClient(response)));
  }

  count(): Observable<any>  {
    return this.http.get(environment.urlAPI + `commandesClient/count`, HTTP_OPTIONS);
  }
}

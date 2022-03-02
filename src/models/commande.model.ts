import { CommandeStatus } from "./commande-status.model";
import { Produit } from "./produit.model";
import {Site} from "./site.model";
import {User} from "./user.model";

export class Commande {

  public id!: string;
  public reference!: string;
  public user!: User;
  public produits: Array<Produit> = [];
  public site!: Site;
  public montantTotal!: number;
  public creationDate!: Date;
  public modificationDate!: Date;
  public status!: CommandeStatus;
  public note!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
 }

  serialize(): any {
    return {
      id: this.id,

    }
  }
}

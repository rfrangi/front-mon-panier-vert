import { Produit } from "./produit.model";
import {LIST_TYPE_RETRAIT, TypeRetrait} from "./type-retrait.model";
import {Creneau, LIST_CRENEAU} from "./creneau.model";
import {Adresse} from "./adresse.model";
import {CommandeStatus, LIST_COMMANDE_STATUS} from "./commande-status.model";

export class CommandeCompagnie {

  public id!: string;
  public status!: CommandeStatus;
  public creationDate!: Date;
  public modificationDate!: Date;
  public produitsCommande: Array<Produit> = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.status = data.status ? LIST_COMMANDE_STATUS[data.status] : LIST_COMMANDE_STATUS.EN_PREPARATION;
    this.produitsCommande = data.produitsCommande ? data.produitsCommande.map((val: any) => new Produit(val)) : [];
  }

  serialize(): any {
    return {
      id: this.id,
      status: this.status.code,
      creationDate: this.creationDate,
      modificationDate: this.modificationDate,
      produitsCommande: this.produitsCommande.map((p: Produit) => p.serialize())
    }
  }
}

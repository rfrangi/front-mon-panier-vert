import {LIST_TYPE_RETRAIT, TypeRetrait} from "./type-retrait.model";
import {Adresse} from "./adresse.model";
import {CommandeStatus, LIST_COMMANDE_STATUS} from "./commande-status.model";
import {CommandeCompagnie} from "./commande-compagnie.model";
import {Produit} from "./produit.model";

export class CommandeClient {

  public id!: string;
  public status!: CommandeStatus;
  public ref!: string;
  public userId!: string;
  public siteId!: string;
  public modeRetrait!: TypeRetrait;
  public dateRetrait!: Date;
  public creationDate!: Date;
  public modificationDate!: Date;
  public adresseLivraison!: Adresse | null;
  public adresseFacturation!: Adresse | null;
  public montant!: number;
  public commandesCompagnie: Array<CommandeCompagnie> = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.modeRetrait = data.modeRetrait ? LIST_TYPE_RETRAIT[data.modeRetrait] : LIST_TYPE_RETRAIT.SITE;
    this.status = data.status ? LIST_COMMANDE_STATUS[data.status] : LIST_COMMANDE_STATUS.EN_PREPARATION;
    this.adresseLivraison = data.adresseLivraison ? new Adresse(data.adresseLivraison) : null;
    this.adresseFacturation = data.adresseFacturation ? new Adresse(data.adresseFacturation) : null;
    this.commandesCompagnie = data.commandesCompagnie ? data.commandesCompagnie.map((val: any) => new CommandeCompagnie(val)) : [];

  }

  public getProduits(): Array<Produit> {
    return this.commandesCompagnie.flatMap((cmdCompagnie => cmdCompagnie.produitsCommande));
  }

  public serialize(): any {
    return {
      id: this.id,
      modeRetrait: this.modeRetrait.code,
      dateRetrait: this.dateRetrait,
      adresseLivraison: this.adresseLivraison ? this.adresseLivraison.serialize() : null,
      adresseFacturation: this.adresseFacturation ? this.adresseFacturation.serialize() : null,
      userId: this.userId,
      siteId: this.siteId,
      ref: this.ref,
      status: this.status.code,
      montant: this.montant,
      creationDate: this.creationDate,
      modificationDate: this.modificationDate,
      commandesCompagnie: this.commandesCompagnie.map((cmd: CommandeCompagnie) => cmd.serialize()),
    }
  }
}

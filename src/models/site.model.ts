import {Adresse} from './adresse.model';
import {LIST_SITE_STATUS, SiteStatus} from "./site-status.model";
import {Compagnie} from "./compagnie.model";

export class Site {

  id!: string;
  name!: string;
  status!: SiteStatus;
  adresse!: Adresse;
  creationDate!: Date;
  modificationDate!: Date;
  compagnies: Array<Compagnie> = [];

  constructor(data: any= {}) {
    Object.assign(this, data);
    this.adresse = data.adresse ? new Adresse(data.adresse) : new Adresse();
    this.status = data.status ? LIST_SITE_STATUS[data.status] : LIST_SITE_STATUS.ACTIF;
    this.compagnies = data.Compagnie ? data.Compagnie.map((c: any) => new Compagnie(c)) : [];
  }

  serialize(): any {
    return {
      id: this.id,
      name: this.name,
      status: this.status.code,
      creationDate: this.creationDate,
      modificationDate: this.modificationDate,
      compagnie: this.compagnies.map((c: Compagnie) => c.serialize())
    };
  }
}

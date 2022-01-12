import {LIST_PAYS, Pays} from './pays.model';

export class Adresse {

  id: string;
  adresse: string;
  complement: string;
  ville: string;
  codePostal: string;
  pays: Pays;
  description: string;

  constructor(data: any= {}) {
    Object.assign(this, data);
    this.pays = data.pays ? new Pays(data.pays) : LIST_PAYS.FRANCE;
  }
}

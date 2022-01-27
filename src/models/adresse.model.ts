import {LIST_PAYS, Pays} from './pays.model';

export class Adresse {

  idAdresse!: string;
  adresse!: string;
  complement!: string;
  ville!: string;
  codePostal!: string;
  pays!: Pays;
  description!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.pays = data.pays ? LIST_PAYS[data.pays] : LIST_PAYS.FRANCE;
  }

  serialize(): any {
    return {
      idAdresse: this.idAdresse,
      adresse: this.adresse,
      complement: this.complement,
      ville: this.ville,
      codePostal: this.codePostal,
      pays: this.pays.code,
      description: this.description
    }
  }
}

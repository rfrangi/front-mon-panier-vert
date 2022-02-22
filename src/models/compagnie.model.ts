import {Adresse} from './adresse.model';
import {CompagnieStatus, LIST_COMPAGNIE_STATUS} from "./compagnie-status.model";

export class Compagnie {

  id!: string;
  name!: string;
  img!: string;
  siret!: string;
  email!: string;
  telephone!: string;
  status!: CompagnieStatus;
  type!: TypeCompagnie;
  adresse!: Adresse;
  creationDate!: Date;
  modificationDate!: Date;

  constructor(data: any= {}) {
    Object.assign(this, data);
    this.adresse = data.adresse ? new Adresse(data.adresse) : new Adresse();
    this.status = data.status != undefined ? LIST_COMPAGNIE_STATUS[data.status] : LIST_COMPAGNIE_STATUS.EN_ATTENTE_VALIDATION;
  }

  serialize(): any {
    return {
      id: this.id,
      email: this.email,
      telephone: this.telephone,
      siret: this.siret,
      type: this.type ? this.type : null,
      name: this.name,
      status: this.status ? this.status.code : LIST_COMPAGNIE_STATUS.EN_ATTENTE_VALIDATION.code,
      creationDate: this.creationDate,
      modificationDate: this.modificationDate,
      adresse: this.adresse.serialize()
    };
  }
}

export class TypeCompagnie {
  code!: string;
  img!: string;
  label!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_TYPE_CATEGORIE = {
  BOULANGERIE: new TypeCompagnie({ code: 'BOULANGERIE', label: 'Boulangerie', img: '' }),
  PATISERIE: new TypeCompagnie({ code: 'PATISERIE', label: 'Pâtisserie', img: '' }),
  BOUCHERIE: new TypeCompagnie({ code: 'BOUCHERIE', label: 'Boucherie', img: '' }),
  POISSONNERIE: new TypeCompagnie({ code: 'POISSONNERIE', label: 'Poissonnerie', img: '' }),
  PRIMEUR: new TypeCompagnie({ code: 'PRIMEUR', label: 'Primeur', img: '' }),
  CHARCUTERIE: new TypeCompagnie({ code: 'CHARCUTERIE', label: 'Charcuterie', img: '' }),
  CREMERIE: new TypeCompagnie({ code: 'CREMERIE', label: 'Cremerie', img: '' }),
  EPICERIE: new TypeCompagnie({ code: 'EPICERIE', label: 'Epicerie', img: '' }),
  AUTRE: new TypeCompagnie({ code: 'AUTRE', label: 'Autre...', img: '' }),

}

import {Adresse} from './adresse.model';
import {Role} from './role.model';

export class User {

  id: string;
  email: string;
  firstname: string;
  lastname: string;
  civilite: string;
  adresse: Adresse;
  roles: Array<Role>;
  recevoirOffre: boolean;
  creationDate: Date;
  modificationDate: Date;

  constructor(data: any= {}) {
    Object.assign(this, data);
    this.adresse = data.adresse ? new Adresse(data.adresse) : new Adresse();
    this.roles = data.roles ? data.roles.map(role => new Role(role)) : [];
  }
}

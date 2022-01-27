import {Adresse} from './adresse.model';
import {Civilite, LIST_CIVILITE} from "./civilite.model";
import {LIST_USER_STATUS, UserStatus} from "./user-status.model";
import {RoleEnum} from "./enums/role.enum";

export class User {

  id!: string;
  email!: string;
  password!: string;
  firstname!: string;
  lastname!: string;
  civilite!: Civilite;
  status!: UserStatus;
  adresse!: Adresse;
  roles: Array<RoleEnum> = [];
  recevoirOffre!: boolean;
  creationDate!: Date;
  modificationDate!: Date;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.civilite = data.civilite ? LIST_CIVILITE[data.civilite] : LIST_CIVILITE.MONSIEUR;
    this.status = data.status ? LIST_USER_STATUS[data.status] : LIST_USER_STATUS.ACTIF;
    this.adresse = data.adresse ? new Adresse(data.adresse) : new Adresse();
  }

  serialize(): any {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      civilite: this.civilite.code,
      adresse: this.adresse.serialize(),
      roles: this.roles,
      recevoirOffre: this.recevoirOffre,
      status: this.status.code,
      creationDate: this.creationDate,
      modificationDate: this.modificationDate
    }
  }

  public isAdmin(): boolean {
    return this.roles.includes(RoleEnum.ADMIN);
  }
}

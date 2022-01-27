import {User} from "./user.model";

export class UserToken {

  public user!: User;
  public token!: string;

  constructor(data: any= {}) {
    Object.assign(this, data);
  }

}

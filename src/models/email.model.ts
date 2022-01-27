import {EmailStatus, LIST_EMAIL_STATUS} from "./email-status.model";
import {ETypeEmail} from "./enums/type-email.enum";

export class Email {

  id!: string;
  from!: string;
  dest!: string;
  status!: EmailStatus;
  type!: ETypeEmail;
  errorMessage!: string;
  creationDate!: Date;

  constructor(data: any= {}) {
    Object.assign(this, data);
    this.status = data.status ? LIST_EMAIL_STATUS[data.status] : LIST_EMAIL_STATUS.EN_ATTENTE;
    this.type = data.type ? data.type : ETypeEmail.TEST
  }
}

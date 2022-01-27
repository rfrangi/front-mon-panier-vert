export class EmailStatus {
  code!: string;
  label!: string;
  img!: string;
  icon!: string;
  color!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_EMAIL_STATUS: any = {
  ENVOYER: new EmailStatus({code: 'ENVOYER', label: 'Envoyer', img: '', icon: 'highlight_off', color: 'accent' }),
  EN_ATTENTE: new EmailStatus({code: 'EN_ATTENTE', label: 'En attente', img: '', icon: 'highlight_off', color: 'accent' }),
  ERREUR: new EmailStatus({code: 'ERREUR', label: 'Erreur', img: '', icon: 'check_circle_outline', color: 'primary' }),
}

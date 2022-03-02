export class CommandeStatus {
  public code!: string;
  public label!: string;
  public img!: string;
  public icon!: string;
  public color!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_COMMANDE_STATUS: any = {
  EN_COURS: new CommandeStatus({code: 'EN_COURS', label: 'En cours', img: '', icon: 'pause_circle_filled', color: 'danger' }),
  VALIDE: new CommandeStatus({code: 'VALIDE', label: 'Validé', img: '', icon: 'check_circle', color: 'primary' }),
  ANNULE: new CommandeStatus({code: 'ANNULE', label: 'Annulé', img: '', icon: 'check_circle_outline', color: 'danger' }),
  ERREUR_COMMANDE: new CommandeStatus({code: 'ERREUR_COMMANDE', label: 'Erreur de commande', img: '', icon: 'circle_notifications', color: 'warning' }),
  ERREUR_PAIEMENT: new CommandeStatus({code: 'ERREUR_PAIEMENT', label: 'Erreur de paiement', img: '', icon: 'circle_notifications', color: 'warning' }),
}

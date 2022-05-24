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
  EN_PREPARATION: new CommandeStatus({code: 'EN_PREPARATION', label: 'En préparation', img: '', icon: 'pause_circle_filled', color: 'danger' }),
  VALIDE: new CommandeStatus({code: 'VALIDE', label: 'Validé', img: '', icon: 'check_circle', color: 'primary' }),
  EN_COURS_LIVRAISON: new CommandeStatus({code: 'EN_COURS_LIVRAISON', label: 'En cours de livraison', img: '', icon: 'check_circle', color: 'primary' }),
  LIVRE: new CommandeStatus({code: 'LIVRE', label: 'Commande livrée', img: '', icon: 'check_circle', color: 'primary' }),
  ANNULE: new CommandeStatus({code: 'ANNULE', label: 'Commande annulée', img: '', icon: 'check_circle_outline', color: 'danger' }),
  BLOQUE: new CommandeStatus({code: 'BLOQUE', label: 'Commande bloquée', img: '', icon: 'check_circle_outline', color: 'danger' }),
  SUPPRIMER: new CommandeStatus({code: 'SUPPRIMER', label: 'Commande Supprimer', img: '', icon: 'circle_notifications', color: 'warning' }),
  ERREUR: new CommandeStatus({code: 'ERREUR', label: 'Erreur ', img: '', icon: 'circle_notifications', color: 'warning' }),
}

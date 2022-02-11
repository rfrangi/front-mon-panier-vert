export class CompagnieStatus {
  code!: string;
  label!: string;
  img!: string;
  icon!: string;
  color!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_COMPAGNIE_STATUS: any = {
  BLOQUE: new CompagnieStatus({code: 'BLOQUE', label: 'Bloqué', img: '', icon: 'pause_circle_filled', color: 'danger' }),
  VALIDE: new CompagnieStatus({code: 'VALIDE', label: 'Validé', img: '', icon: 'check_circle', color: 'primary' }),
  NON_VALIDE: new CompagnieStatus({code: 'NON_VALIDE', label: 'Non valide', img: '', icon: 'check_circle_outline', color: 'danger' }),
  EN_ATTENTE_VALIDATION: new CompagnieStatus({code: 'EN_ATTENTE_VALIDATION', label: 'En attente de validation', img: '', icon: 'circle_notifications', color: 'warning' }),
}

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
  BLOQUE: new CompagnieStatus({code: 'BLOQUE', label: 'Bloqué', img: '', icon: 'highlight_off', color: 'accent' }),
  VALIDE: new CompagnieStatus({code: 'VALIDE', label: 'Validé', img: '', icon: 'check_circle_outline', color: 'primary' }),
  NON_VALIDE: new CompagnieStatus({code: 'NON_VALIDE', label: 'Non valide', img: '', icon: 'check_circle_outline', color: 'accent' }),
  EN_ATTENTE_VALIDATION: new CompagnieStatus({code: 'EN_ATTENTE_VALIDATION', label: 'En attente', img: '', icon: 'check_circle_outline', color: 'primary' }),
}

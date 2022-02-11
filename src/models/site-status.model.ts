export class SiteStatus {
  code!: string;
  label!: string;
  img!: string;
  icon!: string;
  color!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_SITE_STATUS: any = {
  BLOQUE: new SiteStatus({code: 'BLOQUE', label: 'Bloqué', img: '', icon: 'pause_circle_filled', color: 'danger' }),
  ACTIF: new SiteStatus({code: 'ACTIF', label: 'Actif', img: '', icon: 'check_circle', color: 'primary' }),
}

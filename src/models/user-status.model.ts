export class UserStatus {
  code!: string;
  label!: string;
  img!: string;
  icon!: string;
  color!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_USER_STATUS: any = {
  BLOQUE: new UserStatus({code: 'BLOQUE', label: 'Bloqué', img: '', icon: 'highlight_off', color: 'accent' }),
  ACTIF: new UserStatus({code: 'ACTIF', label: 'Actif', img: '', icon: 'check_circle_outline', color: 'primary'  }),
  DESACTIVE: new UserStatus({code: 'DESACTIVE', label: 'Désactivé', img: '', icon: 'lock', color: 'accent'  })
}

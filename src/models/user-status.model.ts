export class UserStatus {
  code!: string;
  label!: string;
  labelAction!: string;
  img!: string;
  icon!: string;
  color!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_USER_STATUS: any = {
  BLOQUE: new UserStatus({code: 'BLOQUE', label: 'Bloqué', labelAction: 'Bloquer', img: '', icon: 'highlight_off', color: 'warn' }),
  ACTIF: new UserStatus({code: 'ACTIF', label: 'Actif', labelAction: 'Activer', img: '', icon: 'check_circle_outline', color: 'primary'  }),
  DESACTIVE: new UserStatus({code: 'DESACTIVE', label: 'Désactivé', labelAction: 'Désactiver', img: '', icon: 'lock', color: 'warn'  })
}

export class Civilite {
  code!: string;
  label!: string;
  labelShort!: string;
  img!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_CIVILITE: any = {
  MONSIEUR: new Civilite({code: 'MONSIEUR', label: 'Monsieur', labelShort: 'M. ', img: '' }),
  MADAME: new Civilite({code: 'MADAME', label: 'Madame', labelShort: 'Mme ', img: '' })
}

export class Pays {

  code: string;
  label: string;
  codePays: string;
  img: string;
  indice: string;

  constructor(data: any= {}) {
    Object.assign(this, data);
  }
}

export const LIST_PAYS = {
  FRANCE: new Pays({
    code: 'FRANCE',
    label : 'France',
    codePays: 'FR',
    img: '',
    indice: '+33'
  }),
  BELGIQUE: new Pays({
    code: 'BELGIQUE',
    label : 'Belgique',
    codePays: 'BE',
    img: '',
    indice: '+32'
  }),
  LUXEMBOURG: new Pays({
    code: 'LUXEMBOURG',
    label : 'Luxembourg',
    codePays: 'LU',
    img: '',
    indice: '+352'
  })
};

export class TypeTarif {

  code!: string;
  img!: string;
  label!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_TYPE_TARIF: any = {
  PIECE: new TypeTarif({ code: 'PIECE', label: 'Pièce', img: '' }),
  POID: new TypeTarif({ code: 'POID', label: 'Poids', img: '' }),
}

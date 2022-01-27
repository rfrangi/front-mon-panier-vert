export class Produit {
  id!: string;
  name!: string;
  quantite!: string;
  prix!: string;
  color!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

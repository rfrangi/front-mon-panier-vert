import {LIST_PRODUIT_CATEGORIE, ProduitCategorie} from "./produit-categorie.model";

export class Produit {
  id!: string;
  name!: string;
  description!: string;
  quantite!: string;
  categorie!: ProduitCategorie;
  tarif!: string;
  typeTarif!: string;
  img!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.categorie = data.categorie ? LIST_PRODUIT_CATEGORIE[data.categorie] : LIST_PRODUIT_CATEGORIE.BOUCHERIE_VOLAILLE_POISSONNERIE;
  }

  public serialize(): object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      quantite: this.quantite,
      categorie: this.categorie.code,
      tarif: this.tarif,
      typeTarif: this.typeTarif,
      img: this.img,
    }
  }
}

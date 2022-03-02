import {LIST_CATEGORIES, LIST_SOUS_CATEGORIES, ProduitCategorie, SousCategorie} from "./produit-categorie.model";
import {LIST_TYPE_TARIF, TypeTarif} from "./type-tarif.model";

export class Produit {
  public id!: string;
  public idCompagnie!: string;
  public reference!: string;
  public nameCompagnie!: string;
  public name!: string;
  public description!: string;
  public quantite!: string;
  public categorie!: ProduitCategorie;
  public ssCategorie!: SousCategorie;
  public tarif!: string;
  public typeTarif!: TypeTarif;
  public img!: string;
  public nbPieceLot!: string;
  public poidsMin!: string;
  public poidsMax!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.categorie = data.categorie ? LIST_CATEGORIES[data.categorie] : LIST_CATEGORIES.BOUCHERIE;
    this.ssCategorie = data.ssCategories ? LIST_SOUS_CATEGORIES[data.ssCategories] : this.categorie.ssCategories[0];
    this.typeTarif = data.typeTarif ? LIST_TYPE_TARIF[data.typeTarif] : LIST_TYPE_TARIF.PIECE;
  }

  public serialize(): object {
    return {
      id: this.id,
      name: this.name,
      idCompagnie: this.idCompagnie,
      nameCompagnie: this.nameCompagnie,
      description: this.description,
      quantite: this.quantite,
      categorie: this.categorie.code,
      ssCategorie: this.ssCategorie.code,
      tarif: this.tarif,
      typeTarif: this.typeTarif,
      img: this.img,
      nbPieceLot: this.nbPieceLot,
      poidsMin: this.poidsMin,
      poidsMax: this.poidsMax,
      reference: this.reference
    }
  }
}

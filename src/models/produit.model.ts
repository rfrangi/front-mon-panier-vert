import {LIST_CATEGORIES, LIST_SOUS_CATEGORIES, ProduitCategorie, SousCategorie} from "./produit-categorie.model";
import {LIST_TYPE_TARIF, TypeTarif} from "./type-tarif.model";

export class Produit {
  public id!: string;
  public siteId!: string;
  public siteName!: string;
  public idCompagnie!: string;
  public reference!: string;
  public compagnieName!: string;
  public name!: string;
  public description!: string;
  public quantite!: string;
  public categorie!: ProduitCategorie;
  public ssCategorie!: SousCategorie;
  public tarif!: number;
  public typeTarif!: TypeTarif;
  public img!: string | undefined;
  public nbPieceLot!: number;
  public poidsMin!: string;
  public poidsMax!: string;
  public isPromo!: boolean;
  public isBio!: boolean;
  public quantiteCommande: number = 0;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.categorie = data.categorie ? LIST_CATEGORIES[data.categorie] : LIST_CATEGORIES.BOUCHERIE;
    this.ssCategorie = data.ssCategorie ? LIST_SOUS_CATEGORIES[data.ssCategorie] : this.categorie.ssCategories[0];
    this.typeTarif = data.typeTarif ? LIST_TYPE_TARIF[data.typeTarif] : LIST_TYPE_TARIF.PIECE;
  }

  get srcImg(): string {
    // 'http://d11mhhwvxnv6xf.cloudfront.net/'
    return 'http://d35nr8envdpgsa.cloudfront.net/' + this.img;
  }

  public getLabelPieceLot(): string {
    if(this.categorie === LIST_CATEGORIES.PATISSERIE && this.ssCategorie !== LIST_SOUS_CATEGORIES.MIGNARDISES) {
      return this.nbPieceLot + ' parts'
    }

    return this.nbPieceLot + ' pièces'
  }

  public getlabelPoids(): string {
    let result = '';
    if (this.poidsMin && this.poidsMax) {
      if (this.poidsMin !== this.poidsMax) {
        result = `${this.poidsMin} à ${this.poidsMax} g`;
      } else {
        result = `${this.poidsMin} g`;
      }
    } else if (this.poidsMin) {
      result = `${this.poidsMin} g`;
    }
    return result;
  }

  public getTotalPrix(): number {
    return this.tarif * this.quantiteCommande;
  }

  public serialize(): object {
    return {
      id: this.id,
      name: this.name,
      idCompagnie: this.idCompagnie,
      compagnieName: this.compagnieName,
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
      reference: this.reference,
      isPromo: this.isPromo,
      isBio: this.isBio,
      quantiteCommande: this.quantiteCommande,
      siteId: this.siteId,
      siteName: this.siteName

    }
  }
}

import {Produit} from "./produit.model";
import {LIST_TYPE_RETRAIT, TypeRetrait} from "./type-retrait.model";
import {Adresse} from "./adresse.model";
import {Creneau, LIST_CRENEAU} from "./creneau.model";

export class Panier {

  public produits: Map<string, Produit> = new Map<string, Produit>();
  public modeRetrait!: TypeRetrait;
  public dateRetrait!: Date;
  public creneauRetrait!: Creneau;
  public adresseLivraison!: Adresse | null;
  public adresseFacturation!: Adresse | null;
  public userId!: string;

  constructor(data: any= {}) {
    //Object.assign(this, data); A ne pas faire ici
    this.dateRetrait = data.dateRetrait;
    if (data.produits) {
      data.produits.forEach((p: any) => {
        const produit: Produit = new Produit(p);
        this.produits.set(produit.id, produit);
      });
    }
    this.modeRetrait = data.modeRetrait ? LIST_TYPE_RETRAIT[data.modeRetrait] : LIST_TYPE_RETRAIT.SITE;
    this.adresseLivraison = data.adresseLivraison ? new Adresse(data.adresseLivraison) : null;
    this.adresseFacturation = data.adresseFacturation ? new Adresse(data.adresseFacturation) : null;
    this.creneauRetrait = data.creneauRetrait ? LIST_CRENEAU[data.creneauRetrait] : this.modeRetrait.creneaux[0];
    this.userId = data.userId;
  }

  public serialize(): object {
    return {
      produits: Array.from(this.produits.values()).map((p: Produit) => {
        return p.serialize();
      }),
      modeRetrait: this.modeRetrait.code,
      dateRetrait: this.dateRetrait,
      creneauRetrait: this.creneauRetrait.code,
      adresseLivraison: this.adresseLivraison ? this.adresseLivraison.serialize() : null,
      userId: this.userId
    }
  }

  public montantTotal(): number {
    return Array.from(this.produits.values())
      .map((p: Produit) => p.quantiteCommande * p.tarif)
      .reduce((a, b) => a + b, 0);
  }
}

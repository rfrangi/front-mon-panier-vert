import {Produit} from "./produit.model";

export class Panier {

  public produits: Map<string, Produit> = new Map<string, Produit>();

  constructor(data: any= {}) {
    if (data.produits) {
      data.produits.forEach((p: any) => {
        const produit: Produit = new Produit(p);
        this.produits.set(produit.id, produit);

      })
    }
  }

  public serialize(): object {
    return {
      produits: Array.from(this.produits.values()).map((p: Produit) => {
        return p.serialize();
      })
    }
  }

  public montantTotal(): number {
    return Array.from(this.produits.values())
      .map((p: Produit) => p.quantiteCommande * p.tarif)
      .reduce((a, b) => a + b, 0);
  }
}

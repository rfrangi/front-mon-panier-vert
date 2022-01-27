export class ProduitCategorie {

  code!: string;
  img!: string;
  label!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_PRODUIT_CATEGORIE: any = {
  BOUCHERIE_VOLAILLE_POISSONNERIE: new ProduitCategorie({ code: 'BOUCHERIE_VOLAILLE_POISSONNERIE', label: 'Boulangerie', img: 'assets/icons/categories-produit/BOUCHERIE_VOLAILLE_POISSONNERIE.png' }),
  LAITIERS_OEUFS_VEGETAL: new ProduitCategorie({ code: 'LAITIERS_OEUFS_VEGETAL', label: 'Produits laitiers, oeufs, végétal', img: 'assets/icons/categories-produit/LAITIERS_OEUFS_VEGETAL.png' }),
  FRUITS_LEGUMES: new ProduitCategorie({ code: 'FRUITS_LEGUMES', label: 'Fruits, légumes', img: 'assets/icons/categories-produit/FRUITS_LEGUMES.png' }),
  EPICERIE_SUCREES: new ProduitCategorie({ code: 'EPICERIE_SUCREES', label: 'Epicerie sucrée', img: 'assets/icons/categories-produit/EPICERIE_SUCREES.png' }),
  EPICERIE_SALEE: new ProduitCategorie({ code: 'EPICERIE_SALEE', label: 'Epicerie salée', img: 'assets/icons/categories-produit/EPICERIE_SALEE.png' }),
  BOISSONS: new ProduitCategorie({ code: 'BOISSONS', label: 'Boissons', img: 'assets/icons/categories-produit/BOISSONS.png' }),
  ANIMALERIE: new ProduitCategorie({ code: 'ANIMALERIE', label: 'Animalerie', img: 'assets/icons/categories-produit/ANIMALERIE.png' }),
  CHARCUTERIE_TRAITEUR_PAIN: new ProduitCategorie({ code: 'CHARCUTERIE_TRAITEUR_PAIN', label: 'Charcuterie, traiteur, pain', img: 'assets/icons/categories-produit/CHARCUTERIE_TRAITEUR_PAIN.png' }),
}

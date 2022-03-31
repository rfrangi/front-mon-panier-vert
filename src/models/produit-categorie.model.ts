export class ProduitCategorie {

  code!: string;
  img!: string;
  label!: string;
  ssCategories: Array<SousCategorie> = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export class SousCategorie {
  code!: string;
  img!: string;
  label!: string;
  nbArticle: number = 0;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_SOUS_CATEGORIES: any = {
  /** BOUCHERIE **/
  BOEUF: new SousCategorie({ code: 'BOEUF', label: 'Boeuf', img: '' }),
  VEAU: new SousCategorie({ code: 'VEAU', label: 'Veau', img: '' }),
  PORC: new SousCategorie({ code: 'PORC', label: 'Porc', img: '' }),
  AGNEAU: new SousCategorie({ code: 'AGNEAU', label: 'Agneau', img: '' }),

  /** POISSONNERIE **/
  FRUITS_MER: new SousCategorie({ code: 'FRUITS_MER', label: 'Fruits de mer', img: '' }),
  POISSON: new SousCategorie({ code: 'POISSON', label: 'Poisson', img: '' }),
  SUSHI: new SousCategorie({ code: 'SUSHI', label: 'Sushi', img: '' }),

  /** CHARCUTERIE **/
  PLATEAU_CHARCUTERIE: new SousCategorie({ code: 'PLATEAU_CHARCUTERIE', label: 'Plateau de charcuterie', img: '' }),
  JAMBON: new SousCategorie({ code: 'JAMBON', label: 'Jambon', img: '' }),
  SAUCISSON: new SousCategorie({ code: 'SAUCISSON', label: 'Saucisson sec', img: '' }),
  PATE_TERRINE: new SousCategorie({ code: 'PATE_TERRINE', label: 'Pâté et Terrine', img: '' }),

  /** FROMAGE **/
  PLATEAU_FROMAGE: new SousCategorie({ code: 'PLATEAU_FROMAGE', label: 'Plateau de fromages', img: '' }),
  FROMAGE_VACHE: new SousCategorie({ code: 'FROMAGE_VACHE', label: 'Fromage au lait de vache', img: '' }),
  FROMAGE_CHEVRE: new SousCategorie({ code: 'FROMAGE_CHEVRE', label: 'Fromage au lait de chèvre', img: '' }),
  FROMAGE_BREBIS: new SousCategorie({ code: 'FROMAGE_BREBIS', label: 'Fromage au lait de brebis', img: '' }),
  FROMAGE: new SousCategorie({ code: 'FROMAGE', label: 'Fromage', img: '' }),

  /** VOLAILLE **/
  POULET: new SousCategorie({ code: 'POULET', label: 'Poulet', img: '' }),
  LAPIN: new SousCategorie({ code: 'LAPIN', label: 'Lapin', img: '' }),
  DINDE: new SousCategorie({ code: 'DINDE', label: 'Dinde', img: '' }),
  CAILLE: new SousCategorie({ code: 'CAILLE', label: 'Caille', img: '' }),
  FOIE_GRAS: new SousCategorie({ code: 'FOIE_GRAS', label: 'Foie Gras', img: '' }),
  CANARD: new SousCategorie({ code: 'CANARD', label: 'Canard', img: '' }),

  /** BOULANGERIE **/
  PAIN: new SousCategorie({ code: 'PAIN', label: 'Pain', img: '' }),
  VIENNOISERIE: new SousCategorie({ code: 'VIENNOISERIE', label: 'Viennoiserie', img: '' }),

  /** PATISSERIE **/
  GATEAUX: new SousCategorie({ code: 'GATEAUX', label: 'Gâteaux', img: '' }),
  TARTES: new SousCategorie({ code: 'TARTES', label: 'Tartes', img: '' }),
  MIGNARDISES: new SousCategorie({ code: 'MIGNARDISES', label: 'Mignardises', img: '' }),

  /** TRAITEUR_ROTISERIE **/
  SALADE: new SousCategorie({ code: 'SALADE', label: 'Salade', img: '' }),
  PIZZA: new SousCategorie({ code: 'PIZZA', label: 'Pizza', img: '' }),
  POULET_ROTI: new SousCategorie({ code: 'POULET_ROTI', label: 'poulet rôti', img: '' }),
  ACCOMPAGNEMENT: new SousCategorie({ code: 'ACCOMPAGNEMENT', label: 'Accompagnement', img: '' }),
  PLAT_CHAUD: new SousCategorie({ code: 'PLAT_CHAUD', label: 'Plats chauds', img: '' })

}

export const LIST_CATEGORIES: any = {
  POISSONNERIE: new ProduitCategorie({
    code: 'POISSONNERIE',
    label: 'Poissonnerie',
    img: 'assets/icons/categories-produit/POISSONNERIE.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.FRUITS_MER, LIST_SOUS_CATEGORIES.POISSON, LIST_SOUS_CATEGORIES.SUSHI]
  }),
  BOUCHERIE: new ProduitCategorie({
    code: 'BOUCHERIE',
    label: 'Boucherie',
    img: 'assets/icons/categories-produit/BOUCHERIE2.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.BOEUF, LIST_SOUS_CATEGORIES.VEAU, LIST_SOUS_CATEGORIES.PORC, LIST_SOUS_CATEGORIES.AGNEAU]
  }),
  FRUITS_LEGUMES: new ProduitCategorie({
    code: 'FRUITS_LEGUMES',
    label: 'Fruits, légumes',
    img: 'assets/icons/categories-produit/FRUITS_LEGUMES.png'
  }),
  CHARCUTERIE: new ProduitCategorie({
    code: 'CHARCUTERIE',
    label: 'Charcuterie',
    img: 'assets/icons/categories-produit/CHARCUTERIE.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.PLATEAU_CHARCUTERIE, LIST_SOUS_CATEGORIES.JAMBON, LIST_SOUS_CATEGORIES.SAUCISSON, LIST_SOUS_CATEGORIES.PATE_TERRINE]

  }),
  FROMAGE: new ProduitCategorie({
    code: 'FROMAGE',
    label: 'Fromage',
    img: 'assets/icons/categories-produit/FROMAGE2.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.PLATEAU_FROMAGE, LIST_SOUS_CATEGORIES.FROMAGE_BREBIS, LIST_SOUS_CATEGORIES.FROMAGE_VACHE, LIST_SOUS_CATEGORIES.FROMAGE_CHEVRE, LIST_SOUS_CATEGORIES.FROMAGE]
  }),
  VOLAILLE: new ProduitCategorie({
    code: 'VOLAILLE',
    label: 'Volaille',
    img: 'assets/icons/categories-produit/VOLAILLE.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.POULET, LIST_SOUS_CATEGORIES.LAPIN, LIST_SOUS_CATEGORIES.DINDE, LIST_SOUS_CATEGORIES.CAILLE, LIST_SOUS_CATEGORIES.FOIE_GRAS, LIST_SOUS_CATEGORIES.CANARD]
  }),
  BOULANGERIE: new ProduitCategorie({
    code: 'BOULANGERIE',
    label: 'Boulangerie',
    img: 'assets/icons/categories-produit/BOULANGERIE.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.PAIN, LIST_SOUS_CATEGORIES.VIENNOISERIE]

  }),
  PATISSERIE: new ProduitCategorie({
    code: 'PATISSERIE',
    label: 'Patisserie',
    img: 'assets/icons/categories-produit/PATISSERIE.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.GATEAUX, LIST_SOUS_CATEGORIES.TARTES, LIST_SOUS_CATEGORIES.MIGNARDISES]

  }),
  TRAITEUR_ROTISERIE: new ProduitCategorie({
    code: 'TRAITEUR_ROTISERIE',
    label: 'Traiteur',
    img: 'assets/icons/categories-produit/TRAITEUR.jpg',
    ssCategories: [LIST_SOUS_CATEGORIES.SALADE, LIST_SOUS_CATEGORIES.POULET_ROTI, LIST_SOUS_CATEGORIES.PLAT_CHAUD, LIST_SOUS_CATEGORIES.PIZZA, LIST_SOUS_CATEGORIES.ACCOMPAGNEMENT]
  }),
  ANIMALERIE: new ProduitCategorie({
    code: 'ANIMALERIE',
    label: 'Animalerie',
    img: 'assets/icons/categories-produit/ANIMALERIE.png'
  }),
  BOISSONS: new ProduitCategorie({
    code: 'BOISSONS',
    label: 'Boissons',
    img: 'assets/icons/categories-produit/BOISSONS.png'
  }),
}

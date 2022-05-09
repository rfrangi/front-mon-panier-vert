import {Creneau, LIST_CRENEAU} from "./creneau.model";

export class TypeRetrait {

  code!: string;
  label!: string;
  creneaux: Array<Creneau> = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.creneaux = data.creneaux.map((val: any) => new Creneau(val));
  }
}

export const LIST_TYPE_RETRAIT: any = {
  SITE: new TypeRetrait({ code: 'SITE', label: 'Retrait sur site', creneaux: [
      LIST_CRENEAU.DE12H13H,
      LIST_CRENEAU.DE12H13H,
      LIST_CRENEAU.DE14H15H,
      LIST_CRENEAU.DE15H16H,
      LIST_CRENEAU.DE16H17H,
      LIST_CRENEAU.DE17H18H,
      LIST_CRENEAU.DE18H19H,
      LIST_CRENEAU.DE19H20H,
    ]
  }),
  LIVRAISON: new TypeRetrait({ code: 'LIVRAISON', label: 'Livraison à domicile', creneaux: [
      LIST_CRENEAU.DE12H13H,
      LIST_CRENEAU.DE12H13H,
      LIST_CRENEAU.DE14H15H,
      LIST_CRENEAU.DE15H16H,
      LIST_CRENEAU.DE16H17H,
      LIST_CRENEAU.DE17H18H,
      LIST_CRENEAU.DE18H19H,
      LIST_CRENEAU.DE19H20H,
    ]
  }),
}

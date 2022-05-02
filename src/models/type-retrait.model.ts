export class TypeRetrait {

  code!: string;
  label!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

export const LIST_TYPE_RETRAIT: any = {
  SITE: new TypeRetrait({ code: 'SITE', label: 'Retrait sur site' }),
  LIVRAISON: new TypeRetrait({ code: 'LIVRAISON', label: 'Livraison à domicile'}),
}

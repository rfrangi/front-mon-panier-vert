export class Creneau {

  code!: string;
  label!: string;
  start!: number;
  end!: number;

  constructor(data: any= {}) {
    Object.assign(this, data);
  }
}

export const LIST_CRENEAU: any = {
  DE12H13H: new Creneau({ code: 'DE12H13H', label : '12h à 13h',start: 12, end: 13 }),
  DE13H14H: new Creneau({ code: 'DE13H14H', label : '13h à 14h',start: 13, end: 14 }),
  DE14H15H: new Creneau({ code: 'DE14H15H', label : '14h à 15h',start: 14, end: 15 }),
  DE15H16H: new Creneau({ code: 'DE15H16H', label : '15h à 16h',start: 15, end: 16 }),
  DE16H17H: new Creneau({ code: 'DE16H17H', label : '16h à 17h',start: 16, end: 17 }),
  DE17H18H: new Creneau({ code: 'DE17H18H', label : '17h à 18h',start: 17, end: 18 }),
  DE18H19H: new Creneau({ code: 'DE18H19H', label : '18h à 19h',start: 18, end: 19 }),
  DE19H20H: new Creneau({ code: 'DE19H20H', label : '19h à 20h',start: 19, end: 20 })
};

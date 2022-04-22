export class Creneau {

  code!: string;
  label!: string;

  constructor(data: any= {}) {
    Object.assign(this, data);
  }
}

export const LIST_CRENEAU: any = {
  DE12H13H: new Creneau({ code: 'DE12H13H', label : '12h à 13h',}),
  DE13H14H: new Creneau({ code: 'DE13H14H', label : '13h à 14h',}),
  DE14H15H: new Creneau({ code: 'DE14H15H', label : '14h à 15h',}),
  DE15H16H: new Creneau({ code: 'DE15H16H', label : '15h à 16h',}),
  DE16H17H: new Creneau({ code: 'DE16H17H', label : '16h à 17h',}),
  DE17H18H: new Creneau({ code: 'DE17H18H', label : '17h à 18h',}),
  DE18H19H: new Creneau({ code: 'DE18H19H', label : '18h à 19h',}),
  DE19H20H: new Creneau({ code: 'DE19H20H', label : '19h à 20h',})
};

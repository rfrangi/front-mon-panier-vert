export class Role {

  id: string;
  name: string;

  constructor(data: any= {}) {
    Object.assign(this, data);
  }
}

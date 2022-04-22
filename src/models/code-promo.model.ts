
export class CodePromo {

  public id!: string;
  public label!: string;
  public creationDate!: string;
  public modificationDate!: string;

  constructor(data: any= {}) {
   Object.assign(this, data);
  }
}

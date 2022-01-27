export class ItemNavigation {
  public code!: string;
  public label!: string;
  public urls: Array<string> = [];
  public icon!: string;
  public active!: string;
  public color!: string;

  constructor(data: Partial<ItemNavigation> = {}) {
    Object.assign(this, data);
  }
}

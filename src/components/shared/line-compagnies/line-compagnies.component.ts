import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {Compagnie} from "../../../models/compagnie.model";


@Component({
  selector:  'app-line-compagnies',
  templateUrl: `./line-compagnies.component.html`,
  styleUrls: ['./line-compagnies.component.scss']
})
export class LineCompagniesComponent {

  @Input() public compagnies: Array<Compagnie> = [];
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any> | undefined;

  constructor() {}


  public scrollRight(): void {
    this.widgetsContent?.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent?.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }
}

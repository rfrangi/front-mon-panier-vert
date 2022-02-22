import { Component, Input,Output, EventEmitter } from '@angular/core';
import {Pagination} from "../../../models/pagination.model";

@Component({
  selector:  'app-pagination',
  templateUrl: `./pagination.component.html`,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() public pagination!: Pagination;
  @Output() public change: EventEmitter<void> = new EventEmitter();

  public next(): void {
    this.pagination.currentPage = this.pagination.currentPage + 1;
    this.change.emit();
  }

  public previous(): void {
    this.pagination.currentPage = this.pagination.currentPage - 1;
    this.change.emit();
  }

  public goToLastPage(): void {
    this.pagination.currentPage = this.pagination.nbPages;
    this.change.emit();
  }


  public goToFirstPage(): void {
    this.pagination.currentPage = 1;
    this.change.emit();
  }
}


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompagnieService} from "../../services/compagnie.service";
import {Compagnie} from "../../models/compagnie.model";
import {Pagination} from "../../models/pagination.model";

@Component({
  selector:  'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public compagnies: Array<Compagnie> = [];
  public pagination!: Pagination;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private compagnieService: CompagnieService) {
    this.router = router;
    this.route = route;
  }

  public ngOnInit(): void {
    const params = Object.assign({
      page: this.pagination?.currentPage || 1
    });

    this.compagnieService.getAllByLimit(params).subscribe({
      next: (data: any) => {
        this.compagnies = data.result;
        this.pagination = data.pagination;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}


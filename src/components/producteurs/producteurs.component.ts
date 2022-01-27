import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-producteurs',
  template: `
      Producteurs
      <mat-form-field class="input-search" [floatLabel]="'never'">
        <input matInput placeholder="Oeufs, Carottes, Oignons" name="input-search">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
  `,
  styleUrls: ['./producteurs.component.scss']

})
export class ProducteursComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {}
}

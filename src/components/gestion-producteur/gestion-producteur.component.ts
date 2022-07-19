import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-gestion-producteur',
  templateUrl: `./gestion-producteur.component.html`,
  styleUrls: ['./gestion-producteur.component.scss']

})
export class GestionProducteurComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {}
}

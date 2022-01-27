import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

}

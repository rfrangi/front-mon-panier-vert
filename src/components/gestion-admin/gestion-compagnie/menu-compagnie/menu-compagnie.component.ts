import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-menu-compagnie',
  templateUrl: `./menu-compagnie.component.html`,
  styleUrls: ['./menu-compagnie.component.scss']

})
export class MenuCompagnieComponent implements  OnInit {

  public idCompagnie!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCompagnie = params['id'];
    });
  }

  goToUrl(urls: Array<string> = []): void {
    this.router.navigate(urls);
  }

  isActive(name: string): boolean {
    return this.router.url.includes(name);
  }
}

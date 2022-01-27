import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-menu-site',
  templateUrl: `./menu-site.component.html`,
  styleUrls: ['./menu-site.component.scss']

})
export class MenuSiteComponent implements  OnInit {

  public idSite!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idSite = params['id'];
      console.log(params, this.idSite);

    });
  }

  goToUrl(urls: Array<string> = []): void {
    this.router.navigate(urls);
  }

  isActive(name: string): boolean {
    return this.router.url.includes(name);
  }
}

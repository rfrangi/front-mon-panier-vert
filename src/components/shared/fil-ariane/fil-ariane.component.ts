import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector:  'app-fil-ariane',
  templateUrl: `./fil-ariane.component.html`,
  styleUrls: ['./fil-ariane.component.scss']
})
export class FilArianeComponent implements OnInit {

  constructor(private authService: AuthUserService, private router: Router) {}

  ngOnInit(): void {}
}


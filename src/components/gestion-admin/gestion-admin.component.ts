import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthUserService} from '../../services/auth-user.service';

@Component({
  selector:  'app-gestion-gestion-admin',
  templateUrl: `./gestion-admin.component.html`,
  styleUrls: ['./gestion-admin.component.scss']
})
export class GestionAdminComponent implements OnInit {

  constructor(private authService: AuthUserService, private router: Router) {}

  ngOnInit(): void {}
}


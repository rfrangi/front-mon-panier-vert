import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector:  'app-gestion-gestion-admin',
  templateUrl: `./list-produit.component.html`,
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {

  constructor(private authService: AuthUserService, private router: Router) {}

  ngOnInit(): void {}
}


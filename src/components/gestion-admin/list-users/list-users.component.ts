import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";

import {UserService} from "../../../services/user.service";
import {ToastService} from "../../../services/toast.service";
import {PopinService} from "../../../services/popin.service";

import {User} from "../../../models/user.model";

import {PopinConfirmComponent} from "../../shared/popins/popin-confirm/popin-confirm.component";
import {Pagination} from "../../../models/pagination.model";
import {LIST_USER_STATUS} from "../../../models/user-status.model";

@Component({
  selector:  'app-list-user',
  templateUrl: `./list-users.component.html`,
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public searchForm!: FormGroup;
  public users: Array<User> = [];
  public pagination: Pagination = new Pagination({});
  public listStatusUser = LIST_USER_STATUS;

  constructor(private toast: ToastService,
              private userService: UserService,
              private popinService: PopinService,
              private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
    this.search();
  }

  search(): void {
    const params = Object.assign({
      page: this.pagination.currentPage,
      searchTerm: this.searchForm.value.searchTerm
    });
    this.popinService.showLoader();
    this.userService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.users = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.popinService.closeLoader()
    })
  }

  goToEditUser(user: User): void {
    this.router.navigate(['administration', 'utilisateurs', user.id]);
  }


  removeUser(id: string): void {
    this.popinService.openPopin(PopinConfirmComponent, {
      data: {
        description: `Voulez-vous supprimer ce compte`,
        hasBtnBack: true,
        hasTitle: true,
        title: 'Confirmation',
        hasBtnConfirm: true,
        textConfirm: 'Valider',
        textBack: 'Annuler',
      }
    }).subscribe((result: any) => {
      if (result) {
        this.popinService.showLoader('Suppression en cours...');
        this.userService.delete(id).subscribe({
        next: () => {
          this.toast.success(`Ce compte est supprimé`);
          this.router.navigate(['administration', `utilisateurs`]);
        },
        error: err => this.toast.genericError(err),
        complete: () => this.popinService.closeLoader()
      });
      }
    });
  }

  public goTochangeStatus(user: User): void {
    user.status = (user.status === LIST_USER_STATUS.ACTIF) ? LIST_USER_STATUS.DESACTIVE : LIST_USER_STATUS.ACTIF;
    this.userService.updateStatus(user).subscribe({
      next: () => {
        this.search();
        this.toast.success(`L'utilisateur ${user.firstname} ${user.lastname} est ${user.status.label}`)
      },
      error: err => this.toast.genericError(err),
    })
  }
}


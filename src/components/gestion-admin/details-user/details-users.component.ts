import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from "../../../services/user.service";
import {ToastService} from "../../../services/toast.service";
import {PopinService} from "../../../services/popin.service";

import {User} from "../../../models/user.model";

@Component({
  selector:  'app-gestion-admin-details-user',
  templateUrl: `./details-users.component.html`,
  styleUrls: ['./details-users.component.scss']
})
export class DetailsUsersComponent implements OnInit {

  public user!: User;

  constructor(private userService: UserService,
              private popinService: PopinService,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private toast: ToastService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.onParamsChange(params);
    });
  }

  onParamsChange(params: any): any {
    if (params.id) {
      this.popinService.showLoader();
      this.userService.getById(params.id).subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (err: any) => this.toast.genericError(err),
        complete: () => this.popinService.closeLoader()
      });
    } else {
      this.user = new User();
    }
  }
}


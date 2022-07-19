import { Component, Input, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";

import {PopinService} from "../../../services/popin.service";
import {EntiteAdminService} from "../../../services/EntiteAdmin.service";

import {PopinAddAdminComponent} from "../popin/popin-add-admin/popin-add-admin.component";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector:  'app-details-admin',
  templateUrl: `./details-admin.component.html`,
  styleUrls: ['./details-admin.component.scss']
})
export class DetailsAdminComponent implements OnInit {

  @Input() users: Array<User> = [];
  @Input() public type!: string;
  @Input() public id!: string;

  constructor(private popinService: PopinService,
              private toast: ToastService,
              private entiteAdminService: EntiteAdminService,
  ) {}

  public ngOnInit(): void {
    this.entiteAdminService.getAdminForEntite(this.id, this.type).subscribe({
      next: (users: Array<User>) => this.users = users,
      error: (err: any) => console.error(err)
    });
  }

  public removeAdmin(user: any): void {

  }

  public showPopinAddAdmin(): void {
    this.popinService.openPopin(PopinAddAdminComponent, {
      data: {
        admins: this.users
      }
    }).subscribe({
      next: (data: any) => {
        if (data.result) {

          const body = data.userSelected.map((user: User) => {
            return {
              userId: user.id,
              entiteId: this.id,
              type: this.type
            }
          });
          this.entiteAdminService.create(body).subscribe({
            next: () => {
              this.toast.success('Les administeurs sont ajoutés.');
              this.ngOnInit();
            }
          })
        }
      }
    });
  }
}


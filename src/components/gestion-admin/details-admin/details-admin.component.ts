import { Component, Input, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";

import {PopinService} from "../../../services/popin.service";
import {EntiteAdminService} from "../../../services/EntiteAdmin.service";

import {PopinAddAdminComponent} from "../popin/popin-add-admin/popin-add-admin.component";

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
              private entiteAdminService: EntiteAdminService,
  ) {}

  public ngOnInit(): void {
    this.entiteAdminService.getAdminForEntite(this.id, this.type).subscribe({
      next: (users: Array<User>) => this.users = users,
      error: (err: any) => console.error(err)
    });
  }

  public showPopinAddAdmin(): void {
    this.popinService.openPopin(PopinAddAdminComponent, {
      data: {
        admins: this.users
      }
    }).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.result) {
          this.entiteAdminService.create(data.usersSelected.map(((user: User) => user.id), this.id, this.type))
            .subscribe()
        }
      }
    });
  }
}


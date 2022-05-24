import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {Pagination} from "../../../../models/pagination.model";
import {FormControl, FormGroup } from '@angular/forms';
import {Compagnie} from "../../../../models/compagnie.model";

export interface DialogData {
  admins: Array<User>
}

@Component({
  selector:  'app-popin-add-admin',
  templateUrl: `./popin-add-admin.component.html`,
  styleUrls: ['./popin-add-admin.component.scss']
})
export class PopinAddAdminComponent implements OnInit {

  public searchForm!: FormGroup;
  public users: Array<User> = [];
  public pagination: Pagination = new Pagination({});

  public usersSelected: Array<User> = [];

  constructor(public dialogRef: MatDialogRef<PopinAddAdminComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
  }

  public check(user: User): boolean {
    return this.data.admins.map((c: User) => c.id).includes(user.id);
  }
  public changeListSelected(matCheckboxChange: any, user: User): void {
    if(matCheckboxChange.checked) {
      this.usersSelected.push(user);
    } else {
      const index = this.usersSelected.map((c: User) => c.id).indexOf(user.id, 0);
      this.usersSelected.splice(index, 1);
    }
  }

  search(): void {
    const params = Object.assign({
      page: this.pagination.currentPage,
      searchTerm: this.searchForm.value.searchTerm
    });
    this.userService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.users = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => console.error(err),
    })
  }

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }

  public saveAdmin(): void {
    this.dialogRef.close({ result: true, userSelected: this.usersSelected });
  }
}


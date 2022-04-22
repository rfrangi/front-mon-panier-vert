import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../../../services/toast.service";
import {PopinService} from "../../../services/popin.service";
import {EmailService} from "../../../services/email.service";
import {Email} from "../../../models/email.model";
import {Pagination} from "../../../models/pagination.model";


@Component({
  selector:  'app-list-sites',
  templateUrl: `./list-emails.component.html`,
  styleUrls: ['./list-emails.component.scss']
})
export class ListEmailsComponent implements OnInit {

  public searchForm!: FormGroup;
  public emails: Array<Email> = [];
  public pagination: Pagination = new Pagination({});

  constructor(private toast: ToastService,
              private emailService: EmailService,
              private popinService: PopinService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl({value: '', disabled: false })
    });
    this.search();
  }

  public search(): void {
    const params = Object.assign({
      page: this.pagination.currentPage,
      searchTerm: this.searchForm.value.searchTerm
    });
    this.popinService.showLoader();
    this.emailService.getAllByParams(params).subscribe({
      next: (data: any) => {
        this.emails = data.result;
        this.pagination = data.pagination;
      },
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.popinService.closeLoader()
    })
  }

  public removeEmail(id: string): void {
    this.emailService.delete(id).subscribe({
      next: () => this.toast.success(`L'email' est supprimé`),
      error: (err: any) => this.toast.genericError(err),
      complete: () => this.search()
    })
  }

  public testEmailText(): void {
    this.emailService.tesMailText().subscribe({
      next: () => {
        this.toast.success('Email de test envoyé');
        this.search();
      },
      error: (err: any) => this.toast.genericError(err)
    })
  }

  public testEmailResetPassword(): void {
    this.emailService.testEmailResetPassword().subscribe({
      next: () => {
        this.toast.success('Email de test envoyé');
        this.search();
      },
      error: (err: any) => this.toast.genericError(err)
    })
  }
}


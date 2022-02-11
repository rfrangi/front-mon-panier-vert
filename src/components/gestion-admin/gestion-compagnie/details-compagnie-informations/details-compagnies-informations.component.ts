import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from "../../../../services/toast.service";
import {CompagnieService} from "../../../../services/compagnie.service";
import {Compagnie} from "../../../../models/compagnie.model";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LIST_PAYS, Pays} from "../../../../models/pays.model";
import {CompagnieStatus, LIST_COMPAGNIE_STATUS} from "../../../../models/compagnie-status.model";
import {PopinService} from "../../../../services/popin.service";
import {AdresseFormComponent} from "../../../shared/adresse/adresse-form/adresse-form.component";

@Component({
  selector:  'app-details-compagnies-informations',
  templateUrl: `./details-compagnies-informations.component.html`,
  styleUrls: ['./details-compagnies-informations.component.scss']
})
export class DetailsCompagniesInformationsComponent implements OnInit {

  public compagnie!: Compagnie;
  public compagnieForm!: FormGroup;
  public listPays: Array<Pays> = Object.values(LIST_PAYS);
  public listStatus: Array<CompagnieStatus> = Object.values(LIST_COMPAGNIE_STATUS);

  public step: number = 0;
  public isCreated: boolean = false;

  public updateInfo: boolean = false;
  public updateCoordonnee: boolean = false;
  public updateAdresse: boolean = false;

  @ViewChild('adresseFormComponent')
  public adresseFormComponent!: AdresseFormComponent;

  constructor(private toast: ToastService,
              private route: ActivatedRoute,
              private compagnieService: CompagnieService,
              private router: Router,
              private popinService: PopinService) {}

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.onParamsChange(params);
      });
    }
  }

  onParamsChange(params: any): any {
    if (params.id) {
      this.compagnieService.getById(params.id).subscribe({
      next: (compagnie: Compagnie) => {
        this.compagnie = compagnie;
        this.initForm();
      },
      error: err => this.toast.genericError(err)
    });
    } else {
      this.isCreated = true;
      this.updateInfo = true;
      this.updateCoordonnee = true;
      this.updateAdresse = true;
      this.compagnie = new Compagnie();
      this.initForm();
    }
  }

  public onUpdateInfo(): void {
    this.updateInfo = !this.updateInfo;
    this.initForm()
  }

  public onUpdateCoordonnee(): void {
    this.updateCoordonnee = !this.updateCoordonnee;
    this.initForm()
  }
  public resetFormAdresse(): void {
    this.updateAdresse = false;
    this.updateInfo = false;
    this.initForm();
    this.adresseFormComponent.initForm(!this.updateAdresse);
  }

  public onUpdateAdresse(): void {
    this.updateAdresse = !this.updateAdresse;
    this.adresseFormComponent.initForm(!this.updateAdresse);
  }

  initForm(): void {
    this.compagnieForm = new FormGroup({
      name: new FormControl({value: this.compagnie.name ? this.compagnie.name : '', disabled: !this.updateInfo}, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      siret: new FormControl({value: this.compagnie.siret || '', disabled: !this.updateInfo}, [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
      ]),
      email: new FormControl({value: this.compagnie.email, disabled: !this.updateCoordonnee }, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      status: new FormControl({value: this.compagnie.status.code, disabled: !this.updateInfo}, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      telephone: new FormControl({value: this.compagnie.telephone, disabled: !this.updateCoordonnee }, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ])
    })
  }

  public resetForm(): void {
    this.updateAdresse = false;
    this.updateInfo = false;
    this.updateCoordonnee = false;
    this.initForm();
  }

  submitForm(): void {
    if (this.compagnieForm.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs');
      return;
    }
    const data = this.compagnieForm.value;
    Object.assign(data, {id: this.compagnie.id ? this.compagnie.id : undefined })
    console.log(data);
  /*  this.popinService.showLoader();
    this.compagnieService.save(data, true).subscribe({
      next: (compagnie: Compagnie) => {
        this.toast.success(this.compagnie.id ? 'Les informations sont à jours' : `Votre entreprise est ajoutée`);
        this.compagnie = compagnie;
        this.popinService.closeLoader();
        this.goToListCompagnie();
      },
      error: (err: any) => {
        this.toast.genericError(err);
        this.popinService.closeLoader();
      },
      complete: () => this.popinService.closeLoader()
    })*/
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public goToListCompagnie(): void {
    this.router.navigate(['administration', 'compagnies'])
  }
}


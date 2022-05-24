import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators, FormArray} from "@angular/forms";

import {ToastService} from "../../../../services/toast.service";
import {CompagnieService} from "../../../../services/compagnie.service";
import {Compagnie} from "../../../../models/compagnie.model";

import {CompagnieStatus, LIST_COMPAGNIE_STATUS} from "../../../../models/compagnie-status.model";
import {PopinService} from "../../../../services/popin.service";
import {AdresseFormComponent} from "../../../shared/adresse/adresse-form/adresse-form.component";
import {Adresse} from "../../../../models/adresse.model";
import {LIST_CATEGORIES, ProduitCategorie} from "../../../../models/produit-categorie.model";
import {User} from "../../../../models/user.model";

@Component({
  selector:  'app-details-compagnies-informations',
  templateUrl: `./details-compagnies-informations.component.html`,
  styleUrls: ['./details-compagnies-informations.component.scss']
})
export class DetailsCompagniesInformationsComponent implements OnInit {

  public compagnie!: Compagnie;
  public compagnieForm!: FormGroup;


  public listStatus: Array<CompagnieStatus> = Object.values(LIST_COMPAGNIE_STATUS);
  public listCategories: Array<ProduitCategorie> = Object.values(LIST_CATEGORIES);

  public step: number = 0;
  public isCreated: boolean = false;

  public updateInfo: boolean = false;
  public updateCategories: boolean = false;
  public updateCoordonnee: boolean = false;
  public updateAdresse: boolean = false;
  public updateAdmin: boolean = false;

  @ViewChild('adresseFormComponent')
  public adresseFormComponent!: AdresseFormComponent;

  private file!: File;

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
      this.updateCategories = true;
      this.updateCoordonnee = true;
      this.updateAdresse = true;
      this.compagnie = new Compagnie();
      this.initForm();
    }
  }

  public changeImg($event: any): void {
    this.file = $event;
  }


  public onUpdateInfo(): void {
    this.updateInfo = !this.updateInfo;
    this.initForm();
  }

  public onUpdateCategories(): void {
    this.updateCategories = !this.updateCategories;
    this.initForm();
  }
  public saveCompagnieInfo(): void {
    this.compagnie.name = this.compagnieForm.value.name;
    this.compagnie.siret = this.compagnieForm.value.siret;
    this.compagnie.status = LIST_COMPAGNIE_STATUS[this.compagnieForm.value.status];
    this.compagnieService.save(this.compagnie.serialize(), true, this.file).subscribe({
      next: () => {
        this.toast.success('Les informations sont à jours');
        this.resetForm();
      },
      error: (err: any) =>  this.toast.genericError(err),
    })
  }

  public saveCoordonnee(): void {
    this.compagnie.telephone = this.compagnieForm.value.telephone;
    this.compagnie.email = this.compagnieForm.value.email;
    this.compagnieService.save(this.compagnie.serialize(), true).subscribe({
      next: (compagnie: Compagnie) => {
        this.toast.success('Les informations sont à jours');
        this.compagnie = compagnie;
        this.resetForm();
      },
      error: (err: any) =>  this.toast.genericError(err),
    })
  }

  public saveCategories(): void {
    const objCompagnie = this.compagnie.serialize() ;
    const list = (this.compagnieForm.controls['categories'] as FormArray).value;
    Object.assign(objCompagnie, { categories: list })
     this.compagnieService.save(objCompagnie, true).subscribe({
       next: (compagnie: Compagnie) => {
         this.toast.success('Les informations sont à jours');
         this.compagnie = compagnie;
         this.updateCategories = false;
         this.resetForm();
       },
       error: (err: any) =>  this.toast.genericError(err),
     })
  }

  public saveAdresse(): void {
    if (this.compagnieForm.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs');
    }

    const adr = this.adresseFormComponent.adresseform.value;
    adr.idAdresse = this.compagnie.adresse.idAdresse;
    this.compagnie.adresse = new Adresse(adr);

    this.compagnieService.update(this.compagnie.serialize(), true).subscribe({
      next: (comp: Compagnie) => {
        this.toast.success( 'Les informations sont à jours');
        this.compagnie = comp;
        this.resetFormAdresse();
      },
      error: (err: any) => this.toast.genericError(err)

    });
  }

  public onUpdateCoordonnee(): void {
    this.updateCoordonnee = !this.updateCoordonnee;
    this.initForm();
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

  public onUpdateAdmin(): void {
    this.updateAdmin = !this.updateAdmin;
    this.initForm();
  }

  public resetFormAdmin(): void {
    this.updateAdmin = false;
    this.updateAdresse = false;
    this.updateInfo = false;
    this.initForm();
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
      categories: new FormControl({value: this.compagnie.categories.map((cat: ProduitCategorie) => cat.code), disabled: !this.updateCategories}, [
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

  onCheckboxChange(event: any) {
   const list = this.compagnieForm.controls['categories'] as FormArray;
    if (list.value.includes(event)) {
      const index = list.value.indexOf(event);
      list.value.splice(index, 1);
    } else {
      list.value.push(event);
    }
  }

  public checkCategorie(cat: string): boolean {
    return (this.compagnieForm.controls['categories'] as FormArray).value.includes(cat);
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
    this.popinService.showLoader();
    this.compagnieService.save(data, true, this.file).subscribe({
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
    })
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public goToListCompagnie(): void {
    this.router.navigate(['administration', 'compagnies'])
  }

  public saveAdmin(): void {

  }
}


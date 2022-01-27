import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {Adresse} from "../../../models/adresse.model";
import {LIST_PAYS, Pays} from "../../../models/pays.model";
import {User} from "../../../models/user.model";
import {Civilite, LIST_CIVILITE} from "../../../models/civilite.model";

import {UserService} from "../../../services/user.service";
import {ToastService} from "../../../services/toast.service";
import {PopinService} from "../../../services/popin.service";
import {AdresseFormComponent} from "../adresse/adresse-form/adresse-form.component";
import {AdresseService} from "../../../services/adresse.service";
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector:  'app-details-utilisateur',
  templateUrl: `./details-utilisateur.component.html`,
  styleUrls: ['./details-utilisateur.component.scss']
})
export class DetailsUtilisateurComponent implements OnInit {

  public hide: boolean = true;
  public step: number = 0;
  public isUpdateIdent: boolean = false;
  public isUpdatePassword: boolean = false;
  public isUpdateInfoPerso: boolean = false;
  public isUpdateAdresse: boolean = false;

  public identifiantForm!: FormGroup;
  public passwordForm!: FormGroup;
  public infoPersoForm!: FormGroup;
  public adresseForm!: FormGroup;

  public listPays: Array<Pays> = Object.values(LIST_PAYS);
  public listCivilite: Array<Civilite> = Object.values(LIST_CIVILITE);


  @Input() public user!: User;

  @ViewChild('adresseFormComponent')
  public adresseFormComponent!: AdresseFormComponent;

  constructor(private authUserService: AuthUserService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private adresseService: AdresseService,
              private popinService: PopinService,
              private toast: ToastService) {}

  ngOnInit(): void {
    this.step = 0;
    this.initFormIdentification();
    this.initFormPassword();
    this.initFormInfoPerso();
    this.initFormAdresse();
  }

  initFormIdentification(): void {
    this.identifiantForm = new FormGroup({
      email: new FormControl({value: this.user.email, disabled: !this.isUpdateIdent}, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ])
    });
  }

  get isAdmin(): boolean {
    return this.authUserService.getUser().isAdmin() || false;
  }

  initFormPassword(): void {
    if (this.isAdmin) {
      this.passwordForm = new FormGroup({
        password: new FormControl({value: this.isUpdatePassword ? '' : '*********', disabled: !this.isUpdatePassword}, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]),
        passwordConfirm: new FormControl({
          value: this.isUpdatePassword ? '' : '*********',
          disabled: !this.isUpdatePassword
        }, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ])
      });
    } else {
      this.passwordForm = new FormGroup({
        passwordOld: new FormControl({
          value: this.isUpdatePassword ? '' : '*********',
          disabled: !this.isUpdatePassword
        }, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]),
        password: new FormControl({
          value: this.isUpdatePassword ? '' : '*********', disabled: !this.isUpdatePassword}, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]),
        passwordConfirm: new FormControl({
          value: this.isUpdatePassword ? '' : '*********',
          disabled: !this.isUpdatePassword
        }, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ])
      });
    }
  }

  initFormInfoPerso(): void {
    this.infoPersoForm = new FormGroup({
      civilite: new FormControl({value: this.user.civilite.code, disabled: !this.isUpdateInfoPerso}, [
        Validators.required,
      ]),
      lastname: new FormControl({value: this.user.lastname, disabled: !this.isUpdateInfoPerso}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      firstname: new FormControl({value: this.user.firstname, disabled: !this.isUpdateInfoPerso}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });
  }

  initFormAdresse(): void {
    this.adresseForm = new FormGroup({});
  }

  onUpdateFormIdentification(): void {
    this.isUpdateIdent = true;
    this.initFormIdentification();
  }

  onUpdateFormPassword(): void {
    this.isUpdatePassword = true;
    this.initFormPassword();
  }

  onUpdateFormInfoPerso(): void {
    this.isUpdateInfoPerso = true;
    this.initFormInfoPerso();
  }

  onUpdateFormAdresse(): void {
    this.isUpdateAdresse = true;
    this.adresseFormComponent.initForm(!this.isUpdateAdresse);
  }

  logout(): void {
    this.authUserService.signOut();
    this.router.navigate(['home']);
  }

  setStep(index: number): void {
    this.step = index;
  }

  submitFormIdentifiant(): void {
    if(this.user.email === this.identifiantForm.value.email) {
      this.toast.success('Les informations sont enregistrées');
      this.isUpdateIdent = false;
      return;
    }

    if(this.identifiantForm.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs.')
      return;
    }

    this.popinService.showLoader('Enregistrement des données');
    this.userService.updateEmail(this.user, this.identifiantForm.value.email, this.authUserService.getUser().isAdmin())
      .subscribe({
      next: (user: User) => {
        this.user.email = user.email;
        this.isUpdateIdent = false;
        this.toast.success('Les informations sont enregistrées');
        this.checkAndSaveUser(user);
        this.initFormIdentification();
        this.popinService.closeLoader();
      },
      error: (err: any) => {
        if(err.error.code === 'EMAIL_EXISTING') {
          this.toast.error(`Cette adresse mail est déjà utilisée.`)
        } else {
          this.toast.genericError(err)
        }
        this.popinService.closeLoader()
      }
    });
  }

  submitFormPassword(): void {
    if(this.passwordForm.invalid){
      this.toast.warning('Votre formulaire comporte des erreurs.')
      return;
    }
    if(this.passwordForm.value.passwordConfirm !== this.passwordForm.value.password) {
      this.toast.warning('Les mots de passe saisis ne correspondent pas.')
      return;
    }
    this.popinService.showLoader('Enregistrement des données');
    this.userService.updatePassword(this.user,
      this.passwordForm.value.passwordOld,
      this.passwordForm.value.password,
      this.isAdmin).subscribe({
      next: (user: User) => {
        this.user = user;
        this.isUpdatePassword = false;
        this.toast.success('Les informations sont enregistrées.');
        this.popinService.closeLoader();
      },
      error: (err: any) => {
        if(err.error.code === 'MDP_INVALID') {
          this.toast.error(`Votre mot de passe est incorrect.`)
        } else {
          this.toast.genericError(err);
        }
        this.popinService.closeLoader();
      }
    });
  }

  public submitFormAdresse(): void {
    console.log(this.adresseFormComponent.adresseform)
    if(this.adresseFormComponent.adresseform.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs.')
      return;
    }
    let adr: Adresse = new Adresse(this.adresseFormComponent.adresseform.value);
    adr.idAdresse = this.user.adresse.idAdresse;
    this.popinService.showLoader('Enregistrement des données');
    this.user.adresse = adr;
    this.adresseService.update(adr, this.isAdmin).subscribe({
      next: (adresse: Adresse) => {
        this.user.adresse = adresse;
        this.isUpdateAdresse= false;
        this.adresseFormComponent.initForm(!this.isUpdateAdresse);
        this.toast.success('Les informations sont enregistrées.');
        this.checkAndSaveAdresseUser(adresse);
        this.popinService.closeLoader();
      },
      error: (err: any) => {
        this.toast.genericError(err);
        this.popinService.closeLoader();
      }
  });
  }

  private checkAndSaveAdresseUser(adresse: Adresse): void {
    if(this.user.id === this.authUserService.getUser().id) {
      const user = this.authUserService.getUser();
      user.adresse = adresse;
      this.authUserService.saveUser(user.serialize(), true);
    }

  }

  public submitFormInfoPerso(): void {
    if(this.infoPersoForm.invalid) {
      this.toast.warning('Votre formulaire comporte des erreurs.')
      return;
    }
    this.user.firstname = this.infoPersoForm.value.firstname;
    this.user.lastname = this.infoPersoForm.value.lastname;
    this.user.civilite = LIST_CIVILITE[this.infoPersoForm.value.civilite];
    this.popinService.showLoader('Enregistrement des données');
    this.userService.save(this.user, this.authUserService.getUser().isAdmin()).subscribe({
      next: (user: User) => {
        this.user = user;
        this.toast.success('Les informations sont enregistrées');
        this.isUpdateInfoPerso = false;
        this.initFormInfoPerso();
        this.checkAndSaveUser(user);
        this.popinService.closeLoader();

      },
      error: (err: any) => this.toast.genericError(err)
    });
  }

  private checkAndSaveUser(user: User): void {
    if(user.id === this.authUserService.getUser().id) {
      this.authUserService.saveUser(user.serialize(), true);

    }
  }

  resetFormIdentification(): void {
    this.isUpdateIdent = false;
    this.initFormIdentification();
  }

  resetFormPassword(): void {
    this.isUpdatePassword = false;
    this.initFormPassword();
  }

  resetFormAdresse(): void {
    this.isUpdateAdresse = false;
    this.adresseFormComponent.initForm(!this.isUpdateAdresse);
    this.initFormAdresse();
  }

  resetFormInfoPerso(): void {
    this.isUpdateInfoPerso = false;
    this.initFormInfoPerso();
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}

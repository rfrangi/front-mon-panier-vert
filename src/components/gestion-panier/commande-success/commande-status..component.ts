import { Component } from '@angular/core';
import {CommandeService} from "../../../services/commande.service";
import {CommandeClient} from "../../../models/commande-client.model";
import { Router } from '@angular/router';
import {LIST_TYPE_RETRAIT, TypeRetrait} from "../../../models/type-retrait.model";

@Component({
  selector:  'app-commande-status',
  templateUrl: `./commande-status.component.html`,
  styleUrls: ['./commande-status..component.scss']
})
export class CommandeStatusComponent {

  public cmd!: CommandeClient;
  public modesRetrait = LIST_TYPE_RETRAIT;

  constructor(private commandeService: CommandeService, private router: Router) {
    this.cmd = this.commandeService.cmdSuccess;
    if (!this.cmd) {
      this.router.navigate(['home']);
    }
  }
}

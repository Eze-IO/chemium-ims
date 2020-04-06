import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ExtensionService } from '../../helpers/extension.service';
import { AdministratorService } from '../../services/administrator.service';
import { Type } from '../../models/type';
import { user } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  mainForm : FormGroup;
  _status: string = null;
  get status(): string {
    return this._status;
  }
  
  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private admin: AdministratorService) { }

}

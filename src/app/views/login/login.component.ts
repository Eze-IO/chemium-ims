import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ExtensionService } from '../../helpers/extension.service';
import { CurrentUserService } from '../../services/current-user.service';
import { Type } from '../../models/type';
import { user } from '../../models/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  mainForm : FormGroup;
  _status: string = null;
  get status(): string {
    return this._status;
  }
  loading:number = 0;

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private cu: CurrentUserService) { }

  ngOnInit() {
     this.mainForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  private email: string;
  private password: string;
  checkValues(){
    let result = false;
    this.email = this.mainForm.controls.email.value;
    this.password = this.mainForm.controls.password.value;
    if(ExtensionService.IsEmptyOrNull(this.email)||
      ExtensionService.IsEmptyOrNull(this.password))
      this._status = ("'Email' & 'Password' field is required");
    else
      result = true;
    return result;
  }

  toggleLoadingScreen(){
    if(this.loading===0){
      this.loading=2;
    } else {
      this.loading=0;
    }
  }

  async onSubmit(){
    if(this.checkValues()){
      if(!this.mainForm.invalid){
        this.toggleLoadingScreen();
        let x = await this.auth.Authorize(this.email, this.password);
        if(x){
          this._status = "Loading...";
          this.router.navigate(["/"], { relativeTo: this.route });
        } else {
          this._status = "Failed to login 🥺, incorrect email/password";
          this.toggleLoadingScreen();
        }
      } else {
        const invalid = [];
        this._status = "These fields are not valid: ";
        const controls = this.mainForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name.replace("_", " "));
            }
        }
      }
    }
  }
}

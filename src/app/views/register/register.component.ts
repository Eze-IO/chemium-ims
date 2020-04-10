import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ExtensionService } from '../../helpers/extension.service';
import { AdministratorService } from '../../services/administrator.service';
import { Type } from '../../models/type';
import { user } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  mainForm : FormGroup;
  _status: string = null;
  get status(): string {
    return this._status;
  }
  password_requirement:string = "Password must be at least 8 character(s), a uppercaseletter,"
  +" a lowercase letter, a number (0-9), and one special character (ex. ^ $ * .[]{}()?-!@#%&,><':;)";

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private admin: AdministratorService) { }

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
          phone_number: ['', Validators.required, Validators.pattern("[/^(1|)?(\d{3})(\d{3})(\d{4})$/]{11}")],
          password: ['', Validators.required],
          repeat_password: ['', Validators.required],
          user_role: ['', Validators.required]
    });
  }

  checkPassword(password:string): boolean {
    let r = /\d+/;
    let result = false;
    if(ExtensionService.IsEmptyOrNull(password))
      this._status = "Password cannot be empty!"
    if(password.length<8)
      this._status = this.password_requirement;
    if(password.match(r).length<=0)
      this._status = this.password_requirement;
    if(/[~`!#$@%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password))
      this._status = this.password_requirement;
    if(!(/[a-z]/.test(password)))
      this._status = this.password_requirement;
    if(!(/[A-Z]/.test(password)))
      this._status = this.password_requirement;
    else
      result = true;
    return result;
  }

  private first_name:string;
  private last_name:string;
  private email:string;
  private phone_number:string;
  private password:string;
  private password_repeat:string;
  private type:Type = 0;

  checkValues(): boolean {
    let result = false;
    this.first_name = this.mainForm.controls.first_name.value;
    this.last_name = this.mainForm.controls.last_name.value;
    this.email = this.mainForm.controls.email.value;
    //this.phone_number = this.mainForm.controls.phone_number.value;
    this.password = this.mainForm.controls.password.value;
    this.password_repeat = this.mainForm.controls.repeat_password.value;
    switch(this.mainForm.controls.user_role.value){
      case '3':
        this.type = Type.Administrator;
        break;
      case '2':
        this.type = Type.Editor;
        break;
      default:
        this.type = Type.Viewer;
        break;
    }
    let msg: string[] = [];
    if(ExtensionService.IsEmptyOrNull(this.first_name))
      msg.push("'First Name'");
    if(ExtensionService.IsEmptyOrNull(this.last_name))
      msg.push("'Last Name'");
    if(ExtensionService.IsEmptyOrNull(this.email))
      msg.push("'Email'");
    if(ExtensionService.IsEmptyOrNull(this.phone_number))
      msg.push("'Phone Number'");
    if(ExtensionService.IsEmptyOrNull(this.password))
      msg.push("'Password'");
    if(ExtensionService.IsEmptyOrNull(this.password_repeat))
      msg.push("'Repeat Password'");
    let sm = "These values are required: ";
    if(msg.length>0)
      for(let i=0;i<msg.length;i++){
        if(i==0){
          sm+=msg[i];
        } else {
          sm+=", "+msg[i];
        }
        this._status = sm;
    }


    if(msg.length<=0){
      if(this.password.trim()===this.password_repeat.trim()){
        if(this.checkPassword(this.password))
          result = true;
      } else{
        this._status = "Password(s) don't match!";
      }
    }
    return result;
  }


  getNumber(e) {
    if(!ExtensionService.IsEmptyOrNull(e))
      this.phone_number = e;
    else
      this.phone_number = null;
  }

  pnError:boolean = false;
  hasError(e) {
    this.pnError = !e;
  }

  onCountryChange(e) {
    console.log(e);
  }

  onTextChange(e){
      var match = e.target.value.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        e.target.value=[intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      }
  }

  onSubmit(){
    if(this.checkValues()){
      if(!this.mainForm.invalid){
        this._status = null;
        let u:user = new user();
        u.email = this.email;
        u.name = `${this.first_name} ${this.last_name}`;
        u.phone_number = this.phone_number;
        u.type = this.type;
        if(this.admin.CreateUser(u, this.password)){
          this.router.navigate(["/users"], { relativeTo: this.route });
        } else {
          this._status = "Failed to register user 🥺";
          const invalid = [];
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
        this._status+=invalid.join(", ");
      }
    }
  }
}

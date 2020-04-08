import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { Ng2TelInputModule } from 'ng2-tel-input';

@NgModule({
  imports: [
    Ng2TelInputModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    BsDropdownModule,
    BrowserModule,
    ButtonsModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ RegisterComponent ]
})
export class RegisterModule { }

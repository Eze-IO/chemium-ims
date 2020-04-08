import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
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

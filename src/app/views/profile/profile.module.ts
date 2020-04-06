import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ProfileRoutingModule,
    BsDropdownModule,
    ButtonsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }

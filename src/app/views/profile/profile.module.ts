import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    Ng2TelInputModule,
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

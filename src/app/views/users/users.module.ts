import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    UsersRoutingModule,
    BsDropdownModule,
    ButtonsModule,
    CommonModule
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }

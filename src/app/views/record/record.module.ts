import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RecordComponent } from './record.component';
import { RecordRoutingModule } from './record-routing.module';
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    RecordRoutingModule,
    BsDropdownModule,
    ButtonsModule,
    CommonModule,
    ModalModule 
  ],
  declarations: [ RecordComponent ]
})
export class RecordModule { }

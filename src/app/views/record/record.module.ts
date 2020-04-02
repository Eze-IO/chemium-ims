import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { RecordComponent } from './record.component';
import { RecordRoutingModule } from './record-routing.module';

@NgModule({
  imports: [
    RecordRoutingModule,
    BsDropdownModule,
    ButtonsModule
  ],
  declarations: [ RecordComponent ]
})
export class RecordModule { }

import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  imports: [
    ReportRoutingModule,
    BsDropdownModule,
    ButtonsModule
  ],
  declarations: [ ReportComponent ]
})
export class ReportModule { }

import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    ProfileRoutingModule,
    BsDropdownModule,
    ButtonsModule
  ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }

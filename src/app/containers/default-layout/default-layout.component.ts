import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { RestAPIService } from '../../services/rest-api.service';
import { response } from '../../models/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  public results: string;

  constructor(private ras: RestAPIService) { }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
    this.results = String(this.ras.getEntity("warehouse"));
  }

}

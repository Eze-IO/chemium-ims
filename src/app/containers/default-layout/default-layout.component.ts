import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { response } from '../../models/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor() { }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}

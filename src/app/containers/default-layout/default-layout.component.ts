import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { response } from '../../models/response';
import { CurrentUserService } from '../../services/current-user.service';
import { ExtensionService } from '../../helpers/extension.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private cu: CurrentUserService) { }

  public GetName(): string {
    let user = null;//= this.cu.GetInfo().name;
    if (ExtensionService.IsEmptyOrNull(user))
      return "Hello 👋 and Welcome!";
    return "Hello 👋, ${user}";
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}

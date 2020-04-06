import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { response } from '../../models/response';
import { CurrentUserService } from '../../services/current-user.service';
import { ExtensionService } from '../../helpers/extension.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public header_picture:SafeHtml;

  constructor(private cu: CurrentUserService) { this.setPicture(); }

  public GetName(): string {
    let user = this.cu.GetInfo().name;
    if (ExtensionService.IsEmptyOrNull(user))
      return "Hello 👋 and Welcome!";
    return "Hello 👋, ${user}";
  }

  public setPicture() {
    this.header_picture = "<img src='"+this.cu.GetInfo().picture+"' class='img-avatar' alt='"+this.cu.GetInfo().email+"' />";
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}

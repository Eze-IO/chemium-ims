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
  public HeaderPicture: SafeHtml;
  public Name:string;

  constructor(private cu: CurrentUserService) {
    this.setPicture();
    this.GetName();
  }

  private async GetName(): Promise<string> {
    let user = this.cu.GetInfo;
    this.Name = user.name;
    if (ExtensionService.IsEmptyOrNull(user.name))
      return "Hello 👋 and Welcome!";
    return "Hello 👋, ${user}";
  }

  public async setPicture() {
    let user = this.cu.GetInfo;
    this.HeaderPicture = "<img src='" + user.picture + "' class='img-avatar' alt='" + user.email + "' />";
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}

import {Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { response } from '../../models/response';
import { CurrentUserService } from '../../services/current-user.service';
import { ExtensionService } from '../../helpers/extension.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public HeaderPicture: SafeHtml;
  public Name:string;

  constructor(private cu: CurrentUserService) {
    this.setPicture();
    this.GetName();
  }

  ngOnInit(): void {
    this.setPicture();
    this.GetName();
  }

  private async GetName() {
    let user = this.cu.GetInfo;
    if(ExtensionService.IsEmptyOrNull(user.name)||user.name===undefined)
      this.Name = "Hello 👋 and Welcome!";
    else
      this.Name = `Hello 👋, ${user.name}`;
  }

  public async setPicture() {
    let user = this.cu.GetInfo;
    console.log(user.picture);
    if(user.picture===undefined||ExtensionService.IsEmptyOrNull(user.picture))
      user.picture = "../../../../assets/img/avatars/default.png";
    this.HeaderPicture = "<img src='" + user.picture + "' class='img-avatar' alt='" + user.email + "' />";
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}

import {Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { response } from '../../models/response';
import { CurrentUserService } from '../../services/current-user.service';
import { ExtensionService } from '../../helpers/extension.service';
import { SafeHtml } from '@angular/platform-browser';
import { user } from '../../models/user';
import { timer } from 'rxjs';
import { AdministratorService } from '../../services/administrator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems;
  public HeaderPicture: SafeHtml;
  private u:user = new user();
  public Name:string;

  constructor(private cu: CurrentUserService,
  private admin: AdministratorService) {
    this.setPicture();
    this.GetName();
  }

  ngOnInit(): void {
    timer(1750, 25000).subscribe((val) => {
      this.setPicture();
      this.GetName();
    });
    this.loadNav();
  }

  private loadNav(){
    navItems.forEach(x => {
      console.log(x);
      if(x.url==='/users'){
        console.log(x.attributes['disabled']);
        x.attributes['disabled'] = (this.admin.IsAdministrator);
      }
    })
    this.navItems = navItems;
  }

  private async GetName() {
    this.u = this.cu.GetInfo;
    if(ExtensionService.IsEmptyOrNull(this.u.name)||this.u.name===undefined)
      this.Name = "Hello 👋 and Welcome!";
    else
      this.Name = `Hello 👋, ${this.u.name}`;
  }

  public async setPicture() {
    this.u = this.cu.GetInfo;
    if(this.u.picture===undefined||ExtensionService.IsEmptyOrNull(this.u.picture))
      this.u.picture = "../../../../assets/img/avatars/default.png";
    this.HeaderPicture = "<img src='" + this.u.picture + "' class='img-avatar' alt='" + this.u.email + "' />";
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}

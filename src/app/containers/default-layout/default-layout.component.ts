import {Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { response } from '../../models/response';
import { CurrentUserService } from '../../services/current-user.service';
import { ExtensionService } from '../../helpers/extension.service';
import { SafeHtml } from '@angular/platform-browser';
import { user } from '../../models/user';
import { timer } from 'rxjs';
import { AdministratorService } from '../../services/administrator.service';
import { ThemeService } from 'ng2-charts';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

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
  showHeaderInfo:boolean = true;

  constructor(private cu: CurrentUserService,
  private admin: AdministratorService,
  private auth: AuthenticationService,
  private router: Router) {
    this.setPicture();
    this.GetName();
    this.checkAuth();
  }

  ngOnInit(): void {
    timer(1750, 25000).subscribe((val) => {
      if(ExtensionService.IsConnected()){
        this.setPicture();
        this.GetName();
        this.navItems = navItems;
        this.showHeaderInfo = true;
      } else {
        this.navItems = null;
        this.showHeaderInfo = false;
      }
    });
  }

  private checkAuth(){
    if(!this.auth.IsAuthorized){
      this.router.navigate(["/logout"]);
    }
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

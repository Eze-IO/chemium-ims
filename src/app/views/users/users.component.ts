import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../services/administrator.service';
import { RestAPIService } from "../../services/rest-api.service";
import { user } from "../../models/user";
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList:user[] = [];
  _status: string = null;
  get status(): string {
    return this._status;
  }
  _success: boolean = false;
  get success(): boolean {
    return this._success;
  }
  loading:number = 2;

  constructor(private admin:AdministratorService,
    private ras: RestAPIService,
    private cu: CurrentUserService) { }

  ngOnInit(): void {
    this.updateView();
  }

  updateView(){
    this.userList = [];
    this.admin.GetUsers().then(element => {
      this.loading = 2;
      element.forEach(e => {
        e.picture = `"${e.picture}"`;
        this.userList.push(e);
      })
      if(this.userList.length<=0)
        this.loading = 1;
      else
        this.loading = 0;
    });
  }

  deleteUser(u) {
    if((<user>u).email!==this.cu.GetInfo.email) {
      this.admin.DeleteUser(u).then(x => {
        if(x){
          this._success = true;
          this._status = `Successfully removed user ${u.name}`;
          this.updateView();
        } else {
          this._success = false;
          this._status = `Failed to remove user ${u.name}`;
        }
      })
    } else {
      this._success = false;
      this._status = "User cannot remove itself!";
    }
  }
}

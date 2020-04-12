import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../services/administrator.service';
import { RestAPIService } from "../../services/rest-api.service";
import { user } from "../../models/user";
import { userinformation } from "../../models/userinformation";
import { CurrentUserService } from '../../services/current-user.service';
import { timer } from 'rxjs';
import { ExtensionService } from '../../helpers/extension.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList:userinformation[] = [];
  currentUser:user;
  _status: string = null;
  get status(): string {
    return this._status;
  }
  _success: boolean = false;
  get success(): boolean {
    return this._success;
  }
  loading:number = 2;

  constructor(public admin:AdministratorService,
    private ras: RestAPIService,
    private cu: CurrentUserService) { }

  ngOnInit(): void {
    timer(1025, 60000).subscribe(x => {
      this.currentUser = this.cu.GetInfo;
      this.updateView();
    })
  }

  formatDate(date: Date):string {
    date = new Date(date);
    return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()+" "+date.toLocaleTimeString('en-US'))
  }

  updateView(){
    this.userList = [];
    this.admin.GetUsers().then(element => {
      this.loading = 2;
      timer(2000).subscribe(x => {
        element.forEach(e => {
          if(ExtensionService.IsEmptyOrNull(e.picture))
            e.picture = "../../../../assets/img/avatars/default.png";
          this.userList.push(e);
        })
        if(this.userList.length<=0)
          this.loading = 1;
        else
          this.loading = 0;
      })
    });
  }

  sendConfirmation(u:userinformation){
    if(u.status.toLocaleLowerCase()==='unconfirmed'){
      this.ras.SendConfirmation(u.email).then(x =>{
        timer(8000).subscribe((x)=> {
          this._status = null;
          this._success = false;
        });
        if(x){
          this._status = "Confirmation email has been sent 📧";
          this._success = true;
        } else {
          this._status = "Failed to send confirmation email";
          this._success = false;
        }
      });
    }
  }

  deleteUser(u) {
    if((<user>u).email!==this.cu.GetInfo.email) {
      this.loading = 2;
      this.admin.DeleteUser(u).then(x => {
        timer(8000).subscribe((x)=> {
          this._status = null;
          this._success = false;
        });
        if(x){
          this._success = true;
          this._status = `Successfully removed user ${u.name}`;
          this.updateView();
        } else {
          this._success = false;
          this._status = `Failed to remove user ${u.name}`;
        }
        this.loading = 0;
      })
    } else {
      timer(8000).subscribe((x)=> {
        this._status = null;
        this._success = false;
      });
      this._success = false;
      this._status = "User cannot remove itself!";
      this.loading = 0;
    }
    this.loading = 0;
  }
}

import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { CurrentUserService } from './current-user.service';
import { userinformation } from '../models/userinformation';
import { user } from '../models/user';
import { Type } from '../models/type';
import { AuthenticationService } from './authentication.service';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  private u: user = new user();
  constructor(private ras: RestAPIService,
              private cu: CurrentUserService) { 
                this._list = [];
              }

  public get IsAdministrator() {
    this.cu.GetInfo().then(x => {
      this.u = x;
    })
    return (this.u.type===Type.Administrator);
  }

  private _list:userinformation[];
  public async GetUsers() {
    if(this.IsAdministrator){
      this._list = [];
      let result = await this.ras.ListUsers();
      result.forEach(element => {
          let u:userinformation = new userinformation();
          u.name = element['Name'];
          u.username = element['Username'];
          u.email = element['Email'];
          u.phone_number = element['PhoneNumber'];
          u.lastmodified = element['LastModified'];
          u.enabled = element['Enabled'];
          u.created = element['Created'];
          u.picture = element['Picture'];
          u.status = element['Status'];
          switch(element['Type']){
            case 'administrator':
            case 4:
              u.type = 4;
              break;
            case 'editor':
            case 2:
              u.type = 2;
              break;
            default:
              u.type = 0;
              break;
          }
          this._list.push(u);
      });
    }
    return this._list;
  }

  public IsUserConfirmed(ui:userinformation): boolean {
    return (ui.status.toLowerCase()==='confirmed');
  }

  public async CreateUser(user: user, password: string) {
    if(this.IsAdministrator){
      let fn = user.name.split(' ')[0];
      let ln = user.name.split(' ')[1];
      let result = await this.ras.UpdateRegister(fn, ln, user.email, password, user.phone_number, user.type);
      return result;
    }
    return false;
  }

  public async DeleteUser(user: user) {
    if(this.IsAdministrator){
      let result = await this.ras.DeleteUser(user.email).then(x => { return x; });
      return result;
    }
    return false;
  }
}

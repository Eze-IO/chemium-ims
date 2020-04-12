import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { user } from "../models/user";
import { Type } from "../models/type";
import { ExtensionService } from "../helpers/extension.service";
import { AuthenticationService } from '../services/authentication.service';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private u:user = new user();
  constructor(private ras: RestAPIService,
  private auth: AuthenticationService) { }

  private _firstName: string;
  private _lastName: string;
  public get FirstName(): string { return this._firstName; }
  public get LastName(): string { return this._lastName; }


  private _timer = null;
  public get GetInfo(): user {
    if(this._timer===null&&
    this.u===undefined){
      this._getUser();
    }
    if(this._timer===null){
      this._timer = timer(750, 10000).subscribe(x => {
        this._getUser();
      })
    }
    return this.u;
  }

  private _getUser() {
    this.ras.GetUser(AuthenticationService.Token).then(x => {
      let u:user = new user();
      if(x!==null&&x!==undefined){
        u.email = x['Email'];
        u.name = x['Name'];
        u.phone_number = x['PhoneNumber'];
        u.picture = x['Picture'];
        u.type = (<Type>x['Type']);
        this.u = u;

        if(!ExtensionService.IsEmptyOrNull(u.name)){
          let _name = u.name.split(' ');
          this._firstName = ExtensionService.IsEmptyOrNull(_name[0]) ? null : _name[0];
          this._lastName = ExtensionService.IsEmptyOrNull(_name[1]) ? null : _name[1];
        }
      }
    });
  }

  public async UpdateInfo(user: user) {
    let result = await this.ras.UpdateUser(user);
    return result;
  }

  public async ChangePassword(current: string, _new: string) {
    let result = await this.ras.ChangePassword(current, _new);
    return result;
  }

  public async UploadPicture(picture: string) {
    let result = await this.ras.UploadUserPicture(this.u.email, picture);
    return result;
  }

  public LastPage(): string {
    return localStorage.getItem('last_page');
  }

}

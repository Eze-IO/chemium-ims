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


  public async GetInfo() {
    await this.ras.GetUser(AuthenticationService.Token).then(x => {
      this.u = new user();
      if(x!==null&&x!==undefined){
        this.u.email = x['Email'];
        this.u.name = x['Name'];
        this.u.phone_number = x['PhoneNumber'];
        this.u.picture = x['Picture'];
        this.u.type = (<Type>x['Type']);

        if(!ExtensionService.IsEmptyOrNull(this.u.name)){
          let _name = this.u.name.split(' ');
          this._firstName = ExtensionService.IsEmptyOrNull(_name[0]) ? null : _name[0];
          this._lastName = ExtensionService.IsEmptyOrNull(_name[1]) ? null : _name[1];
        }
      }
    });
    return this.u;
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

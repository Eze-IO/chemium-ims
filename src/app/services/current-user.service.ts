import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { user } from "../models/user";
import { Type } from "../models/type";
import { ExtensionService } from "../helpers/extension.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private ras: RestAPIService) { }

  private _firstName: string;
  private _lastName: string;
  public get FirstName(): string { return this._firstName; }
  public get LastName(): string { return this._lastName; }

  public GetInfo(): user {
    let u: user = new user();
    this.ras.UpdateUser(null).then(data => {
      u.name = data['name'];
      u.email = data['email'];
      u.phone_number = data['phone_number'];
      u.picture = data['picture'];
      u.type = Type['type'];

      let _name = u.name;
      this._firstName = ExtensionService.IsEmptyOrNull(_name.split(' ')[0]) ? null : _name.split(' ')[0];
      this._lastName = ExtensionService.IsEmptyOrNull(_name.split(' ')[1]) ? null : _name.split(' ')[1];
    });
    return u;
  }

  public UpdateInfo(user: user): boolean {
    this.ras.UpdateUser(user).then(results => {
      if (results !== null)
        return true;
    });
    return false;
  }

  public UploadPicture(picture: string): boolean {
    let username = this.GetInfo().email;
    this.ras.UploadUserPicture(username, picture).then(results =>
      { return results });
    return false;
  }

  public IsConfirmed(): boolean {
    return false;
  }
}

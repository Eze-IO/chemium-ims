import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { user } from "../models/user";
import { Type } from "../models/type";
import { ExtensionService } from "../helpers/extension.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private u:user = new user();
  constructor(private ras: RestAPIService) {
    this.ras.UpdateUser(null).then(data => {
      console.log(data);
      if (data != null) {
        this.u.name = data['Name'];
        this.email = this.u.email = data['Username'];
        this.u.phone_number = data['PhoneNumber'];
        this.u.picture = data['Picture'];
        this.u.type = Type['Type'];

        let _name = this.u.name.split(' ');
        this._firstName = ExtensionService.IsEmptyOrNull(_name[0]) ? null : _name[0];
        this._lastName = ExtensionService.IsEmptyOrNull(_name[1]) ? null : _name[1];
      }
    });
  }

  private email: string;
  private _firstName: string;
  private _lastName: string;
  public get FirstName(): string { return this._firstName; }
  public get LastName(): string { return this._lastName; }

  public get GetInfo(): user {
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
    let result = await this.ras.UploadUserPicture(this.email, picture);
    return result;
  }

  public IsConfirmed(): boolean {
    return !(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(this.GetInfo.email));
  }
}

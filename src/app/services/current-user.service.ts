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
    if (ExtensionService.IsEmptyOrNull(this.u.picture))
      this.u.picture = "https://d1uuza77bngiy9.cloudfront.net/images/user_default.jpg";
    this.ras.UpdateUser(null).then(data => {
      if (data != null) {
        this.u.name = data['name'];
        this.email = this.u.email = data['email'];
        this.u.phone_number = data['phone_number'];
        this.u.picture = data['picture'];
        this.u.type = Type['type'];

        let _name = this.u.name;
        this._firstName = ExtensionService.IsEmptyOrNull(_name.split(' ')[0]) ? null : _name.split(' ')[0];
        this._lastName = ExtensionService.IsEmptyOrNull(_name.split(' ')[1]) ? null : _name.split(' ')[1];
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

  public async UploadPicture(picture: string) {
    let result = await this.ras.UploadUserPicture(this.email, picture);
    return result;
  }

  public IsConfirmed(): boolean {
    return false;
  }
}

import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { user } from "../models/user";
import { Type } from "../models/type";
import { ExtensionService } from "../helpers/extension.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private ras: RestAPIService) { this.GetInfo().then(x => x); }

  private email: string;
  private _firstName: string;
  private _lastName: string;
  public get FirstName(): string { return this._firstName; }
  public get LastName(): string { return this._lastName; }

  public async GetInfo(): Promise<user> {
    let u: user = new user();
    if(ExtensionService.IsEmptyOrNull(u.picture))
      u.picture = "https://d1uuza77bngiy9.cloudfront.net/images/user_default.jpg";
    try {
      let data = await this.ras.UpdateUser(null);
          u.name = data['name'];
          this.email = u.email = data['email'];
          u.phone_number = data['phone_number'];
          u.picture = data['picture'];
          u.type = Type['type'];

          let _name = u.name;
        this._firstName = ExtensionService.IsEmptyOrNull(_name.split(' ')[0]) ? null : _name.split(' ')[0];
        this._lastName = ExtensionService.IsEmptyOrNull(_name.split(' ')[1]) ? null : _name.split(' ')[1];
      return u;
    } catch(err) { return u; }
  }

  public async UpdateInfo(user: user): Promise<boolean> {
    let result = await this.ras.UpdateUser(user).then(x => {
      if (new String(x) === null)
        return true;
      return false;
    });
    return result;
  }

  public UploadPicture(picture: string): Promise<boolean> {
    return this.ras.UploadUserPicture(this.email, picture);
  }

  public IsConfirmed(): boolean {
    return false;
  }
}

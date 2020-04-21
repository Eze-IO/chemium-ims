import { Injectable, EventEmitter } from '@angular/core';
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



  public async GetInfo()  {
    this.u = new user();
    let result = await this.ras.GetUser(AuthenticationService.Token);
    if(result!==null&&result!==undefined){
      this.u.email = result['Email'];
      this.u.name = result['Name'];
      this.u.phone_number = result['PhoneNumber'];
      this.u.picture = result['Picture'];
      switch(result['Type']){
        case 'administrator':
        case 4:
          this.u.type = 4;
          break;
        case 'editor':
        case 2:
          this.u.type = 2;
          break;
        default:
          this.u.type = 0;
          break;
      }

      if(!ExtensionService.IsEmptyOrNull(this.u.name)){
        let _name = this.u.name.split(' ');
        if(_name.length>0){
          this._lastName = ExtensionService.IsEmptyOrNull(_name[_name.length-1]) ? " " : _name[_name.length-1];
          _name.length = (_name.length-1);
          this._firstName = ExtensionService.IsEmptyOrNull(_name.join(' ')) ? " " : _name.join(' ');
        }
      }
    }
    return this.u;
  }

  private InfoHasChanged: EventEmitter<any> = new EventEmitter();
  public onInfoChange() { return this.InfoHasChanged; }

  public async UpdateInfo(user: user) {
    let result = await this.ras.UpdateUser(user);
    if(result){
      this.InfoHasChanged.emit(result);
    }
    return result;
  }

  public async ChangePassword(current: string, _new: string) {
    let result = await this.ras.ChangePassword(current, _new);
    return result;
  }

  private HasPictureChanged: EventEmitter<any> = new EventEmitter();
  public onPictureChange() { return this.HasPictureChanged; }

  public async UploadPicture(picture: string) {
    let result = await this.ras.UploadUserPicture(this.u.email, picture);
    if(result){
      this.HasPictureChanged.emit(result);
    }
    return result;
  }

  public LastPage(): string {
    return localStorage.getItem('last_page');
  }

}

import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { CurrentUserService } from './current-user.service';
import { user } from '../models/user';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private ras: RestAPIService,
              private cu: CurrentUserService) { }

  public get IsAdministrator(): boolean {
    let result = this.cu.GetInfo;
    return (result.type===Type.Administrator);
  }

  public async GetUsers() {
    let list:user[] = [];
    let result = await this.ras.ListUsers();
    console.log(result);
    result.forEach(element => {
        let u:user = new user();
        console.log(element);
        u.name = element['Name'];
        u.email = element['Username'];
        u.phone_number = element['PhoneNumber'];
        u.picture = element['Picture'];
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
        list.push(u);
    });
    return list;
  }

  public IsUserConfirmed(u:user): boolean {
    return !(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(u.email));
  }

  public async CreateUser(user: user, password: string) {
    let fn = user.name.split(' ')[0];
    let ln = user.name.split(' ')[1];
    let result = await this.ras.UpdateRegister(fn, ln, user.email, password, user.phone_number, user.type);
    return result;
  }

  public async DeleteUser(user: user) {
    let result = await this.ras.DeleteUser(user.email).then(x => { return x; });
    return result;
  }
}

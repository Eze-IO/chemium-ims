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

  public get IsAdministrator(){
    return (this.cu.GetInfo().type===Type.Administrator);
  }

  public GetUsers():user[] {
    let list:user[] = [];
    this.ras.ListUsers().then(users => {
      users.array.forEach(element => {
        let u:user = new user();
        u.name = element['name'];
        u.email = element['email'];
        u.phone_number = element['phone_number'];
        u.picture = element['picture'];
        switch(element['type'].toString().toLowerCase()){
          case 'administrator':
          case '4':
            u.type = 4;
            break;
          case 'editor':
          case '2':
            u.type = 2;
            break;
          default:
            u.type = 0;
            break;
        }
        list.push(u);
      });
    })
    return null;
  }

  public CreateUser(user: user, password: string):boolean {
    let fn = user.name.split(' ')[0];
    let ln = user.name.split(' ')[1];
    this.ras.UpdateRegister(fn, ln, user.email, password, user.phone_number, user.type).then(x => {
        return x;
    })
    return false;
  }

  public DeleteUser(user: user):boolean {
    this.ras.DeleteUser(user.email).then(x => { return x; });
    return false;
  }
}

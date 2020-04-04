import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private ras: RestAPIService) { }

  public static GetUsers():user[] {
    return null;
  }

  public static CreateUser(user: user):boolean {
    return false;
  }

  public static DeleteUser(user: user):boolean {
    return false;
  }
}

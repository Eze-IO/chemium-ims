import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private ras: RestAPIService) { }

  public GetUsers():user[] {
    //this.ras.
    return null;
  }

  public CreateUser(user: user):boolean {
    return false;
  }

  public DeleteUser(user: user):boolean {
    return false;
  }
}

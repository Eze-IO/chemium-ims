import { Injectable } from '@angular/core';
import { RestAPIService } from './rest-api.service';
import { user } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private ras: RestAPIService) { }

  public static FirstName: string;
  public static LastName: string;
  public static Token: string = null;

  public static GetInfo(): user {
    return new user();
  }

  public static UpdateInfo(user: user): boolean {
    return false;
  }

  public static IsConfirmed(): boolean {
    return false;
  }

  public static Authorize(username: string, password: string): boolean {
    //
    return false;
  }

  public static IsAuthorized(): boolean {
    return false;
  }

  public static Deauthorize(username: string, password: string): boolean {
    //
    return false;
  }
}
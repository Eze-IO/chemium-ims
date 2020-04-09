import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestAPIService } from './rest-api.service';
import { ExtensionService } from '../helpers/extension.service';
import { JwtInterceptor } from '../jwt.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public static get Token(): string {
    return sessionStorage.getItem('auth_token');
  }
  constructor(private ras: RestAPIService) { }

  public async Authorize(username: string, password: string) {
    let x = await this.ras.TokenRequester(username, password);
    if(x===null){
      return false;
    } else {
      sessionStorage.setItem('auth_token', x);
      sessionStorage.setItem('auth_header', `IMS ${x}`);
      return true;
    }
  }

  public get IsAuthorized(): boolean {
    return (sessionStorage.getItem('auth_header') === `IMS ${AuthenticationService.Token}`);
  }

  public Deauthorize(): void {
    sessionStorage.setItem('auth_header', null)
    sessionStorage.setItem('auth_token', null);
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { RestAPIService } from './rest-api.service';
import { ExtensionService } from '../helpers/extension.service';
import { JwtInterceptor } from '../jwt.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public static get ID(): string {
    return localStorage.getItem('auth_token_id');
  }
  public static get Token(): string {
    return localStorage.getItem('auth_token');
  }
  constructor(private ras: RestAPIService) { }

  public async Authorize(username: string, password: string) {
    let x = await this.ras.TokenRequester(username, password);
    if(x===null){
      return false;
    } else {
      localStorage.setItem('auth_token_id', x['ID']);
      localStorage.setItem('auth_token', x['AccessKey']);
      localStorage.setItem('auth_header', `IMS ${x['AccessKey']}`);
      return true;
    }
  }

  public get IsAuthorized(): boolean {
    return (localStorage.getItem('auth_header') === `IMS ${AuthenticationService.Token}`);
  }

  public Deauthorize(): void {
    localStorage.setItem('auth_header', null);
    localStorage.setItem('auth_token', null);
  }
}

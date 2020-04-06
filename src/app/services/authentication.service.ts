import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestAPIService } from './rest-api.service';
import { ExtensionService } from '../helpers/extension.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static _token = null;
  public static get Token(): string {
    return this._token;
  }
  constructor(private ras: RestAPIService,
              private request: HttpRequest<any>) { }

  public Authorize(username: string, password: string): boolean {
    let x = this.ras.TokenRequester(username, password);
    return false;
  }

  public get IsAuthorized(): boolean {
    return this.request.headers.get('Authorization') === 'IMS ${AuthenticationService._token}';
  }

  public Deauthorize(): void {
    AuthenticationService._token=null;
  }
}

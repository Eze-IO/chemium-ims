import { Injectable } from '@angular/core';
import { restapiurl } from '../models/restapiurl';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../models/response';
import { user } from '../models/user';
import { ExtensionService } from '../helpers/extension.service';
import { CurrentUserService } from './current-user.service';
import { Type } from '../models/type';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  constructor(private http: HttpClient) {}

 public GetEntity(entity: string): Promise<any> {
   if (!ExtensionService.IsEmptyOrNull(entity))
      entity = entity.toLowerCase();
   const request = {
      'entity': entity
    };

    return this.http.post(restapiurl.getentity, request, httpOptions).toPromise<any>()
      .then(val => {
          if (val['Success']) {
            let json = JSON.parse(val['Result']);
            return json[entity];
          }
        }
      ).catch(err =>
        console.log('Error: ' + err));
 }

 public AddToEntity(entity: string, attributes:any): Promise<boolean> {
   if (!ExtensionService.IsEmptyOrNull(entity)) {
     const request = {
       'entity': entity
     };
     for (let key in attributes) {
       request[key] = attributes[key];
     };
     return this.http.post(restapiurl.addtoentity, request, httpOptions).toPromise<any>()
       .then(val => {
           if (val['Success']) {
             let json = JSON.parse(val['Result']);
             console.log(json);
             return val['Success'];
           }
         }
       ).catch(err =>
         console.log('Error: ' + err));
   }
 }

 public UpdateEntity(entity: string, id: number, column: string, value: string): Promise<boolean> {
   if (!ExtensionService.IsEmptyOrNull(entity)) {
     const request = {
       'entity': entity,
       'id': id,
       'column': column,
       'value': value,
     };
     return this.http.post(restapiurl.updateentity, request, httpOptions).toPromise<any>()
       .then(val => {
           if (val['Success']) {
             let json = JSON.parse(val['Result']);
             console.log(json);
             return val['Success'];
           }
         }
       ).catch(err =>
         console.log('Error: ' + err));
   }
 }

 public ModifyEntity(entity: string, id: number): Promise<boolean> {
   if (!ExtensionService.IsEmptyOrNull(entity)) {
     const request = {
       'entity': entity,
       'id': id,
     };
     return this.http.post(restapiurl.modifyentity, request, httpOptions).toPromise<any>()
       .then(val => {
           if (val['Success']) {
             let json = JSON.parse(val['Result']);
             console.log(json);
             return val['Success'];
           }
         }
       ).catch(err =>
         console.log('Error: ' + err));
   }
 }

  public UpdateRegister(first_name: string, last_name: string,
    email: string, password: string, phone_number: string, type :Type) : Promise<any> {
    if (!ExtensionService.IsEmptyOrNull(first_name) || !ExtensionService.IsEmptyOrNull(last_name) ||
      !ExtensionService.IsEmptyOrNull(email) || !ExtensionService.IsEmptyOrNull(password) ||
      !ExtensionService.IsEmptyOrNull(phone_number) || !ExtensionService.IsEmptyOrNull(type.toString())) {
      const request = {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password':password,
        'phone_number': phone_number,
        'type': Type[type]
      };

      return this.http.post(restapiurl.userregister, request, httpOptions).toPromise<any>()
        .then(val => {
            if (val['Success']) {
              let json = JSON.parse(val['Result']);
              return json;
            }
          }
        ).catch(err =>
          console.log('Error: ' + err));
    }
    return null;
  }

  public UpdateUser(user: user): Promise<any> {
    if (user != null) {
      const request = {
        'username': user.email,
        'name': user.name,
        'phone_number': user.phone_number,
        'token': CurrentUserService.Token
      };

      return this.http.post(restapiurl.updateuser, request, httpOptions).toPromise<any>()
        .then(val => {
            if (val['Success']) {
              let json = JSON.parse(val['Result']);
              return json;
            }
          }
        ).catch(err =>
          console.log('Error: ' + err));
    }
    return null;
  }

  public ListUsers(user: user): Promise<any> {
    if (user != null) {
      let result = null;
      const request = {
        'username': user.email,
        'name': user.name,
        'phone_number': user.phone_number,
        'token': null
      };

      return this.http.post(restapiurl.listusers, request, httpOptions).toPromise<any>()
        .then(val => {
            if (val['Success']) {
              let json = JSON.parse(val['Result']);
              return json;
            }
          }
        ).catch(err =>
          console.log('Error: ' + err));
    }
    return null;
  }
}

import { Injectable } from '@angular/core';
import { restapiurl } from '../models/restapiurl';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../models/response';
import { user } from '../models/user';
import { AuthenticationService } from './authentication.service';
import { ExtensionService } from '../helpers/extension.service';
import { CurrentUserService } from './current-user.service';
import { Type } from '../models/type';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  constructor(private http: HttpClient) {
    httpOptions.headers.append('X-IMS-ID', AuthenticationService.Token);
  }

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

 public GetReport(functionName: string, parameters: any): Promise<boolean> {
   if (!ExtensionService.IsEmptyOrNull(functionName)) {
     const request = {
       'name': functionName,
       'params': JSON.parse(parameters),
     };
     return this.http.post(restapiurl.getreport, request, httpOptions).toPromise<any>()
       .then(val => {
           if (val['Success']) {
             let json = JSON.parse(val['Result']);
             return json;
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
             console.log(val['Result']);
             return val['Success'];
           }
         }
       ).catch(err =>
         console.log('Error: ' + err));
   }
 }

  public UpdateRegister(first_name: string, last_name: string,
    email: string, password: string, phone_number: string, type :Type) : Promise<boolean> {
    if (!ExtensionService.IsEmptyOrNull(first_name) && !ExtensionService.IsEmptyOrNull(last_name) &&
      !ExtensionService.IsEmptyOrNull(email) && !ExtensionService.IsEmptyOrNull(password) &&
      !ExtensionService.IsEmptyOrNull(phone_number) && !ExtensionService.IsEmptyOrNull(type.toString())) {
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
              console.log(val['Result']);
              return val['Success'];
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
        'token': AuthenticationService.Token
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

  public UploadUserPicture(username: string, picture: string): Promise<boolean> {
    if (!ExtensionService.IsEmptyOrNull(username) &&
      !ExtensionService.IsEmptyOrNull(picture)) {
      const request = {
        'username': username,
        'picture': picture
      };
      return this.http.post(restapiurl.uploaduserpicture, request, httpOptions).toPromise<any>()
        .then(val => {
            if (val['Success']) {
              console.log(val['Result']);
              return val['Success'];
            }
          }
        ).catch(err =>
          console.log('Error: ' + err));
    }
  }

  public ListUsers(): Promise<any> {
    return this.http.get(restapiurl.listusers, httpOptions).toPromise<any>()
      .then(val => {
          if (val['Success']) {
            let json = JSON.parse(val['Result']);
            return json;
          }
        }
      ).catch(err =>
        console.log('Error: ' + err));
  }

  public TokenRequester(username: string, password: string): Promise<any> {
    if (!ExtensionService.IsEmptyOrNull(username) &&
      !ExtensionService.IsEmptyOrNull(password)) {
      const request = {
        'username': username,
        'password': password
      };
      return this.http.post(restapiurl.tokenrequester, request, httpOptions).toPromise<any>()
        .then(val => {
            if (val['Success']) {
              let json = JSON.parse(val['Result']);
              return json;
            }
          }
        ).catch(err =>
          console.log('Error: ' + err));
    }

  }

  public DeleteUser(username: string): Promise<boolean> {
    if (!ExtensionService.IsEmptyOrNull(username)) {
      const request = {
        'username': username
      };
      return this.http.post(restapiurl.deleteuser, request, httpOptions).toPromise<any>()
        .then(val => {
            if (val['Success']) {
              console.log(val['Result']);
              return val['Success'];
            }
          }
        ).catch(err =>
          console.log('Error: ' + err));
    }

  }

  public Test(): Promise<any> {
    const request = JSON.parse('[{"trucker_id":1,"rate":688.0,"company":"Wordpedia","warehouse_id":2},{"trucker_id":2,"rate":676.0,"company":"Reallinks","warehouse_id":4},{"trucker_id":3,"rate":699.0,"company":"Youbridge","warehouse_id":1},{"trucker_id":4,"rate":656.0,"company":"Ainyx","warehouse_id":5},{"trucker_id":5,"rate":660.0,"company":"Kwilith","warehouse_id":1},{"trucker_id":6,"rate":576.0,"company":"Flipstorm","warehouse_id":4}]');
    return this.http.post("https://uclss8ss43.execute-api.us-east-2.amazonaws.com/dev/Chemium_IMS_Functions_Test", request, httpOptions).toPromise<any>()
      .then(val => {
          if (val['Success']) {
            let json = JSON.parse(val['Result']);
            return json;
          }
        }
      ).catch(err =>
        console.log('Error: ' + err));
  }
}

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

   return this.http.post<any>(restapiurl.getentity.toString(), request, httpOptions).toPromise<any>()
      .then(x => {
          if (x['Success']) {
            let json = JSON.parse(x['Result']);
            return json[entity];
          }
          return null;
        }
      ).catch(err => {
        console.log('Error: ' + err);
        return null;
      });
 }

 public AddToEntity(entity: string, attributes:any): Promise<boolean> {
   if (!ExtensionService.IsEmptyOrNull(entity)) {
     const request = {
       'entity': entity
     };
     for (let key in attributes) {
       request[key] = attributes[key];
     };
     return this.http.post<any>(restapiurl.addtoentity.toString(), request, httpOptions).toPromise<boolean>()
       .then(x => {
         console.log(x['Result']);
         return (x['Success']);
       }).catch(err => {
         console.log('Error: ' + err);
         return false;
       });
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
     return this.http.post<any>(restapiurl.updateentity.toString(), request, httpOptions).toPromise<boolean>()
       .then(x => {
           console.log(x['Result']);
           return (x['Success']);
         }
       ).catch(err => {
         console.log('Error: ' + err);
         return false;
       });
   }
 }

 public GetReport(functionName: string, parameters: any): Promise<any> {
   if (!ExtensionService.IsEmptyOrNull(functionName)) {
     const request = {
       'name': functionName,
       'params': JSON.parse(parameters),
     };
     return this.http.post<any>(restapiurl.getreport.toString(), request, httpOptions).toPromise<any>()
       .then(x => {
           if (x['Success']) {
             let json = JSON.parse(x['Result']);
             return json;
           }
           return null;
         }
       ).catch(err => {
         console.log('Error: ' + err);
         return null;
       });
   }
 }

 public ModifyEntity(entity: string, id: number): Promise<boolean> {
   if (!ExtensionService.IsEmptyOrNull(entity)) {
     const request = {
       'entity': entity,
       'id': id,
     };
     return this.http.post<any>(restapiurl.modifyentity.toString(), request, httpOptions).toPromise<boolean>()
       .then(x => {
           console.log(x['Result']);
           return (x['Success']);
         }
       ).catch(err => {
         console.log('Error: ' + err);
         return false;
       });
   }
 }

  public UpdateRegister(first_name: string, last_name: string,
    email: string, password: string, phone_number: string, type :Type) : Promise<boolean> {
    if (!ExtensionService.IsEmptyOrNull(first_name) &&
      !ExtensionService.IsEmptyOrNull(last_name) &&
      !ExtensionService.IsEmptyOrNull(email) &&
      !ExtensionService.IsEmptyOrNull(password) &&
      !ExtensionService.IsEmptyOrNull(phone_number) &&
      !ExtensionService.IsEmptyOrNull(type.toString())) {
      const request = {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': password,
        'phone_number': phone_number,
        'type': Type[type]
      };

      return this.http.post<any>(restapiurl.userregister.toString(), request, httpOptions).toPromise<boolean>()
        .then(x => {
            console.log(x['Result']);
            return (x['Success']);
          }
        ).catch(err => {
          console.log('Error: ' + err);
          return false;
        });
    } else {
      return new Promise<boolean>(null).then(x => false);
    }
  }

  public UpdateUser(_user: user): Promise<any> {
    if (_user === null || user === undefined) {
      _user = new user;
      _user.email = "?";
      _user.email = "?";
      _user.phone_number = "?";
      _user.picture = "?";
      _user.type = Type.Viewer;
    }
    const request = {
        'username': _user.email,
        'name': _user.name,
        'phone_number': _user.phone_number,
        'token': AuthenticationService.Token
      };

      return this.http.post<any>(restapiurl.updateuser.toString(), request, httpOptions).toPromise<any>()
        .then(x => {
            if (x['Success']) {
              let json = JSON.parse(x['Result']);
              return json;
            }
            return null;
          }
        ).catch(err => {
          console.log('Error: ' + err);
          return null;
        });
  }

  public UploadUserPicture(username: string, picture: string): Promise<boolean> {
    if (!ExtensionService.IsEmptyOrNull(username) &&
      !ExtensionService.IsEmptyOrNull(picture)) {
      const request = {
        'username': username,
        'picture': picture
      };
      return this.http.post<any>(restapiurl.uploaduserpicture.toString(), request, httpOptions).toPromise<boolean>()
        .then(x => {
            console.log(x['Result']);
            return (x['Success']);
          }
        ).catch(err => {
          console.log('Error: ' + err);
          return false;
        });
    }
  }

  public ListUsers(): Promise<any> {
    return this.http.get<any>(restapiurl.listusers.toString(), httpOptions).toPromise<any>()
      .then(x => {
          if (x['Success']) {
            let json = JSON.parse(x['Result']);
            return json;
          }
          return null;
        }
      ).catch(err => {
        console.log('Error: ' + err);
        return null;
      });
  }

  public TokenRequester(username: string, password: string): Promise<any> {
    if (!ExtensionService.IsEmptyOrNull(username) &&
      !ExtensionService.IsEmptyOrNull(password)) {
      const request = {
        'username': username,
        'password': password
      };
      return this.http.post<any>(restapiurl.tokenrequester.toString(), request, httpOptions).toPromise<any>()
        .then(x => {
            if (x['Success']) {
              let json = JSON.parse(x['Result']);
              return json;
            }
            return null;
          }
        ).catch(err => {
          console.log('Error: ' + err);
          return null;
        });
    }

  }

  public DeleteUser(username: string): Promise<boolean> {
    if (!ExtensionService.IsEmptyOrNull(username)) {
      const request = {
        'username': username
      };
      return this.http.post<any>(restapiurl.deleteuser.toString(), request, httpOptions).toPromise<boolean>()
        .then(x => {
            console.log(x['Result']);
            return (x['Success']);
          }
        ).catch(err => {
          console.log('Error: ' + err);
          return false;
        });
    }

  }

  public Test(): Promise<any> {
    const request = JSON.parse('[{"trucker_id":1,"rate":688.0,"company":"Wordpedia","warehouse_id":2},{"trucker_id":2,"rate":676.0,"company":"Reallinks","warehouse_id":4},{"trucker_id":3,"rate":699.0,"company":"Youbridge","warehouse_id":1},{"trucker_id":4,"rate":656.0,"company":"Ainyx","warehouse_id":5},{"trucker_id":5,"rate":660.0,"company":"Kwilith","warehouse_id":1},{"trucker_id":6,"rate":576.0,"company":"Flipstorm","warehouse_id":4}]');
    return this.http.post("https://uclss8ss43.execute-api.us-east-2.amazonaws.com/dev/Chemium_IMS_Functions_Test", request, httpOptions).toPromise<any>()
      .then(x => {
          if (x['Success']) {
            let json = JSON.parse(x['Result']);
            return json;
          }
        }
      ).catch(err => {
        console.log('Error: ' + err);
        return null;
      });
  }
}

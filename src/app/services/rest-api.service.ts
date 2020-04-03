import { Injectable } from '@angular/core';
import { restapi } from '../models/restapi';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../models/response';
import { user } from '../models/user';
import { StringExService } from '../helpers/string-ex.service';

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
    if (!StringExService.IsEmptyOrNull(entity))
      entity = entity.toLowerCase();
    let result = null;
    const request = {
      'entity': entity
    };

    return this.http.post(restapi.getentity, request, httpOptions).toPromise<any>()
      .then(val => {
          if (val['Success']) {
            let json = JSON.parse(val['Result']);
            return json[entity];
          }
        }
      ).catch(err =>
        console.log('Error: ' + err));
  }

  public UpdateUser(user: user): Promise<any> {
    if (user != null) {
      let result = null;
      const request = {
        'username': user.email,
        'name': user.name,
        'phone_number': user.phone_number,
        'token': null
      };

      return this.http.post(restapi.updateuser, request, httpOptions).toPromise<any>()
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

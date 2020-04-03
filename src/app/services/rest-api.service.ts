import { Injectable } from '@angular/core';
import { restapi } from '../models/restapi';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../models/response';
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
  constructor(private http: HttpClient) { }

  GetEntity(entity: string): Observable<any> {
    if(!StringExService.IsEmptyOrNull(entity))
      entity = entity.toLowerCase();
    let result = null;
    const request = {
      'entity':entity
    };
    this.http.post<any>(restapi.getentity, request, httpOptions).subscribe(
      (val) => {
        if (val['Success']) {
          let json = JSON.parse(val['Result']);
          result = json[entity];
        }
      },
      err => {
        console.log('Error:', err);
      }
    );
    return result;
  }
}

import { Injectable } from '@angular/core';
import { restapi } from '../models/restapi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../models/response';

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

  getEntity(entity: string):Observable<response> {
    const request = {
      'entity':entity
    };
    return this.http.post<response>(restapi.getentity, request, httpOptions);
  }
}

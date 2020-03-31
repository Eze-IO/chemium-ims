import { Injectable } from '@angular/core';
import { restapi } from '../models/restapi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getEntity(entity: string):Observable<any> {
    const request = {
      'entity':entity
    };
    return this.http.post<any>(restapi.getentity, request, httpOptions);
  }
}

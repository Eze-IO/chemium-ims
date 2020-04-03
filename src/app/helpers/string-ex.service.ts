import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringExService {

  constructor() { }

  //Check if a string is null or empty
  public static IsEmptyOrNull(str: string) {
    return (!str || 0 === str.length);
  }
}

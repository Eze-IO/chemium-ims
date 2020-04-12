import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

  constructor() { }

  //Check if a string is null or empty
  public static IsEmptyOrNull(str: string) {
    return (!str || 0 === str.length);
  }

  //check if internet connection exits
  public static IsConnected() {
    return navigator.onLine;
  }
}

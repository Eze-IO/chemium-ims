import { Injectable } from '@angular/core';
import { warehouse } from '../models/entities/warehouse';
import { RestAPIService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private ras: RestAPIService) { }

  public GetEntries(): warehouse[] {
    return [new warehouse(), new warehouse()];
  }

  public DeleteEntry(id:number): boolean {
    return false;
  }
}

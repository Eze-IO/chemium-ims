import { Injectable } from '@angular/core';
import { warehouse } from '../../models/entities/warehouse';
import { RestAPIService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  public static Name:string = "Warehouse";

  constructor(private ras: RestAPIService) { }

  public GetEntries(): warehouse[] {
    let arr: warehouse[] = new Array();
    let entries = this.ras.GetEntity("warehouse");
    entries.then(items => {
      items.forEach(function (item) {
        let w = new warehouse();
        w.warehouse_id = item['warehouse_id'];
        w.location_desc = item['location_desc'];
        w.unit_measurement_id = item['unit_measurement_id'];
        w.warehouse_rate = item['warehouse_rate'];
        w.trader_id = item['trader_id'];
        arr.push(w);
      });
    });
    return arr;
  }

  public GetEntry(id: number): warehouse {
    let all = this.GetEntries();
    return all.find(x => x.warehouse_id === id);
  }

  public UpdateEntry(warehouse: warehouse): boolean {
    return false;
  }

  public DeleteEntry(id:number): boolean {
    return false;
  }
}

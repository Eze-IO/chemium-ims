import { Injectable } from '@angular/core';
import { warehouse } from '../../models/entities/warehouse';
import { RestAPIService } from '../rest-api.service';
import { Type } from '../../models/type';
import { user } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  public static Name:string = "Warehouse";

  private u:user = new user();
  constructor(private ras: RestAPIService) { }

  public CorrespondingRecords(): String[] {
    return ["Trucker", "Inventory"];
  }

  public async GetEntries()  {
    let arr: warehouse[] = new Array();
    let ws = await this.ras.GetEntity("warehouse");
    if(ws===null)
      return [];
    ws.forEach(function (item) {
        let w = new warehouse();
        w.warehouse_id = item['warehouse_id'];
        w.location_desc = item['location_desc'];
        w.unit_measurement_id = item['unit_measurement_id'];
        w.warehouse_rate = item['warehouse_rate'];
        w.trader_id = item['trader_id'];
        arr.push(w);
    });
    console.log(arr);
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.unit_measurement_id === id);
    }
    return null;
  }

  public async AddEntry(unit_measurement: warehouse) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("warehouse", unit_measurement);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("warehouse", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("unit_measurement", id);
      return result;
    }
    return false;
  }
}

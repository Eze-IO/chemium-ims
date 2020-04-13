import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { unit_measurement } from '../../models/entities/unit_measurement';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class UnitMeasurementService {

  public static Name:string = "Unit Of Measurement";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["lc"];
  }

  public async GetEntries() {
    let arr: unit_measurement[] = new Array();
    if(this.u.type!==Type.Viewer){
      let unit_measurements = await this.ras.GetEntity("unit_measurement");
      unit_measurements.forEach(function(item) {
        let u = new unit_measurement();
        u.unit_measurement_id = item['unit_measurement_id'];
        u.unit_measurement_desc = item['unit_measurement_desc'];
        arr.push(u);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.unit_measurement_id === id);
    }
    return null;
  }

  public async AddEntry(unit_measurement: unit_measurement) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("unit_measurement", unit_measurement);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("unit_measurement", id, columnName, value);
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

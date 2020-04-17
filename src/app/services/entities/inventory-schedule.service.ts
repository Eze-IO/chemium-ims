import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { inventory_schedule } from '../../models/entities/inventory_schedule';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class InventoryScheduleService {
  public static Name:string = "Inventory Schedule";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return [];
  }

  public async GetEntries() {
    let arr: inventory_schedule[] = new Array();
    if(this.u.type!==Type.Viewer){
      let inventory_schedules = await this.ras.GetEntity("inventory_schedule");
      if(inventory_schedules===null)
        return [];
      inventory_schedules.forEach(function(item) {
        let is = new inventory_schedule();
        is.inventory_status_id = item['inventory_status_id'];
        is.product_id = item['product_id']
        is.inventory_id = item['inventory_id'];
        arr.push(is);
        console.log(item);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.inventory_status_id === id);
    }
    return null;
  }

  public async AddEntry(inventory_schedule: inventory_schedule) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("inventory_schedule", inventory_schedule);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("inventory_schedule", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("inventory_schedule", id);
      return result;
    }
    return false;
  }
}

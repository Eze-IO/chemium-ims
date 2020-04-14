import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { inventory } from '../../models/entities/inventory';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public static Name:string = "Inventory";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["Inventory Schedule", "Bridge Finance"];
  }

  public async GetEntries() {
    let arr: inventory[] = new Array();
    if(this.u.type!==Type.Viewer){
      let inventories = await this.ras.GetEntity("inventory");
      if(inventories===null)
        return [];
      inventories.forEach(function(item) {
        let i = new inventory();
        i.inventory_id = item['inventory_id'];
        i.product_id = item['product_id'];
        i.warehouse_id = item['warehouse_id'];
        i.quantity = item['quantity'];
        i.received_date = item['received_date'];
        i.release_date = item['release_date'];
        arr.push(i);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.inventory_id === id);
    }
    return null;
  }

  public async AddEntry(inventory: inventory) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("inventory", inventory);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("inventory", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("inventory", id);
      return result;
    }
    return false;
  }
}

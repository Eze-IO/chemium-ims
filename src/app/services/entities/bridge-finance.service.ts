import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { bridge_finance } from '../../models/entities/bridge_finance';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class BridgeFinanceService {

  public static Name:string = "bridge_finance";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["inventory_schedule"];
  }

  public async GetEntries() {
    let arr: bridge_finance[] = new Array();
    if(this.u.type!==Type.Viewer){
      let bridge_finances = await this.ras.GetEntity("bridge_finance");
      if(bridge_finances===null)
        return [];
      bridge_finances.forEach(function(item) {
        let bf = new bridge_finance();
        bf.inventory_id = item['inventory_id'];
        bf.cost = item['cost'];
        arr.push(bf);
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

  public async AddEntry(bridge_finance: bridge_finance) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("bridge_finance", bridge_finance);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("bridge_finance", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("bridge_finance", id);
      return result;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { bl } from '../../models/entities/bl';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class BLService {

  public static Name:string = "Bill Of Landing";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["Contract"];
  }

  public async GetEntries() {
    let arr: bl[] = new Array();
    if(this.u.type!==Type.Viewer){
      let bls = await this.ras.GetEntity("bl");
      bls.forEach(function(item) {
        let b = new bl();
        b.bl_id = item['bl_id'];
        b.bl_status_id = item['bl_status_id'];
        b.port_of_discharge = item['port_of_discharge']
        b.port_of_loading = item['port_of_loading'];
        b.bl_date = item["bl_date"];
        arr.push(b);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.bl_id === id);
    }
    return null;
  }

  public async AddEntry(agent: bl) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("bl", agent);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("bl", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("bl", id);
      return result;
    }
    return false;
  }
}

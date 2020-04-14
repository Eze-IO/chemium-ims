import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { trucker } from '../../models/entities/trucker';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class TruckerService {

  public static Name:string = "Trucker";

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
    let arr: trucker[] = new Array();
    if(this.u.type!==Type.Viewer){
      let truckers = await this.ras.GetEntity("trucker");
      if(truckers===null)
        return [];
      truckers.forEach(function(item) {
        let tr = new trucker();
        tr.trucker_id = item['trucker_id'];
        tr.rate = item['rate'];
        tr.company = item['company'];
        tr.warehouse_id = item['warehouse_id'];
        arr.push(tr);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.trucker_id === id);
    }
    return null;
  }

  public async AddEntry(trucker: trucker) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("trucker", trucker);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("trucker", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("trucker", id);
      return result;
    }
    return false;
  }
}

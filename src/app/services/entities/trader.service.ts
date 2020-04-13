import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { trader } from '../../models/entities/trader';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class TraderService {

  public static Name:string = "Trader";

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
    let arr: trader[] = new Array();
    if(this.u.type!==Type.Viewer){
      let traders = await this.ras.GetEntity("trader");
      traders.forEach(function(item) {
        let t = new trader();
        t.trader_id = item['trader_id'];
        t.trader_name = item['trader_name'];
        arr.push(t);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.trader_id === id);
    }
    return null;
  }

  public async AddEntry(trader: trader) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("trader", trader);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("trader", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("trader", id);
      return result;
    }
    return false;
  }
}

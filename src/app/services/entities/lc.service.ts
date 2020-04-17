import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { Type } from '../../models/type';
import { lc } from '../../models/entities/lc';

@Injectable({
  providedIn: 'root'
})
export class LCService {

  public static Name:string = "Letter of Credit";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["Link"];
  }

  public async GetEntries() {
    let arr: lc[] = new Array();
    if(this.u.type!==Type.Viewer){
      let lcs = await this.ras.GetEntity("lc");
      if(lcs===null)
        return [];
      lcs.forEach(function(item) {
        try {
          let l = new lc();
          l.lc_id = item['lc_id'];
          l.lc_number = item['lc_number'];
          l.product = item['product'];
          l.lc_location = item['lc_location'];
          l.unit_measurement_id = item['unit_measurement_id'];
          l.quantity = item['quantity'];
          l.lc_price = item['lc_price'];
          l.fee = item['fee'];
          l.lc_date = item['lc_date'];
          l.customer = item['customer'];
          l.cutoff = item['cutoff'];
          l.eta = item['eta'];
          l.ets = item['ets'];
          arr.push(l);
        } catch {}
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.lc_id === id);
    }
    return null;
  }

  public async AddEntry(lc: lc) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("lc", lc);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("lc", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("lc", id);
      return result;
    }
    return false;
  }
}

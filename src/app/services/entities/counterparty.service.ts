import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { counterparty } from '../../models/entities/counterparty';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class CounterpartyService {

  public static Name:string = "Counterparty";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["traders"];
  }

  public async GetEntries() {
    let arr: counterparty[] = new Array();
    if(this.u.type!==Type.Viewer){
      let counterparties = await this.ras.GetEntity("counterparty");
      if(counterparties===null)
        return [];
      counterparties.forEach(function(item) {
        let cp = new counterparty();
        cp.counterparty_id = item['counterparty_id'];
        cp.counterparty_type_id = item['counterparty_type_id'];
        cp.counterparty_name = item['counterparty_name'];
        arr.push(cp);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.counterparty_id === id);
    }
    return null;
  }

  public async AddEntry(counterparty: counterparty) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("counterparty", counterparty);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("counterparty", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("counterparty", id);
      return result;
    }
    return false;
  }
}

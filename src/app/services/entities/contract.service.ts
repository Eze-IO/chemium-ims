import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { Type } from '../../models/type';
import { contract } from '../../models/entities/contract';
import { ExtensionService } from '../../helpers/extension.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public static Name:string = "Contract";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["contract_status"];
  }

  public async GetEntries() {
    let arr: contract[] = new Array();
    if(this.u.type!==Type.Viewer){
      let contracts = await this.ras.GetEntity("contract");
      if(contracts===null)
        return [];
      contracts.forEach(function(item) {
        try{
          let c = new contract();
          c.contract_id = item['contract_id'];
          if(!ExtensionService.IsEmptyOrNull(item['contract_type_id']))
            c.contract_type_id = item['contract_type_id'];
          else
            c.contract_type_id = 0;
          c.contract_date = item['contract_date'];
          c.contract_status_id = item['contract_status_id'];
          c.incoterms_id = item['incoterms_id'];
          c.payment_terms_id = item['payment_terms_id'];
          c.link_id = item['link_id'];
          c.counterparty_id = item['counterparty_id'];
          c.agent_id = item['agent_id'];
          c.bl_id = item['bl_id'];
          arr.push(c);
        } catch {}
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.contract_id === id);
    }
    return null;
  }

  public async AddEntry(contract: contract) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("contract", contract);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("contract", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("contract", id);
      return result;
    }
    return false;
  }
}

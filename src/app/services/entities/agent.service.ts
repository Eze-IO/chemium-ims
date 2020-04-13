import { Injectable } from '@angular/core';
import { RestAPIService } from '../rest-api.service';
import { agent } from '../../models/entities/agent';
import { CurrentUserService } from '../current-user.service';
import { Type } from '../../models/type';
import { user } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  public static Name:string = "Agent";

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
    let arr: agent[] = new Array();
    if(this.u.type!==Type.Viewer){
      let agents = await this.ras.GetEntity("agent");
      agents.forEach(function(item) {
        let a = new agent();
        a.agent_id = item['agent_id'];
        a.agent_country = item['agent_country'];
        a.agent_commission = item['agent_commission'];
        arr.push(a);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.agent_id === id);
    }
    return null;
  }

  public async AddEntry(agent: agent) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("agent", agent);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("agent", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("agent", id);
      return result;
    }
    return false;
  }
}

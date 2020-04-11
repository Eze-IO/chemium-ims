import { Injectable } from '@angular/core';
import { RestAPIService } from '../rest-api.service';
import { agent } from '../../models/entities/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  public static Name:string = "Agent";

  constructor(private ras: RestAPIService) { }

  public async GetEntries() {
    let arr: agent[] = new Array();
    let agents = await this.ras.GetEntity("warehouse");
    agents.forEach(function(item) {
      let a = new agent();
      a.agent_id = item['agent_id'];
      a.agent_count = item['agnet_desc'];
      a.agent_commission = item['unit_measurement_id'];
      arr.push(a);
    });
    return arr;
  }

  public async GetEntry(id: number) {
    let all = await this.GetEntries();
    return all.find(x => x.agent_id === id);
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    let result = await this.ras.UpdateEntity("agent", id, columnName, value);
    return result;
  }

  public async DeleteEntry(id:number) {
    let result = this.ras.ModifyEntity("agent", id);
    return result;
  }
}

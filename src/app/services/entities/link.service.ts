import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { link } from '../../models/entities/link';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  public static Name:string = "Link";

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
    let arr: link[] = new Array();
    if(this.u.type!==Type.Viewer){
      let links = await this.ras.GetEntity("link");
      if(links===null)
        return [];
      links.forEach(function(item) {
        try {
          let li = new link();
          li.link_id = item['link_id'];
          li.purchase = item['purchase'];
          li.sale = item['sale'];
          li.pnl = item['pnl'];
          li.gross = item['gross'];
          li.fees = item['fees'];
          li.lc_id = item['lc_id'];
          arr.push(li);
        } catch {}
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.link_id === id);
    }
    return null;
  }

  public async AddEntry(link: link) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("link", link);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("link", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("link", id);
      return result;
    }
    return false;
  }
}

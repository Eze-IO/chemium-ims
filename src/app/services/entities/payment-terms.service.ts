import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { payment_terms } from '../../models/entities/payment_terms';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermsService {

  public static Name:string = "Payment Terms";

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
    let arr: payment_terms[] = new Array();
    if(this.u.type!==Type.Viewer){
      let pts = await this.ras.GetEntity("payment_terms");
      if(payment_terms===null)
        return [];
      pts.forEach(function(item) {
        try {
          let pt = new payment_terms();
          pt.payment_terms_id = item['payment_terms_id'];
          pt.shipment_date = item['shipment_date'];
          pt.payments_terms_type = item['payment_terms_type'];
          arr.push(pt);
        } catch {}
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.payment_terms_id === id);
    }
    return null;
  }

  public async AddEntry(payment_terms: payment_terms) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("payment_terms", payment_terms);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("payment_terms", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("payment_terms", id);
      return result;
    }
    return false;
  }
}

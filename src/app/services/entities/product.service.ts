import { Injectable } from '@angular/core';
import { user } from '../../models/user';
import { RestAPIService } from '../rest-api.service';
import { CurrentUserService } from '../current-user.service';
import { product } from '../../models/entities/product';
import { Type } from '../../models/type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public static Name:string = "Product";

  private u:user = new user();
  constructor(private ras: RestAPIService,
  private cu: CurrentUserService) {
    this.getUser();
  }

  private async getUser() {
    this.u = await this.cu.GetInfo();
  }

  public CorrespondingRecords(): String[] {
    return ["Inventory Schedule"];
  }

  public async GetEntries() {
    let arr: product[] = new Array();
    if(this.u.type!==Type.Viewer){
      let products = await this.ras.GetEntity("product");
      products.forEach(function(item) {
        let p = new product();
        p.product_id = item['product_id'];
        p.grade = item['grade'];
        p.rc_number = item['rc_number'];
        arr.push(p);
      });
    }
    return arr;
  }

  public async GetEntry(id: number) {
    if(this.u.type!==Type.Viewer){
      let all = await this.GetEntries();
      return all.find(x => x.product_id === id);
    }
    return null;
  }

  public async AddEntry(product: product) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.AddToEntity("product", product);
      return result;
    }
    return false;
  }

  public async UpdateEntry(id: number, columnName: string, value: string) {
    if(this.u.type!==Type.Viewer){
      let result = await this.ras.UpdateEntity("product", id, columnName, value);
      return result;
    }
    return false;
  }

  public async DeleteEntry(id:number) {
    if(this.u.type!==Type.Viewer){
      let result = this.ras.ModifyEntity("product", id);
      return result;
    }
    return false;
  }
}

import { Decimal } from 'decimal.js';
export class lc {
  lc_id:number;
  lc_number:string;
  product:string;
  unit_measurement_id:number;
  quantity:Decimal;
  lc_price:Decimal;
  fee:Decimal;
  lc_date:Date;
  customer:string;
  cutoff:Date;
  eta:Date;
  ets:Date;
  lc_location:string;
}

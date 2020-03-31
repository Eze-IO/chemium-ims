import { Decimal } from 'decimal.js';
export class inventory {
  inventory_id:number;
  product_id:number;
  warehouse_id:number;
  quantity:Decimal;
  received_date:Date;
  release_date:Date;
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as entityService from '../../services/entities/index';
import * as entity from '../../models/entities/index';
import { ExtensionService } from '../../helpers/extension.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { navItems } from '../../_nav';
import { INavData } from '@coreui/angular';
import { cell } from '../../models/tables/cell';
import { row } from '../../models/tables/row';
import { timer } from 'rxjs';
import { user } from '../../models/user';
import { CurrentUserService } from '../../services/current-user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Type } from '../../models/type';
import { Decimal } from 'decimal.js';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('825ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('825ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ]),
  ]
})
export class RecordComponent implements OnInit {
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  RecordName:string;
  private Table: string;
  private _navItems: INavData[];
  private u: user = new user();
  tableMessage: string;
  successMsg:string;
  dangerMsg:string;

  loading:number = 2;

  constructor(private activatedRoute: ActivatedRoute,
  private as: entityService.AgentService,
  private bls: entityService.BLService,
  private bfs: entityService.BridgeFinanceService,
  private cs: entityService.ContractService,
  private cps: entityService.CounterpartyService,
  private iss: entityService.InventoryScheduleService,
  private is: entityService.InventoryService,
  private lcs: entityService.LCService,
  private ls: entityService.LinkService,
  private pts: entityService.PaymentTermsService,
  private ps: entityService.ProductService,
  private ts: entityService.TraderService,
  private trs: entityService.TruckerService,
  private ums: entityService.UnitMeasurementService,
  private ws: entityService.WarehouseService,
  private cu: CurrentUserService) {
    this.activatedRoute.paramMap.subscribe(params => {
          this.Table = params.get('table');
    });
  }

  get IsViewer(){
    return (this.u.type===Type.Viewer);
  }

  ngOnInit(): void {
    let _time = 750;
    this._navItems = [];
    navItems[2].children.forEach(x => {
      setTimeout(() => {
         this._navItems.push(x);
       }, _time);
      _time+=(Math.floor(Math.random() * 5000) + 2500);
    })
    this.tableMessage = "Click any cell to edit and press enter to save modifications!";
    timer(50).subscribe(async() => {
      this.u = await this.cu.GetInfo();
      timer(3000).subscribe(async() => {
        this.selectView();
      })
    })
  }

  async selectView(){
    let rows:row[] = [];
    if (!ExtensionService.IsEmptyOrNull(this.Table)) {
      this.Table = this.Table.toLowerCase();
      switch (this.Table) {
        case 'agent':
          this.RecordName = entityService.AgentService.Name;
          rows = [];
          this.as.GetEntries().then(x => {
            x.forEach(a => {
              let r = new row();
              r.id = a.agent_id;
              let c = new cell();
              r.data = [];
              c.columnName = "agent_commission";
              c.data = a.agent_commission.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "agent_country";
              c.data = a.agent_country;
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'bl':
          this.RecordName = entityService.BLService.Name;
          rows = [];
          this.bls.GetEntries().then(x => {
            x.forEach(bl => {
              let r = new row();
              r.id = bl.bl_id;
              let c = new cell();
              r.data = [];
              c.columnName = "bl_status_id";
              c.data = bl.bl_status_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "port_of_loading";
              c.data = bl.port_of_loading.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "port_of_discharge";
              c.data = bl.port_of_discharge.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "vessel";
              c.data = bl.vessel.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "bl_date";
              c.data = this.formatDate(bl.bl_date);
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'bridge-finance':
          this.RecordName = entityService.BridgeFinanceService.Name;
          rows = [];
          this.bfs.GetEntries().then(x => {
            x.forEach(bf => {
              let r = new row();
              r.id = (bf.cost+bf.inventory_id);
              let c = new cell();
              r.data = [];
              c.columnName = "inventory_id";
              c.data = bf.inventory_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "cost";
              c.data = bf.cost.toString();
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'contract':
          this.RecordName = entityService.ContractService.Name;
          rows = [];
          this.cs.GetEntries().then(x => {
            x.forEach(cc => {
              let r = new row();
              r.id = cc.contract_id;
              let c = new cell();
              r.data = [];
              c.columnName = "agent_id";
              c.data = cc.agent_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "contract_status_id";
              c.data = cc.contract_status_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "contract_type_id";
              c.data = cc.contract_type_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "contract_date";
              c.data = this.formatDate(cc.contract_date);
              r.data.push(c);
              c = new cell();
              c.columnName = "counterparty_id";
              c.data = cc.counterparty_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "incoterms_id";
              c.data = cc.incoterms_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "link_id";
              c.data = cc.link_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "bl_id";
              c.data = cc.bl_id.toString();
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'counterparty':
          this.RecordName = entityService.CounterpartyService.Name;
          rows = [];
          this.cps.GetEntries().then(x => {
            x.forEach(cp => {
              let r = new row();
              r.id = cp.counterparty_id;
              let c = new cell();
              r.data = [];
              c.columnName = "counterparty_name";
              c.data = cp.counterparty_name;
              r.data.push(c);
              c = new cell();
              c.columnName = "counterparty_type_id";
              c.data = cp.counterparty_type_id.toString();
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'inventory_schedule':
          this.RecordName = entityService.InventoryScheduleService.Name;
          rows = [];
          this.iss.GetEntries().then(x => {
            x.forEach(is => {
              let r = new row();
              r.id = is.inventory_schedule_id
              let c = new cell();
              r.data = [];
              c.columnName = "inventory_id";
              c.data = is.inventory_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "product_id";
              c.data = is.product_id.toString();
              r.data.push(c);
              rows.push(r);
            })
            console.log(rows);
            this.generateTable(rows);
          })
          break;
        case 'inventory':
          this.RecordName = entityService.InventoryService.Name;
          rows = [];
          this.is.GetEntries().then(x => {
            x.forEach(is => {
              let r = new row();
              r.id = is.inventory_id
              let c = new cell();
              r.data = [];
              c.columnName = "product_id";
              c.data = is.product_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "warehouse_id";
              c.data = is.warehouse_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "quantity";
              c.data = is.quantity.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "received_date";
              c.data = this.formatDate(is.received_date);
              r.data.push(c);
              c = new cell();
              c.columnName = "release_date";
              c.data = this.formatDate(is.release_date);
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'lc':
          this.RecordName = entityService.LCService.Name;
          rows = [];
          this.lcs.GetEntries().then(x => {
            x.forEach(lc => {
              let r = new row();
              r.id = lc.lc_id
              let c = new cell();
              r.data = [];
              c.columnName = "lc_location";
              c.data = lc.lc_location;
              r.data.push(c);
              c = new cell();
              c.columnName = "lc_number";
              c.data = lc.lc_number;
              r.data.push(c);
              c = new cell();
              c.columnName = "lc_price";
              c.data = lc.lc_price.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "lc_date";
              c.data = this.formatDate(lc.lc_date);
              r.data.push(c);
              c = new cell();
              c.columnName = "customer";
              c.data = lc.customer;
              r.data.push(c);
              c = new cell();
              c.columnName = "cutoff";
              c.data = this.formatDate(lc.cutoff);
              r.data.push(c);
              c = new cell();
              c.columnName = "eta";
              c.data = this.formatDate(lc.eta);
              r.data.push(c);
              c = new cell();
              c.columnName = "ets";
              c.data = this.formatDate(lc.ets);
              r.data.push(c);
              c = new cell();
              c.columnName = "fee";
              c.data = lc.fee.toString();
              r.data.push(c);
              rows.push(r);
            })
            console.log(rows);
            this.generateTable(rows);
          })
          break;
        case 'payment_terms':
          this.RecordName = entityService.PaymentTermsService.Name;
          rows = [];
          this.pts.GetEntries().then(x => {
            x.forEach(pt => {
              let r = new row();
              r.id = pt.payment_terms_id;
              let c = new cell();
              r.data = [];
              c.columnName = "payments_terms_type";
              c.data = pt.payments_terms_type;
              r.data.push(c);
              c = new cell();
              c.columnName = "shipment_date";
              c.data = this.formatDate(pt.shipment_date);
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'product':
          this.RecordName = entityService.ProductService.Name;
          rows = [];
          this.ps.GetEntries().then(x => {
            x.forEach(p => {
              let r = new row();
              r.id = p.product_id;
              let c = new cell();
              r.data = [];
              c.columnName = "rc_number";
              c.data = p.rc_number.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "grade";
              c.data = p.grade;
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'trader':
          this.RecordName = entityService.TraderService.Name;
          rows = [];
          this.ts.GetEntries().then(x => {
            x.forEach(t => {
              let r = new row();
              r.id = t.trader_id;
              let c = new cell();
              r.data = [];
              c.columnName = "trader_name";
              c.data = t.trader_name.toString();
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'trucker':
          this.RecordName = entityService.TruckerService.Name;
          rows = [];
          this.trs.GetEntries().then(x => {
            x.forEach(tr => {
              let r = new row();
              r.id = tr.trucker_id;
              let c = new cell();
              r.data = [];
              c.columnName = "warehouse_id";
              c.data = tr.warehouse_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "company";
              c.data = tr.company.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "rate";
              c.data = tr.rate.toString();
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'unit_measurement':
          this.RecordName = entityService.UnitMeasurementService.Name;
          rows = [];
          this.ums.GetEntries().then(x => {
            x.forEach(um => {
              let r = new row();
              r.id = um.unit_measurement_id;
              let c = new cell();
              r.data = [];
              c.columnName = "unit_measurement_desc";
              c.data = um.unit_measurement_desc.toString();
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        case 'warehouse':
          this.RecordName = entityService.WarehouseService.Name;
          rows = [];
          this.ws.GetEntries().then(x => {
            x.forEach(w => {
              let r = new row();
              r.id = w.warehouse_id;
              let c = new cell();
              r.data = [];
              c.columnName = "unit_measurement_id";
              c.data = w.unit_measurement_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "warehouse_rate";
              c.data = w.warehouse_rate.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "trader_id";
              c.data = w.trader_id.toString();
              r.data.push(c);
              c = new cell();
              c.columnName = "location_desc";
              c.data = w.location_desc.toString();
              r.data.push(c);
              rows.push(r);
            })
            this.generateTable(rows);
          })
          break;
        default:
          this.showDefaultPage();
          break;
      }
    } else {
      this.showDefaultPage();
    }
  }

  formatName(str: string){
    if(!ExtensionService.IsEmptyOrNull(str))
      return str.toUpperCase().replace(/_/g,' ');
    else
      return str;
  }

  formatDate(date: Date):string {
    date = new Date(date);
    return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()+" "+date.toLocaleTimeString('en-US'))
  }

  count:number[];
  currentID:number;
  currentColumn:string;
  currentRow: row;
  columns: string[];
  rows: row[];
  generateTable(rows: row[]){
    this.columns = [];
    let _fin = false;
    rows.forEach(x => {
      if(x!==undefined&&x!==null&&!_fin){
        x.data.forEach(i => {
          if(i!==undefined&&i!==null)
            this.columns.push(i.columnName);
        })
        _fin = true;
      }
    })
    console.log(this.columns);
    this.rows = rows;
    this.count = [];
    for(let i=0;i<rows.length;i++){
      this.count.push(++i);
    }
    this.loading = 1;
    this.NewRow = this.getNewRow();
  }

  onCellFocus(e, rowid :number, columnName: string) {
      this.currentID = rowid;
      this.currentColumn = columnName;
  }

  onCellInput(e, columnName){
    switch (this.Table) {
      case 'agent':
        this.as.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'bl':
        this.bls.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'bridge_finance':
        this.bfs.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'contract':
        this.cs.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'counterparty':
        this.cps.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'inventory_schedule':
        this.iss.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'inventory':
        this.is.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'lc':
        this.lcs.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'payment_terms':
        this.pts.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'product':
        this.ps.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'trader':
        this.ts.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'trucker':
        this.trs.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'unit_measurement':
        this.ums.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
        break;
      case 'warehouse':
        this.ws.UpdateEntry(this.currentID, columnName, e.target.value).then(x => {
          if(x){
          } else {
            this.dangerMsg = 'Failed to update entry';
            this.dangerModal.show();
          }
          this.selectView();
        });
          break;
      default:
        this.showDefaultPage();
        break;
    }
  }


  onCellTextChange(e) {
  }

  onCellFocusOut(e){
  }

  deleteRow(d){
    switch (this.Table) {
      case 'agent':
        this.as.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this table isn't being used in the ";
            this.as.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'bl':
        this.bls.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.bls.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'bridge_finance':
        this.bfs.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.bfs.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'contract':
        this.cs.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.cs.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'counterparty':
        this.cps.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.cps.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'inventory_schedule':
        this.iss.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that you have the proper permissions";
            this.dangerModal.show();
          }
        })
        break;
      case 'inventory':
        this.is.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.is.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'lc':
        this.lcs.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.lcs.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'payment_terms':
        this.pts.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.pts.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'product':
        this.ps.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.ps.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'trader':
        this.ts.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that you have the proper permissions";
            this.dangerModal.show();
          }
        })
        break;
      case 'trucker':
        this.trs.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that you have the proper permissions";
            this.dangerModal.show();
          }
        })
        break;
      case 'unit_measurement':
        this.ums.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.ums.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      case 'warehouse':
        this.ws.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            this.dangerMsg = 'Failed to delete entry: ';
            this.dangerMsg+="\n Please check that this record isn't being used in the ";
            this.ws.CorrespondingRecords().forEach(el => {
              this.dangerMsg+=("''"+el.toUpperCase()+"'' - ");
            });
            this.dangerMsg+=" record(s)";
            this.dangerModal.show();
          }
        })
        break;
      default:
        this.showDefaultPage();
        break;
    }
  }

  NewRow:row = new row();
  getNewRow(): row {
    let ids = []
    let cells = 0;
    this.rows.forEach(x => {
      if(x!==undefined&&x!==null){
        cells = x.data.length;
      }
    })
    this.rows.forEach(x => ids.push(x.id));
    let lastID:number = Math.max.apply(Math, ids);
    let r = new row();
    r.id = (lastID+1);
    r.data = [];
    for(let c=0;c<cells;c++){
      let _c = new cell();
      let _fin = false;
      let da = [];
      this.rows.forEach(x => {
        if(x!==undefined&&x!==null&&!_fin){
          da = x.data;
          _fin = true;
        }
      })
      _c.columnName = (da[c].columnName);
      r.data.push(_c);
    }
    return r;
  }


 _newID:number = 0;
 toggleAddButton:boolean = false;

  addCellInput(e, columnName) {
  }

  focusedColumnName:string;
  addCellFocus(e, id, columnName) {
    this._newID = id;
    this.focusedColumnName = columnName;
  }

  addCellFocusOut(e) {
  }

  addCellTextChange(e, columnName) {
    console.log(e.target.value);
    if(this.NewRow===null)
      this.NewRow = this.getNewRow();
    let results:cell = null;
    try {
      this.NewRow.data.forEach(x => {
        if(x.columnName === columnName)
          x.data = e.target.value;
      });
    } catch { }
    console.log(this.NewRow);
  }

  saveChanges(){
    switch (this.Table) {
      case 'agent':
        if(this._newID!==0){
          let _agent = new entity.agent();
          _agent.agent_id = this.NewRow.id;
          let ac = this.NewRow.data.find(x => x.columnName === 'agent_commission').data;
          _agent.agent_commission = Number(ac);
          _agent.agent_country = this.NewRow.data.find(x => x.columnName === 'agent_country').data;
          this.as.AddEntry(_agent).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'bl':
        if(this._newID!==0){
          let _bl = new entity.bl();
          _bl.bl_id = this.NewRow.id;
          _bl.bl_status_id = Number(this.NewRow.data.find(x => x.columnName === 'bl_status_id').data);
          _bl.bl_date = new Date(this.NewRow.data.find(x => x.columnName === 'bl_date').data);
          _bl.port_of_discharge = this.NewRow.data.find(x => x.columnName === 'port_of_discharge').data;
          _bl.port_of_loading = this.NewRow.data.find(x => x.columnName === 'port_of_loading').data;
          _bl.vessel = this.NewRow.data.find(x => x.columnName === 'vessel').data;
          this.bls.AddEntry(_bl).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'bridge_finance':
        if(this._newID!==0){
          let _bridge_finance = new entity.bridge_finance();
          _bridge_finance.inventory_id = Number(this.NewRow.data.find(x => x.columnName === 'inventory_id').data);
          _bridge_finance.cost = Number(this.NewRow.data.find(x => x.columnName === 'cost').data);
          this.bfs.AddEntry(_bridge_finance).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'contract':
        if(this._newID!==0){
          let _contract = new entity.contract();
          _contract.contract_id = this.NewRow.id;
          _contract.contract_status_id = Number(this.NewRow.data.find(x => x.columnName === 'contract_status_id').data);
          _contract.contract_type_id = Number(this.NewRow.data.find(x => x.columnName === 'contract_type_id').data);
          _contract.counterparty_id = Number(this.NewRow.data.find(x => x.columnName === 'counterparty_id').data);
          _contract.agent_id = Number(this.NewRow.data.find(x => x.columnName === 'agent_id').data);
          _contract.bl_id = Number(this.NewRow.data.find(x => x.columnName === 'bl_id').data);
          _contract.incoterms_id = Number(this.NewRow.data.find(x => x.columnName === 'incoterms_id').data);
          _contract.link_id = Number(this.NewRow.data.find(x => x.columnName === 'link_id').data);
          _contract.payment_terms_id = Number(this.NewRow.data.find(x => x.columnName === 'payment_terms_id').data);
          _contract.contract_date = new Date(this.NewRow.data.find(x => x.columnName === 'contract_date').data);
          this.cs.AddEntry(_contract).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'counterparty':
        if(this._newID!==0){
          let _counterparty = new entity.counterparty();
          _counterparty.counterparty_id = this.NewRow.id;
          _counterparty.counterparty_type_id = Number(this.NewRow.data.find(x => x.columnName === 'counterparty_type_id').data);
          _counterparty.counterparty_name = this.NewRow.data.find(x => x.columnName === 'counterparty_name').data;
          this.cps.AddEntry(_counterparty).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'inventory_schedule':
        if(this._newID!==0){
          let _inventory_schedule = new entity.inventory_schedule();
          _inventory_schedule.inventory_schedule_id = this.NewRow.id;
          _inventory_schedule.inventory_id = Number(this.NewRow.data.find(x => x.columnName === 'inventory_id').data);
          _inventory_schedule.product_id = Number(this.NewRow.data.find(x => x.columnName === 'product_id').data);
          this.iss.AddEntry(_inventory_schedule).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'inventory':
        if(this._newID!==0){
          let _inventory = new entity.inventory();
          _inventory.inventory_id = this.NewRow.id;
          _inventory.product_id = Number(this.NewRow.data.find(x => x.columnName === 'product_id').data);
          _inventory.warehouse_id = Number(this.NewRow.data.find(x => x.columnName === 'warehouse_id').data);
          _inventory.quantity = Number(this.NewRow.data.find(x => x.columnName === 'quantity').data);
          _inventory.received_date = new Date(this.NewRow.data.find(x => x.columnName === 'received_date').data);
          _inventory.release_date = new Date(this.NewRow.data.find(x => x.columnName === 'release_date').data);
          this.is.AddEntry(_inventory).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'lc':
        if(this._newID!==0){
          let _lc = new entity.lc();
          _lc.lc_id = this.NewRow.id;
          _lc.lc_number = this.NewRow.data.find(x => x.columnName === 'lc_number').data;
          _lc.lc_location = this.NewRow.data.find(x => x.columnName === 'lc_location').data;
          _lc.lc_date = new Date(this.NewRow.data.find(x => x.columnName === 'lc_date').data);
          _lc.lc_price = Number(this.NewRow.data.find(x => x.columnName === 'lc_price').data);
          _lc.customer = this.NewRow.data.find(x => x.columnName === 'customer').data;
          _lc.product = this.NewRow.data.find(x => x.columnName === 'product').data;
          _lc.quantity = Number(this.NewRow.data.find(x => x.columnName === 'quantity').data);
          _lc.cutoff = new Date(this.NewRow.data.find(x => x.columnName === 'cutoff').data);
          _lc.eta = new Date(this.NewRow.data.find(x => x.columnName === 'eta').data);
          _lc.ets = new Date(this.NewRow.data.find(x => x.columnName === 'ets').data);
          _lc.fee = Number(this.NewRow.data.find(x => x.columnName === 'fee').data);
          _lc.unit_measurement_id = Number(this.NewRow.data.find(x => x.columnName === 'unit_measurement_id').data);
          this.lcs.AddEntry(_lc).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'payment_terms':
        if(this._newID!==0){
          let _payment_terms = new entity.payment_terms();
          _payment_terms.payment_terms_id = this.NewRow.id;
          _payment_terms.payments_terms_type = this.NewRow.data.find(x => x.columnName === 'payments_terms_type').data;
          _payment_terms.shipment_date = new Date(this.NewRow.data.find(x => x.columnName === 'shipment_date').data);
          this.pts.AddEntry(_payment_terms).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'product':
        if(this._newID!==0){
          let _product = new entity.product();
          _product.product_id = this.NewRow.id;
          _product.grade = this.NewRow.data.find(x => x.columnName === 'grade').data;
          _product.rc_number = Number(this.NewRow.data.find(x => x.columnName === 'rc_number').data);
          this.ps.AddEntry(_product).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'trader':
        if(this._newID!==0){
          let _trader = new entity.trader();
          _trader.trader_id = this.NewRow.id;
          _trader.trader_name = this.NewRow.data.find(x => x.columnName === 'trader_name').data;
          this.ts.AddEntry(_trader).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'trucker':
        if(this._newID!==0){
          let _trucker = new entity.trucker();
          _trucker.trucker_id = this.NewRow.id;
          _trucker.warehouse_id = Number(this.NewRow.data.find(x => x.columnName === 'warehouse_id').data);
          _trucker.company = this.NewRow.data.find(x => x.columnName === 'company').data;
          _trucker.rate = Number(this.NewRow.data.find(x => x.columnName === 'rate').data);
          this.trs.AddEntry(_trucker).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'unit_measurement':
        if(this._newID!==0){
          let _unit_measurement = new entity.unit_measurement();
          _unit_measurement.unit_measurement_id = this.NewRow.id;
          _unit_measurement.unit_measurement_desc = this.NewRow.data.find(x => x.columnName === 'unit_measurement_desc').data;
          this.ums.AddEntry(_unit_measurement).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      case 'warehouse':
        if(this._newID!==0){
          let _warehouse = new entity.warehouse();
          _warehouse.warehouse_id = this.NewRow.id;
          _warehouse.warehouse_rate = Number(this.NewRow.data.find(x => x.columnName === 'warehouse_rate').data);
          this.ws.AddEntry(_warehouse).then(x => {
            if(x){
              this.successMsg='Successfully added entry!';
              this.successModal.show();
            } else {
              this.dangerMsg="Failed to add entry";
              this.dangerModal.show();
            }
            this.selectView();
          });
        }
        break;
      default:
        this.showDefaultPage();
        break;
    }
  }

  showDefaultPage() {
    this.loading = 0;
  }

  onDropdownChange(e){
    console.log(e);
  }

  onDropdownSubmit(e){
    console.log(e);
  }

}

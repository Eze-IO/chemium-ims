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
            console.log(rows);
            this.generateTable(rows);
          })
          break;
        case 'bridge-finance':
          break;
        case 'contract':
          break;
        case 'counterparty':
          break;
        case 'inventory-schedule':
          break;
        case 'inventory':
          break;
        case 'lc':
          break;
        case 'measurement':
          break;
        case 'payment-terms':
          break;
        case 'product':
          break;
        case 'trader':
          break;
        case 'trucker':
          break;
        case 'unit_measurement':
          break;
        case 'warehouse':
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
      case 'bridge-finance':
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
      case 'inventory-schedule':
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
        break;
      case 'measurement':
        break;
      case 'payment-terms':
        break;
      case 'product':
        break;
      case 'trader':
        break;
      case 'trucker':
        break;
      case 'unit_measurement':
        break;
      case 'warehouse':
          break;
      default:
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
      case 'bridge-finance':
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
      case 'inventory-schedule':
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
      case 'payment-terms':
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
      let da = this.rows.shift().data;
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
          _agent.agent_commission = ac;
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
          let ac = this.NewRow.data.find(x => x.columnName === 'agent_commission').data;
          _agent.agent_commission = ac;
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
      case 'bridge-finance':
        break;
      case 'contract':
        break;
      case 'counterparty':
        break;
      case 'inventory-schedule':
        break;
      case 'inventory':
        break;
      case 'lc':
        break;
      case 'measurement':
        break;
      case 'payment-terms':
        break;
      case 'product':
        break;
      case 'trader':
        break;
      case 'trucker':
        break;
      case 'unit_measurement':
        break;
      case 'warehouse':
        break;
      default:
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

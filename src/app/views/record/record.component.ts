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
  @ViewChild('infoModal') public infoModal: ModalDirective;
  RecordName:string;
  private Table: string;
  private _navItems: INavData[];
  private u: user = new user();
  tableMessage: string;

  loading:number = 2;

  constructor(private activatedRoute: ActivatedRoute,
  private as: entityService.AgentService,
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
    this.tableMessage = "Click any cell of data to edit it and press enter save any modifications!";
    timer(50).subscribe(async() => {
      this.u = await this.cu.GetInfo();
      timer(3000).subscribe(async() => {
        this.selectView();
      })
    })
  }

  async selectView(){
    if (!ExtensionService.IsEmptyOrNull(this.Table)) {
      this.Table = this.Table.toLowerCase();
      switch (this.Table) {
        case 'agent':
          this.RecordName = entityService.AgentService.Name;
          let rows:row[] = [];
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
        default:
          this.showDefaultPage();
          break;
      }
    } else {
      this.showDefaultPage();
    }
  }

  count:number[];
  currentID:number;
  currentColumn:string;
  currentRow: row;
  columns: string[];
  rows: row[];
  generateTable(rows: row[]){
    this.columns = [];
    rows[0].data.forEach(x => {
      this.columns.push(x.columnName);
    })
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
            alert('Failed to update entry');
          }
          this.selectView();
        });
        break;
      default:
        break;
    }
  }

  private _agent:entity.agent = new entity.agent();
  onCellTextChange(e) {
    //e.target.value
  }

  onCellFocusOut(e){
    /*if(this._newID!==0||this._newID===undefined){
      this.rows = this.rows.filter(function(item) {
          return item.id !== this._newID
      })
      this._newID=0;
      this.toggleAddButton = true;
    }*/
  }

  deleteRow(d){
    switch (this.Table) {
      case 'agent':
        this.as.DeleteEntry(d.id).then(x => {
          if(x){
            this.selectView();
          } else {
            alert('Failed to delete entry');
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
    let cells = this.rows.shift().data.length;
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
          console.log(this.NewRow);
          let ac = this.NewRow.data.find(x => x.columnName === 'agent_commission').data;
          _agent.agent_commission = ac;
          _agent.agent_country = this.NewRow.data.find(x => x.columnName === 'agent_country').data;
          this.as.AddEntry(_agent).then(x => {
            if(x){
              alert('Successfully updated');
            } else {
              alert('Failed to update entry');
            }
            this.selectView();
          });
        }
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

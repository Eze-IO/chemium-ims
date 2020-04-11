import { Component, OnInit } from '@angular/core';
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

  RecordName:string;
  private Table: string;
  private _navItems: INavData[];

  loading:number = 2;

  constructor(private activatedRoute: ActivatedRoute,
  private as: entityService.AgentService) {
    this.activatedRoute.paramMap.subscribe(params => {
          this.Table = params.get('table');
    });
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
    this.selectView();
  }

  selectView(){
    if (!ExtensionService.IsEmptyOrNull(this.Table)) {
      this.Table = this.Table.toLowerCase();
      switch (this.Table) {
        case 'agent':
          let rows:row[] = [];
          this.as.GetEntries().then(x => {
            x.forEach(a => {
              console.log(a);
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
              console.log(r)
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

  currentID:number;
  currentColumn:string;
  currentRow: row;
  columns: string[];
  rows: row[];
  generateTable(rows: row[]){
    this.columns = [];
    console.log(rows[0].data);
    rows[0].data.forEach(x => {
      this.columns.push(x.columnName);
    })
    this.rows = rows;
    this.loading = 1;
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

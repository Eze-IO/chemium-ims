import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as entityService from '../../services/entities';
import * as entity from '../../models/entities';
import { ExtensionService } from '../../helpers/extension.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { navItems } from '../../_nav';
import { INavData } from '@coreui/angular';
import { row } from '../../models/row';
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
  private test: entity.warehouse[];
  private Table: string;
  private _navItems: INavData[];

  loading:number = 2;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
          this.Table = params.get('table');
    });
  }

  ngOnInit(): void {
    let _time = 2075;
    this._navItems = [];
    navItems[2].children.forEach(x => {
      setTimeout(() => {
         this._navItems.push(x);
       }, _time);
      _time+=1750;
    })

    if (!ExtensionService.IsEmptyOrNull(this.Table)) {
      this.Table = this.Table.toLowerCase();
      switch (this.Table) {
        case 'agent':
          let entity = entityService.AgentService;
          //entity
          this.RecordName = entity.Name;
          this.generateTable([])
          break;
        default:
          this.showDefaultPage();
          break;
      }
    } else {
      this.showDefaultPage();
    }
  }

  columns: string[];
  _row: row;
  generateTable(columns: string[]){
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

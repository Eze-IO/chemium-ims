import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from '../../services/entities/warehouse.service';
import * as entity from '../../models/entities';
import { ExtensionService } from '../../helpers/extension.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  RecordName:string;
  private test: entity.warehouse[];
  private Table: string;
  private Link: string;

  constructor(private activatedRoute: ActivatedRoute,
    private ws: WarehouseService) {
    this.activatedRoute.paramMap.subscribe(params => {
          this.Table = params.get('table');
          this.Link = params.get('link');
    });
  }

  ngOnInit(): void {
    this.test = this.ws.GetEntries();
    if (!ExtensionService.IsEmptyOrNull(this.Table)) {
      this.Table = this.Table.toLowerCase();
      switch (this.Table) {
        case 'agent':
          this.RecordName = "Agent";
          break;
        default:
          this.RecordName = "?";
          break;
      }
    }
    if (!ExtensionService.IsEmptyOrNull(this.Link)) {
      this.Link = this.Link.toLowerCase();
      switch (this.Link) {
        case 'warehouse':
          this.RecordName = WarehouseService.Name;
          break;
        default:
          this.RecordName = "?";
          break;
      }
    }
  }

}

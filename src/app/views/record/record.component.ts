import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from '../../services/warehouse.service';
import { warehouse } from '../../models/entities/warehouse';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  private RecordName:string;
  private test:warehouse[];

  constructor(private activatedRoute: ActivatedRoute,
    private ws: WarehouseService) {
    this.activatedRoute.queryParams.subscribe(params => {
          let table = params['table'];
          let type = params['type'];
          console.log(table); // Print the parameter to the console.
      });
  }

  ngOnInit(): void {
    this.test = this.ws.GetEntries();
    this.RecordName = WarehouseService.Name;
  }

}

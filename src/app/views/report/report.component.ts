import { Component, OnInit } from '@angular/core';
import { RestAPIService } from '../../services/rest-api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private ras: RestAPIService) { }

  ngOnInit(): void {
    this.ras.GetReport("showrevenue", []).then(x => {
      console.log(x);
    })
  }

}

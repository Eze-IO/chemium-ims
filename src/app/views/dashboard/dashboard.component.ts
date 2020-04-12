import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ExtensionService } from '../../helpers/extension.service';
import { timer } from 'rxjs';
//import { ClockComponent } from '../clock/clock.component';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showNews:boolean = false;
  radioModel: string = 'Month';

  public RefreshPage(event) {
    location.reload();
  }

  ngOnInit(): void {
    timer(1750, 25000).subscribe((val) => {
      if(ExtensionService.IsConnected()){
        this.showNews = true;
      } else {
        this.showNews = false;
      }
    });
  }
}

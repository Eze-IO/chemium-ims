import { Component } from '@angular/core';
import { RestAPIService } from '../../services/rest-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(private ras: RestAPIService){ }

  showResults(){
    this.ras.getEntity("warehouse").subscribe(w => {
      console.log(w);
    });
  }
}

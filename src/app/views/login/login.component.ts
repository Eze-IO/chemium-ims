import { Component } from '@angular/core';
import { RestAPIService } from '../../services/rest-api.service';
import { response } from '../../models/response';

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

import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../services/administrator.service';
import { RestAPIService } from "../../services/rest-api.service";
import { user } from "../../models/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private admin:AdministratorService, private ras: RestAPIService) { }

  ngOnInit(): void {
    console.log(this.admin.GetUsers());
    let list: user[] = [];
    this.ras.ListUsers().then(users => {
      console.log(users);
      /*users.array.forEach(element => {
        let u: user = new user();
        u.name = element['name'];
        u.email = element['email'];
        u.phone_number = element['phone_number'];
        u.picture = element['picture'];
        switch (element['type'].toString().toLowerCase()) {
        case 'administrator':
        case '4':
          u.type = 4;
          break;
        case 'editor':
        case '2':
          u.type = 2;
          break;
        default:
          u.type = 0;
          break;
        }
        console.log(u);
        list.push(u);
      });*/
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RestAPIService } from '../../services/rest-api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { timer } from 'rxjs';

import { user } from '../../models/user'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private ras: RestAPIService,
  private auth: AuthenticationService,
  private route: ActivatedRoute,
  private router: Router) {}

  ngOnInit(): void {
    timer(3000).subscribe((val) => {
      this.auth.Deauthorize();
      this.router.navigate(["/"], { relativeTo: this.route });
    });
  }

}

import { Component, OnInit, Injectable } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RestAPIService } from '../../services/rest-api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { timer } from 'rxjs';
import { user } from '../../models/user';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private auth: AuthenticationService) {}

  ngOnInit(): void {
    timer(3000).subscribe((val) => {
      localStorage.setItem('last_page', this.router.url);
      this.auth.Deauthorize();
      this.router.navigate(["/"], { relativeTo: this.route });
    });
  }

}

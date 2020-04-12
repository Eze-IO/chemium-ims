import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AdministratorService } from './services/administrator.service';
import { ExtensionService } from './helpers/extension.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdministratorService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authenticationService.IsAuthorized;
    if(token) {
      // logged in so return true
      return true;
    }

    if(!ExtensionService.IsConnected()){
      this.router.navigate(['/403'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

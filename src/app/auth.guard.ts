import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AdministratorService } from './services/administrator.service';

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
    if (token) {
      // logged in so return true
      return true;
    }

    let resolvedURL = state.url;
    console.log(state.url);
    if(resolvedURL.toLocaleLowerCase()==='/users'){
      if(this.admin.IsAdministrator){
        return true;
      } else {
        this.router.navigate(['/403']); // not logged in as admin so redirect to 403 page with the return url
        //return false;
      }
    }

    console.log(this.route.snapshot['_routerState'].url);

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

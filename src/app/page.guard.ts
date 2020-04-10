import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AdministratorService } from './services/administrator.service';

@Injectable({ providedIn: 'root' })
export class PageGuard implements CanActivate {
  constructor(
    private router: Router,
    private admin: AdministratorService,
    private auth: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let resolvedURL = route.pathFromRoot.map(v => v.url.map(segment => segment.toString()).join('/')).join('/');
    const token = this.auth.IsAuthorized;

      console.log(route.pathFromRoot);
    console.log(resolvedURL);
    if(resolvedURL.toLocaleLowerCase()==='/users'){
      if(this.admin.IsAdministrator){
        return true;
      } else {
        this.router.navigate(['/403']); // not logged in as admin so redirect to 403 page with the return url
        return false;
      }
    }

    return true;
  }
}

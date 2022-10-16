import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class SecurityGuardService implements CanActivate {

  constructor(public securityService: SecurityService, public router: Router) {}

  canActivate(route:ActivatedRouteSnapshot): Promise<boolean> {
    if (this.securityService.isAuthenticated()) {
      if (route.data["role"]) {
        let token : string = this.securityService.tokenStorageService.getToken() || ""
        return this.securityService.auth.hasPermission(token, route.data["role"]).toPromise()
      }
      return Promise.resolve(true)
    }
    this.router.navigate(['login'])
    return Promise.resolve(false)
  }
}

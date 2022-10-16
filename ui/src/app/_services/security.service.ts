import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenStorageService} from "./token-storage.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(public jwtHelper: JwtHelperService, public tokenStorageService : TokenStorageService, public auth : AuthService) {}

  public isAuthenticated(): boolean {
    const token = this.tokenStorageService.getToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false
  }
}

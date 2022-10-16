import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API.concat('signin'), {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API.concat('signup'), {
      username,
      email,
      password
    }, httpOptions);
  }

  hasPermission(token: string, role: string): Observable<any> {
    return this.http.post(AUTH_API.concat('checkpermission/').concat(role), {
      token
    }, httpOptions)
  }

  getAllPermission(token: string): Observable<any> {
    return this.http.post(AUTH_API.concat('getpermissions'), {
      token
    }, httpOptions)
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
}

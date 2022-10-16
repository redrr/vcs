import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public http: HttpClient) {}

  public get(endpoint: string): Observable<Object> {
    return this.http.get(AUTH_API.concat(endpoint), httpOptions)
  }

  public post(endpoint: string, obj: any): Observable<Object> {
    return this.http.post(AUTH_API.concat(endpoint), obj, httpOptions)
  }

  public findAll(service: string): Observable<Object> {
    return this.http.get(AUTH_API.concat(service).concat("/findall"))
  }

  public findById(service: string, id: any): Observable<Object> {
    return this.http.get(AUTH_API.concat(service).concat("/find/").concat(id), httpOptions)
  }

  public save(service: string, model: any) {
    this.http.post(AUTH_API.concat(service).concat("/save"), model, httpOptions)
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => window.location.reload()
      )
  }

  public delete(service: string, model: any) {
    if (model) {
      this.http.get(AUTH_API.concat(service).concat("/delete/").concat(model._id), httpOptions)
        .subscribe(
          (data) => console.log(data),
          (error) => console.log(error),
          () => window.location.reload()
        )
    }
  }
}

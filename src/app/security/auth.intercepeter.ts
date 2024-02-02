import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthIntercepterService implements HttpInterceptor { 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenJwt = localStorage.getItem("tokenJwt");
    if(tokenJwt) {
      req = req.clone({
        setHeaders : {
          Authorization: "Bearer "+tokenJwt
        }
      });
    } 
    return next.handle(req);
  }
}
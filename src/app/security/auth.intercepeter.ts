import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthIntercepterService implements HttpInterceptor { 
  constructor(private authService: AuthService ){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenJwt = localStorage.getItem("tokenJwt");
    if(tokenJwt && this.authService.isUserLogged()) {
      req = req.clone({
        setHeaders : {
          Authorization: "Bearer "+tokenJwt
        }
      });
    } 
    return next.handle(req);
  }
}
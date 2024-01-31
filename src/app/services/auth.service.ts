import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/utils';
import { catchError, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILoggedUser, IUserCredentials } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  executeAuthentication(userCredentials: IUserCredentials) {
    return this.http.post(`${API_URL}/auth/authorize`, 
      {
        email: userCredentials.email,
        password: userCredentials.password
      }).pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem("tokenJwt", response.token);
          }
        }),
        catchError((errorResponse: HttpErrorResponse) =>  {          
          if(errorResponse.status === 403) {
            throw errorResponse.error;         
          }
          throw new Error(errorResponse.error);
        })
      );
  }

  registerUser(newUserInput: IUserCredentials) {
    return this.http.post(`${API_URL}/auth/register`, newUserInput)
      .pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem("tokenJwt", response.token);
          }
        }),
        catchError((errorResponse: HttpErrorResponse) => {          
          if(errorResponse.status === 400 || errorResponse.status === 409) {
            throw errorResponse.error;
          }
          throw errorResponse.error;         
        })
      );
  }

  isUserLogged(): Boolean {
    const token = localStorage.getItem("tokenJwt");
    return new JwtHelperService().isTokenExpired(token);
  }

  getCurrentUser() {
    const token = localStorage.getItem("tokenJwt");
    if(token) {
      let decodedToken = new JwtHelperService().decodeToken(token);
      return new LoggedUser(decodedToken.name, decodedToken.roles);      
    }
    return null;
  }
}

export class LoggedUser implements ILoggedUser {
  name: string;
  roles: string[];

  constructor(name: string, roles: string[]) {
    this.name = name;
    this.roles = roles;
  }
}





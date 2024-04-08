import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/utils';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  postContactMessage(formData: any) {
    return this.http.post(`${API_URL}/messages`, formData).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {      
        throw new Error(error.error)
      })
    )
  }
}

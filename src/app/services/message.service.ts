import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/utils';
import { catchError, map } from 'rxjs';
import { ContactMessage, contactMessagePage } from '../model/ContactMessagePage';

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

  getContactMessage(pageable: string) {
    return this.http.get<contactMessagePage>(`${API_URL}/messages${pageable}`).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.error)
      })
    )
  }

  getMessageById(messageId: number) {
    return this.http.get<ContactMessage>(`${API_URL}/messages/${messageId}`).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.error);
      })
    )
  } 
}

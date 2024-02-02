import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/utils';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  postVehicle(vehicle: any) {
    return this.http.post(`${API_URL}/vehicles`, vehicle).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 400) {
          throw error.error;
        }
        throw new Error(error.error);
      })
    )
  }

  postVehiclePhotos(multiPartPhotos: FormData, vehicleId: number) {
    return this.http.post(`${API_URL}/photos?vehicleId=${vehicleId}`, multiPartPhotos).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 400) {
          throw error.error;
        }
        throw new Error(error.error);
      }) 
    )
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/utils';
import { catchError, map } from 'rxjs';
import { VehicleData, VehiclePage } from '../model/vehiclePage';

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

  getVehicles(pageable: string) {
    return this.http.get<VehiclePage>(`${API_URL}/vehicles/all${pageable}`).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.error);        
      })
    )
  }

  getVehiclesByUser(userId: string) {
    return this.http.get<VehicleData[]>(`${API_URL}/vehicles?user_id=${userId}`).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.error);        
      })
    )
  }

  getVehicleById(id: string) {
    return this.http.get<VehicleData>(`${API_URL}/vehicles/${id}`).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.error);        
      })
    )
  }

  deleteVehicle(id: string) {
    return this.http.delete(`${API_URL}/vehicles?vehicle_id=${id}`).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.error);        
      })
    )
  }
}

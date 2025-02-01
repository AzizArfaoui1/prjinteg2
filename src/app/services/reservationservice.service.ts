import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationserviceService {

  private apiUrl = 'http://localhost:3031/api/reservations';

  constructor(private http: HttpClient) {}

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, reservationData);
  }
  
  getReservationsByProvider(providerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${providerId}`);
  }

  updateReservationStatus(reservationId: string, status: string): Observable<any> {
  console.log('Calling API with:', reservationId, status); // Debug
  return this.http.patch(`${this.apiUrl}/${reservationId}`, { status });
}

deleteReservation(reservationId: string): Observable<any> {
  console.log('API URL:', `${this.apiUrl}/${reservationId}`); // Debug
  return this.http.delete(`${this.apiUrl}/${reservationId}`);
}



}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationId: string | null = null;
  private apiUrl = 'http://localhost:3031/location'; // Backend API for location

  constructor(private http: HttpClient) {}

  setLocationId(id: string) {
    this.locationId = id;
  }

  getLocationId(): string | null {
    return this.locationId;
  }

  // Fetch location by ID
  getLocationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

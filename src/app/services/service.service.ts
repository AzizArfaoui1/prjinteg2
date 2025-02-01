import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http: HttpClient) {}

  
  
  // Method to add a new service
  addService(service: Service): Observable<Service> {
    console.log(service);
    return this.http.post<Service>(`http://localhost:3031/services/add`, service);
  }

  // Fetch services for a specific provider
  getServicesByProvider(providerId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3031/services/${providerId}`);
  }
// Update an existing service
updateService(service: Service): Observable<Service> {
  return this.http.put<Service>(`http://localhost:3031/services/${service._id}`, service);
}

// Delete a service
deleteService(serviceId: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:3031/services/${serviceId}`);
}

}
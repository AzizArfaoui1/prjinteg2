import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../models/provider.model';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderserviceService {

  private apiUrl = 'http://localhost:3031/providers';
  private providerInfo: Provider | null = null;

  constructor(private http: HttpClient) {}
//addProvider(): Sends a POST request with user data from the form to the backend’s /add endpoint.
  addProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(`${this.apiUrl}/add`, provider);
  }
  loginProvider(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password});
  }
  // getProvider(): Sends a GET request to retrieve all users from the backend.
  getProviders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  

  setProviderInfo(provider: any) {
    this.providerInfo = provider; // Store user data
  }

  getProviderInfo() {
    return this.providerInfo; // Retrieve user data
  }
 // Get provider by ID
 getProviderById(id: string): Observable<Provider> {
  return this.http.get<Provider>(`${this.apiUrl}/${id}`);
}

  updateProviderInfo(updatedUser: Provider): Observable<any> {
    return this.http.put(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }
  Provider(updatedProvider: any) {
    if (!updatedProvider.id) {
      throw new Error('User ID is required for updating the user');
    }

    return this.http.put(`http://localhost:3031/users/${updatedProvider.id}`, updatedProvider);
  }
 // Function to filter providers by service name
 filterProvidersByService(serviceName: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:3031/providers/filterByService/${serviceName}`);
}
}


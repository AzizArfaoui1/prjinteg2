import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../models/provider.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderserviceService {

  private apiUrl = 'http://localhost:8080/'; // URL to the backend API
  private providerInfo: Provider | null = null;

  constructor(private http: HttpClient) {}
//addProvider(): Sends a POST request with user data from the form to the backend’s /add endpoint.
  addProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(`${this.apiUrl}/add`, provider);
  }

  // getProvider(): Sends a GET request to retrieve all users from the backend.
  getProvider(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiUrl);
  }
  
  login(username: string, password: string, email: string) {
    throw new Error('Method not implemented.');
  }

  loginProvider(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password, email });
  }

  setProviderInfo(user: any) {
    this.providerInfo = user; // Store user data
  }

  getProviderInfo() {
    return this.providerInfo; // Retrieve user data
  }
 // Get user by ID
 getProviderById(id: number): Observable<Provider> {
  return this.http.get<Provider>(`${this.apiUrl}/${id}`);
}
  updateProviderInfo(updatedUser: Provider): Observable<any> {
    return this.http.put(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }
  
}


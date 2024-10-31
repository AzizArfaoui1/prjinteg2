import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../models/provider.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderserviceService {

  private apiUrl = 'http://localhost:8080/api/providers'; // URL to the backend API

  constructor(private http: HttpClient) {}
//addProvider(): Sends a POST request with user data from the form to the backend’s /add endpoint.
  addUser(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(`${this.apiUrl}/add`, provider);
  }

  // getProvider(): Sends a GET request to retrieve all users from the backend.
  getUsers(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiUrl);
  }
}

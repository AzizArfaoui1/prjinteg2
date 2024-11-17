import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Provider } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private UserapiUrl = 'http://localhost:8080/api/users'; // URL to the backend API
  private ProviderapiUrl = 'http://localhost:8080/api/providers'; // URL to the backend API

  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.UserapiUrl);
  }

  
  // getProvider(): Sends a GET request to retrieve all users from the backend.
  getProvider(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.ProviderapiUrl);
  }
}

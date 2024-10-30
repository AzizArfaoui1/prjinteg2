import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private apiUrl = 'http://localhost:8080/api/users'; // URL to the backend API

  constructor(private http: HttpClient) {}
//addUser(): Sends a POST request with user data from the form to the backend’s /add endpoint.
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  // getUsers(): Sends a GET request to retrieve all users from the backend.
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}

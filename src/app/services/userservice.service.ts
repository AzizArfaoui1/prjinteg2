import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
 

  private apiUrl = 'http://localhost:3031/users';
  private userInfo: User | null = null;

  constructor(private http: HttpClient) {}
//addUser(): Sends a POST request with user data from the form to the backend’s /add endpoint.
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  login(username: string, password: string, email: string) {
    throw new Error('Method not implemented.');
  }

  loginUser(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password, email });
  }

  setUserInfo(user: any) {
    this.userInfo = user; // Store user data
  }

  getUserInfo() {
    return this.userInfo; // Retrieve user data
  }
 // Get user by ID
 getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`);
}
  updateUserInfo(updatedUser: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }
  
}

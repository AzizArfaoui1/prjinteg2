import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();
  
  private apiUrl = 'http://localhost:3031/users';
  private userInfo: User | null = null;

  constructor(private http: HttpClient) {}

  // Add User: Sends a POST request with user data to the backend’s /add endpoint
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  // Login User: Sends a POST request with login data to the /login endpoint
  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password});
  }

  setUserInfo(user: any) {
    this.userInfo = user; // Store user data
  }

  getUserInfo() {
    return this.userInfo; // Retrieve user data
  }

  // Get User by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Update User by ID
  updateUserInfo(updatedUser: any) {
    if (!updatedUser.id) {
      throw new Error('User ID is required for updating the user');
    }

    return this.http.put(`http://localhost:3031/users/${updatedUser.id}`, updatedUser);
  }
}

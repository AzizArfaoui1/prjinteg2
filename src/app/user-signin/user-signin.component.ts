import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserserviceService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      alert('Please fill out all fields before submitting');
      return;
    }
    console.log('Submitting login request:', { username: this.username, password: this.password });

    // Call the login method and subscribe to the response
    this.userService.loginUser(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.userService.setUserInfo(response); // Store user data
        this.router.navigate(['/userDashboard']); // Redirect to the dashboard on successful login
      },
      error: (error: any) => {
        console.error('Error during login:', error);
        alert('Invalid username or password.');
      }
    });
  }
}

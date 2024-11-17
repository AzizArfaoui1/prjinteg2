import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent {
  username = '';
  password = '';
  email = '';

  constructor(private userService: UserserviceService, private router: Router) {}

  onSubmit() {
    this.userService.loginUser(this.username, this.password, this.email).subscribe({
      next: response => {
        if (response.success) {
          console.log('Login successful');
          const user: User = {
            username: response.data.username,
            password: '', // You can choose not to store sensitive data
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            location: response.data.location,
            adress: response.data.adress,
            comments: response.data.comments,
            candidates: response.data.candidates,
            offers: response.data.offers,
          };
          // Save user information in a service or localStorage
          this.userService.setUserInfo(user); // Save user info
          this.router.navigate(['/userDashboard']); // Navigate to dashboard
        } else {
          console.log('Invalid credentials');
        }
      },
      error: () => {
        console.log('Error during login');
      }
    });
  }
  
}

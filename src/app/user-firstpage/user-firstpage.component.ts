import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { UserserviceService } from '../services/userservice.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-firstpage',
  templateUrl: './user-firstpage.component.html',
  styleUrls: ['./user-firstpage.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UserFirstpageComponent {
  user: User = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    location: '',
    adress: '',
    comments: false,
    candidates: false,
    offers: false
  };

  constructor(private userService: UserserviceService, private router: Router) {}

  onSubmit() {
    // Check if all required fields are filled
    if (
      !this.user.username ||
      !this.user.password ||
      !this.user.firstname ||
      !this.user.lastname ||
      !this.user.email ||
      !this.user.location ||
      !this.user.adress
    ) {
      alert('Please fill out all fields before submitting');
      return; // Prevent submission if any field is empty
    }

    // If all fields are filled, submit the data
    this.userService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('User data sent successfully:', response);
        // Optionally reset the form or perform additional actions
        this.user = {
          username: '',
          password: '',
          firstname: '',
          lastname: '',
          email: '',
          location: '',
          adress: '',
          comments: false,
          candidates: false,
          offers: false
        };

        // Navigate to another page after successful submission
        this.router.navigate(['/UserSignup']);  
      },
      error: (error) => {
        console.error('Error sending user data:', error);
      }
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { User } from '../models/user.model';
import { LocationService } from '../services/location-service.service';

@Component({
  selector: 'app-user-firstpage',
  templateUrl: './user-firstpage.component.html',
  styleUrls: ['./user-firstpage.component.css']
})
export class UserFirstpageComponent {
  user: User = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    location: '', // Will be assigned dynamically
    adress: ''
  };

  constructor(
    private userService: UserserviceService,
    private router: Router,
    private locationService: LocationService // Inject LocationService
  ) {}

  ngOnInit() {
    // Get the locationId from the LocationService
    const locationId = this.locationService.getLocationId();
    if (locationId) {
      this.user.location = locationId; 
    } else {
      alert('Please create a location first.');
      this.router.navigate(['/location']);
    }
  }

  onSubmit() {
    console.log('Form Submitted'); // Log data for debugging
    if (
      !this.user.username ||
      !this.user.password ||
      !this.user.firstname ||
      !this.user.lastname ||
      !this.user.email
    ) {
      alert('Please fill out all fields before submitting');
      return;
    }
  
    
  
    // Now send the user data to the backend
    this.userService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('User data sent successfully:', response);
        this.router.navigate(['/UserSignin']); // Navigate to login page after successful submission
      },
      error: (error) => {
        console.error('Error sending user data:', error);
        alert('There was an error creating the user. Please try again.');
      }
    });
  }
  
}

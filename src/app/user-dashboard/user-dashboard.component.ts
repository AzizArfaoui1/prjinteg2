import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { LocationService } from '../services/location-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user: any; // Holds user data
  isEditing = false; // Track edit state
  updatedUser: any = {};
  location: any; // Store location details

  constructor(
    private userService: UserserviceService,
    private locationService: LocationService // Inject LocationService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUserInfo();
    console.log('User:', this.user);  // Check if the location is included
    if (this.user && this.user.id) {
      this.updatedUser = { ...this.user };
      if (this.user.location) {
        this.fetchLocation();
      }
    
    } else {
      console.error('User data is missing or user ID is undefined');
    }
  }
  
  
  fetchLocation() {
    const locationId = this.user.location._id;  // Assuming location is an object and _id is the field storing the ID
    console.log('Fetching location for ID:', locationId);  // Ensure locationId is the actual ID string or number
    if (locationId) {
      this.locationService.getLocationById(locationId).subscribe(
        (locationData) => {
          console.log('Location fetched:', locationData);
          this.location = locationData;
          this.user.location = locationData;
          this.updatedUser.location = this.location;
        },
        (error) => {
          console.error('Error fetching location data:', error);
        }
      );
    } else {
      console.error('Invalid location ID:', locationId);
    }
  }
  
  

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    if (!this.updatedUser.id) {
      console.error('User ID is missing');
      return; // Exit if no valid user ID
    }
  
    // Ensure the location is updated if changed
    if (this.location) {
      this.updatedUser.location = this.location._id || this.updatedUser.location; // Update location with the selected or edited location
    }
  
    this.userService.updateUserInfo(this.updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.user = response;  // Update user with the response
        this.updatedUser = { ...this.user };  // Ensure updatedUser reflects the latest changes
        this.fetchLocation();  // Update location if needed
        this.isEditing = false;  // Stop editing mode
      },
      (error) => {
        console.error('Failed to update user:', error);
      }
    );
  }
  
  
  

  

  cancelEditing() {
    this.isEditing = false;
    this.updatedUser = { ...this.user }; // Reset to original data
  }
}

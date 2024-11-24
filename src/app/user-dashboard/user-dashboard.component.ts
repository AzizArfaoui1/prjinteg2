import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: User | null = null; // The user data
  updatedUser: User = { username: '', password: '', firstname: '', lastname: '', email: '', location: '', adress: '', comments: false, candidates: false, offers: false }; // Create an empty object for editing
  isEditing: boolean = false; // Flag to toggle editing mode

  constructor(private userService: UserserviceService) {}

  ngOnInit(): void {
    // Load user data from the service
    this.userService.getUserById(1).subscribe({
      next: (data) => {
        this.user = data;
        this.updatedUser = { ...this.user }; // Initialize editable copy
      },
      error: () => console.error('Error fetching user data')
    });
  }

  // Enable editing mode
  enableEditing(): void {
    if (this.user) {
      this.isEditing = true;
      this.updatedUser = { ...this.user }; // Create a fresh copy for editing
    }
  }

  // Save the changes made during editing
  saveChanges(): void {
    if (this.updatedUser) {
      this.user = { ...this.updatedUser }; // Save changes to user
      this.isEditing = false;

      // Optionally, send updated data to the backend
      this.userService.updateUserInfo(this.user).subscribe({
        next: (data) => console.log('User updated successfully', data),
        error: () => console.error('Error updating user')
      });
    }
  }

  // Cancel editing and discard changes
  cancelEditing(): void {
    this.isEditing = false;
    if (this.user) {
      this.updatedUser = { ...this.user }; // Revert to original data
    }
  }
}

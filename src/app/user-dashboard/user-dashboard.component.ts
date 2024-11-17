import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private userService: UserserviceService) {}

  formattedDate: string = '';
  user: User | null = null;

  theuser: User | null = null;
  isEditing: boolean = false; // Tracks if the form is in edit mode
  updatedUser: User | null = null;
  ngOnInit(): void {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', // Correct type
      month: 'long',   // Correct type
      day: 'numeric',  // Correct type

      
    };
    this.formattedDate = today.toLocaleDateString(undefined, options);


    this.user = this.userService.getUserInfo(); 
    this.user = this.userService.getUserInfo(); // Load user data from service
    if (!this.user) {
      // If user data isn't available, fetch from API (adjust ID as needed)
      this.userService.getUserById(1).subscribe({
        next: data => (this.user = data),
        error: () => console.error('Error fetching user data')
      });
    }
  }

  
  enableEditing(): void {
    this.isEditing = true;
    this.updatedUser = { ...this.user } as User;
  }
  
    
  
}

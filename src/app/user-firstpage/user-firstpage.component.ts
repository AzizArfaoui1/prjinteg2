import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserserviceService } from '../services/userservice.service';
@Component({
  selector: 'app-user-firstpage',
  templateUrl: './user-firstpage.component.html',
  styleUrls: ['./user-firstpage.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UserFirstpageComponent {
  user: User= {username: '',
    image: new File([], ""),
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    comments: false,
    candidates: false,
    offers:false
  };
  constructor(private userService: UserserviceService) {}
  onSubmit() {
    this.userService.addUser(this.user).subscribe({
      next: response => {
        console.log('User data sent successfully:', response);
        // Optionally reset the form or perform additional actions
        this.user = { 
          username: '',
          image: new File([], ""),
          firstname: '',
          lastname: '',
          email: '',
          country: '',
          comments: false,
          candidates: false,
          offers: false
        };
      },
      error: error => {
        console.error('Error sending user data:', error);
      }
    });
  }
  
      triggerFileInputClick(fileInput: HTMLInputElement) {
        fileInput.click();
      }
    
      // Function to handle file selection
      onFileSelected(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
          this.user.image = fileInput.files[0];
        }
      }
    
}

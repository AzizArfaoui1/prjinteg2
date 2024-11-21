import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { Provider } from '../models/provider.model';
import { ProviderserviceService } from '../services/providerservice.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent {
  provider: Provider = {
    username: '',
    password:'',
    job: '',
    firstname: '',
    lastname: '',
    email: '',
    location: '',
    comments: false,
  };

  constructor(private providerService: ProviderserviceService, private router: Router) {}

  onSubmit() {
    // Check if all required fields are filled
    if (
      !this.provider.username ||
      !this.provider.password ||
      !this.provider.firstname ||
      !this.provider.lastname ||
      !this.provider.email ||
      !this.provider.location ||
      !this.provider.job
    ) {
      alert('Please fill out all fields before submitting');
      return; // Prevent submission if any field is empty
    }

    // If all fields are filled, submit the data
    this.providerService.addProvider(this.provider).subscribe({
      next: (response) => {
        console.log('Provider data sent successfully:', response);
        // Optionally reset the form or perform additional actions
        this.provider = {
          username: '',
          password:'',
          job: '',
          firstname: '',
          lastname: '',
          email: '',
          location: '',
          comments: false,
        };
        this.router.navigate(['/ProviderSignup']);  
      },
      error: (error) => {
        console.error('Error sending provider data:', error);
      }
    });
  }

  triggerFileInputClick(fileInput: HTMLInputElement) {
    fileInput.click();
  }

}

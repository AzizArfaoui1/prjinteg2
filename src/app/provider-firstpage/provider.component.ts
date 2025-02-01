import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { Provider } from '../models/provider.model';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { LocationService } from '../services/location-service.service';
import { ProviderserviceService } from '../services/providerservice.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent {
  provider: Provider = {
    username: '',
    password: '',
    firstname: '',   // This is fine
    lastname: '',     // This is fine
    email: '',
    location: '',
    phone: ''
  }

  constructor(
    private providerService: ProviderserviceService,
    private router: Router,
    private locationService: LocationService // Inject LocationService
  ) {}

  ngOnInit() {
    // Get the locationId from the LocationService
    const locationId = this.locationService.getLocationId();
    if (locationId) {
      this.provider.location = locationId; 
    } else {
      alert('Please create a location first.');
      this.router.navigate(['/location']);
    }
  }

  onSubmit() {
    if (
      !this.provider.username ||
      !this.provider.password ||
      !this.provider.firstname ||
      !this.provider.lastname ||
      !this.provider.email ||
      !this.provider.phone
    ) {
      alert('Please fill out all fields before submitting.');
      return;
    }
  
    this.providerService.addProvider(this.provider).subscribe({
      next: (response) => {
        console.log('Provider created successfully:', response);
        alert('Provider created successfully!');
        this.router.navigate(['/ProviderSignin']); // Redirect after successful creation
      },
      error: (error) => {
        console.error('Error creating provider:', error);
        alert('Failed to create provider. Please try again.');
      }
    });
  }
  
  
}


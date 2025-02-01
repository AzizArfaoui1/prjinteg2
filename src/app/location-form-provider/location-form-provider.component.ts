import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../services/location-service.service';

@Component({
  selector: 'app-location-form-provider',
  templateUrl: './location-form-provider.component.html',
  styleUrls: ['./location-form-provider.component.css']
})
export class LocationFormProviderComponent {
  location = {
    address: '',
    ville: '',
    postal_code: '',
    country: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private locationService: LocationService // Inject LocationService
  ) {}

  onSubmit() {
    this.http.post('http://localhost:3031/location', this.location).subscribe(
      (response: any) => {
        console.log('Location saved successfully:', response);
        this.locationService.setLocationId(response._id); // Store the location ID
        this.router.navigate(['/provider']); // Navigate to user form
        alert('Location added successfully!');
      },
      (error) => {
        console.error('Error saving location:', error);
        alert('Failed to add location.');
      }
    );
  }
}

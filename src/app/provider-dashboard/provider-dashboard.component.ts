import { Component, OnInit } from '@angular/core';
import { Provider } from '../models/provider.model';
import { ProviderserviceService } from '../services/providerservice.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  provider: Provider | null = null; // Provider data
  updatedProvider: Provider = {
    firstname: '',
    lastname: '',
    email: '',
    location: '',
    job: '',
    username: '',
    password: '',
    comments: false
  }; // Create a fresh object for editing
  isEditing: boolean = false; // Toggle editing mode

  constructor(private providerService: ProviderserviceService) {}

  ngOnInit(): void {
    // Fetch provider data
    this.providerService.getProviderById(1).subscribe({
      next: (data) => {
        this.provider = data;
        this.updatedProvider = { ...this.provider }; // Prepare editable copy
      },
      error: () => console.error('Error fetching provider data')
    });
  }

  // Enable editing mode
  enableEditing(): void {
    if (this.provider) {
      this.isEditing = true;
      this.updatedProvider = { ...this.provider }; // Copy provider data for editing
    }
  }

  // Save changes made during editing
  saveChanges(): void {
    if (this.updatedProvider) {
      this.provider = { ...this.updatedProvider }; // Update provider with new data
      this.isEditing = false; // Exit editing mode

      // Optionally update data in the backend
      this.providerService.updateProviderInfo(this.provider).subscribe({
        next: (data) => console.log('Provider updated:', data),
        error: () => console.error('Error updating provider data')
      });
    }
  }

  // Cancel editing and revert changes
  cancelEditing(): void {
    this.isEditing = false;
    if (this.provider) {
      this.updatedProvider = { ...this.provider }; // Revert to original data
    }
  }
}
